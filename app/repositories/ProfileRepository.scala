package repositories

import scala.language.postfixOps

import play.api.db.DBApi

import java.time.LocalDateTime
import javax.inject.Inject

import anorm._
import anorm.SqlParser.{get, int, str}

import models.Profile
import utils.db.DBExecutionContext

class ProfileRepository @Inject()(
    dbApi: DBApi
)(implicit ec: DBExecutionContext) {
    private val db = dbApi.database("default")

    private val parser: RowParser[Profile] = {
        for {
            id <- int("profile.profile_id")
            statusId <- int("profile.profile_status_id")
            name <- str("profile.name")
            tagline <- str("profile.tagline")
            landing <- str("profile.landing")
            about <- str("profile.about")
            createdAt <- get[LocalDateTime]("profile.created_at")
            updatedAt <- get[LocalDateTime]("profile.updated_at")
        } yield (Profile(id, statusId, name, tagline, landing, about, createdAt, updatedAt))
    }

    def getActiveProfile(): Option[Profile] = db.withConnection { implicit conn =>
        SQL("""
                |SELECT * FROM profile prf
                |LEFT JOIN profile_status ps ON prf.profile_status_id = ps.profile_status_id
                |WHERE ps.status = 'ACTIVE'
                |""".stripMargin
        ).as(parser.singleOpt)
    }

    def list(): Seq[Profile] = db.withConnection { implicit conn =>
        SQL("""
                |SELECT * FROM profile
                |""".stripMargin
        ).as(parser *)
    }
}