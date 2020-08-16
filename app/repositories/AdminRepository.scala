package repositories

import scala.concurrent.Future

import play.api.db.DBApi

import javax.inject.Inject

import anorm._
import anorm.SqlParser.{int, str}

import models.Admin
import utils.db.DBExecutionContext

class AdminRepository @Inject()(
    dbApi: DBApi
)(implicit ec: DBExecutionContext) {
    private val db = dbApi.database("default")

    private val parser: RowParser[Admin] = {
        for {
            id <- int("admin.admin_id")
            username <- str("admin.username")
            password <- str("admin.password")
        } yield (Admin(id, username, password))
    }

    def getAdmin(): Option[Admin] = db.withConnection { implicit conn =>
        SQL("""
                |SELECT * FROM admin
                |""".stripMargin
        ).as(parser.singleOpt)
    }
}
