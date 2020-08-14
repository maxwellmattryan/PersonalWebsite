package utils.db

import play.api.libs.concurrent.CustomExecutionContext

import javax.inject.{Inject, Singleton}

import akka.actor.ActorSystem

/**
 * Custom execution context required to move blocking APIs (like JDBC) off of
 * Play's rendering thread pool. This points to the configuration in the
 * "application.conf" file.
 */
@Singleton
class DBExecutionContext @Inject()(
    system: ActorSystem
) extends CustomExecutionContext(system, "database.dispatcher")
