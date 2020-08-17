package modules

import scala.concurrent.ExecutionContext

import play.api.Configuration
import play.api.libs.ws.WSClient

import com.mohiva.play.silhouette.api.crypto.{Crypter, CrypterAuthenticatorEncoder, Signer}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorService
import com.mohiva.play.silhouette.api.util.{CacheLayer, Clock, HTTPLayer, IDGenerator, PasswordHasherRegistry, PasswordInfo, PlayHTTPLayer}
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.crypto.{JcaCrypter, JcaCrypterSettings, JcaSigner, JcaSignerSettings}
import com.mohiva.play.silhouette.impl.authenticators.{JWTAuthenticator, JWTAuthenticatorService, JWTAuthenticatorSettings}
import com.mohiva.play.silhouette.impl.providers.oauth1.secrets.{CookieSecretProvider, CookieSecretSettings}
import com.mohiva.play.silhouette.impl.providers.state.{CsrfStateItemHandler, CsrfStateSettings}
import com.mohiva.play.silhouette.impl.providers.{CredentialsProvider, OAuth1Info, OAuth1TokenSecretProvider, OAuth2Info}
import com.mohiva.play.silhouette.impl.util.PlayCacheLayer
import com.mohiva.play.silhouette.password.{BCryptPasswordHasher, BCryptSha256PasswordHasher}
import com.mohiva.play.silhouette.persistence.daos.{DelegableAuthInfoDAO, InMemoryAuthInfoDAO}
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository

import com.google.inject.name.Named
import com.google.inject.{AbstractModule, Provides}
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.ceedubs.ficus.readers.EnumerationReader._
import net.codingwell.scalaguice.ScalaModule
import services.UserService
import utils.auth.CookieReader._
import utils.auth.DefaultEnv

class SilhouetteModule(implicit ec: ExecutionContext) extends AbstractModule with ScalaModule {
    override def configure(): Unit = {
        bind[Silhouette[DefaultEnv]].to[SilhouetteProvider[DefaultEnv]]
        bind[CacheLayer].to[PlayCacheLayer]
        bind[EventBus].toInstance(EventBus())
        bind[Clock].toInstance(Clock())

        bind[DelegableAuthInfoDAO[PasswordInfo]].toInstance(new InMemoryAuthInfoDAO[PasswordInfo])
        bind[DelegableAuthInfoDAO[OAuth1Info]].toInstance(new InMemoryAuthInfoDAO[OAuth1Info])
        bind[DelegableAuthInfoDAO[OAuth2Info]].toInstance(new InMemoryAuthInfoDAO[OAuth2Info])
    }

    @Provides
    def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

    @Provides
    def provideEnvironment(
        userService: UserService,
        authenticatorService: AuthenticatorService[JWTAuthenticator],
        eventBus: EventBus
    ): Environment[DefaultEnv] = {
        Environment[DefaultEnv](userService, authenticatorService, Seq(), eventBus)
    }

    @Provides @Named("oauth1-token-secret-signer")
    def provideOAuth1TokenSecretSigner(configuration: Configuration): Signer = {
        val config = configuration.underlying.as[JcaSignerSettings]("silhouette.oauth1TokenSecretProvider.signer")

        new JcaSigner(config)
    }

    @Provides @Named("oauth1-token-secret-crypter")
    def provideOAuth1TokenSecretCrypter(configuration: Configuration): Crypter = {
        val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.oauth1TokenSecretProvider.crypter")

        new JcaCrypter(config)
    }

    @Provides @Named("csrf-state-item-signer")
    def provideCSRFStateItemSigner(configuration: Configuration): Signer = {
        val config = configuration.underlying.as[JcaSignerSettings]("silhouette.csrfStateItemHandler.signer")

        new JcaSigner(config)
    }

    @Provides @Named("authenticator-signer")
    def provideAuthenticatorSigner(configuration: Configuration): Signer = {
        val config = configuration.underlying.as[JcaSignerSettings]("silhouette.authenticator.signer")

        new JcaSigner(config)
    }

    @Provides @Named("authenticator-crypter")
    def provideAuthenticatorCrypter(configuration: Configuration): Crypter = {
        val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.authenticator.crypter")

        new JcaCrypter(config)
    }

    @Provides
    def provideAuthInfoRepository(
        passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo],
        oauth1InfoDAO: DelegableAuthInfoDAO[OAuth1Info],
        oauth2InfoDAO: DelegableAuthInfoDAO[OAuth2Info]
    ): AuthInfoRepository = {
        new DelegableAuthInfoRepository(passwordInfoDAO, oauth1InfoDAO, oauth2InfoDAO)
    }

    @Provides
    def provideAuthenticatorService(
        @Named("authenticator-signer") signer: Signer,
        @Named("authenticator-crypter") crypter: Crypter,
        configuration: Configuration,
        idGenerator: IDGenerator,
        clock: Clock
    ): AuthenticatorService[JWTAuthenticator] = {
        val config = configuration.underlying.as[JWTAuthenticatorSettings]("silhouette.authenticator")
        val encoder = new CrypterAuthenticatorEncoder(crypter)

        new JWTAuthenticatorService(config, None, encoder, idGenerator, clock)
    }

    @Provides
    def provideOAuth1TokenSecretProvider(
        @Named("oauth1-token-secret-signer") signer: Signer,
        @Named("oauth1-token-secret-crypter") crypter: Crypter,
        configuration: Configuration,
        clock: Clock
    ): OAuth1TokenSecretProvider = {

        val settings = configuration.underlying.as[CookieSecretSettings]("silhouette.oauth1TokenSecretProvider")

        new CookieSecretProvider(settings, signer, crypter, clock)
    }

    @Provides
    def provideCsrfStateItemHandler(
        @Named("csrf-state-item-signer") signer: Signer,
        idGenerator: IDGenerator,
        configuration: Configuration
    ): CsrfStateItemHandler = {
        val settings = configuration.underlying.as[CsrfStateSettings]("silhouette.csrfStateItemHandler")

        new CsrfStateItemHandler(settings, idGenerator, signer)
    }

    @Provides
    def providePasswordHasherRegistry(): PasswordHasherRegistry = {
        PasswordHasherRegistry(new BCryptSha256PasswordHasher(), Seq(new BCryptPasswordHasher()))
    }

    @Provides
    def provideCredentialsProvider(
        authInfoRepository: AuthInfoRepository,
        passwordHasherRegistry: PasswordHasherRegistry
    ): CredentialsProvider = {
        new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
    }
}
