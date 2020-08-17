package services

import scala.concurrent.Future

import javax.inject.Inject

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService

import models.User
import repositories.UserRepository

class UserService @Inject()(
    userRepository: UserRepository
) extends IdentityService[User] {
    override def retrieve(loginInfo: LoginInfo): Future[Option[User]] =
        userRepository.retrieve(loginInfo)
}
