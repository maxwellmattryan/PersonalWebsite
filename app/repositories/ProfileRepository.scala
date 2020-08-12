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

    // TODO: Consider moving to "Macro.namedParser"
    // TODO: Fix Date typing (lines 29-30 ... do I only need date anyway?) with anorm lib
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

    // TODO: Incorporate Future into the response
    def list(): Seq[Profile] = {
        db.withConnection { implicit conn =>
            SQL("SELECT * FROM profile").as(parser *)
        }
    }
}