package utils

import scala.concurrent.ExecutionContext

import cats.effect.{ContextShift, IO}
import doobie.hikari._
import jdk.internal.jline.internal.ShutdownHooks.Task

trait DBConnection {
    // Implicit value settings
    val ec = ExecutionContext.global
    implicit val cs: ContextShift[IO] = IO.contextShift(ec)

    // PostgreSQL database environmental variables
    val DB_HOST = "localhost"
    val DB_PORT = "5432"
    val DB_NAME = "mattmaxwell"
    val DB_USERNAME = "postgres"
    val DB_PASSWORD = ""
    val DB_DRIVER = "org.postgresql.Driver"

    val transactor: Task[HikariTransactor[Task]] =
        HikariTransactor.newHikariTransactor[Task](
            driverClassName = DB_DRIVER,
            url = s"jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}",
            user = DB_USERNAME,
            pass = DB_PASSWORD
        ).memoize
}
