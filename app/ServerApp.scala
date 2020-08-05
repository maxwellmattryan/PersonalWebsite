import cats.effect._
import cats.implicits._

import doobie._
import doobie.implicits._

object ServerApp extends IOApp {
    // Load configuration objects from application.conf file
    private val conf: Config = Config.load().unsafeRunSync()
}
