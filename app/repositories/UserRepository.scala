package repositories

import scala.concurrent.Future

import play.api.db.DBApi

import javax.inject.Inject

import anorm._
import anorm.SqlParser.str

import com.mohiva.play.silhouette.api.LoginInfo

import models.User
import utils.db.DBExecutionContext

class UserRepository @Inject()(
    dbApi: DBApi
)(implicit ec: DBExecutionContext) {
    private val db = dbApi.database("default")

    private val parser: RowParser[User] = {
        for {
            username <- str("admin.username")
            password <- str("admin.password")
        } yield (User(username, password))
    }

    def retrieve(loginInfo: LoginInfo): Future[Option[User]] = Future.successful {
        db.withConnection { implicit conn =>
            SQL("""
                    |SELECT * FROM admin
                    |""".stripMargin
            ).as(parser.singleOpt)
        }
    }
}
