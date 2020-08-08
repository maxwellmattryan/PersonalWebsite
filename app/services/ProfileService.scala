package services

import javax.inject.Inject

import play.api.libs.json.Json

import repositories.Profile
import scalikejdbc._

class ProfileService @Inject()() {
    private val p = Profile.p

    implicit val profileWrites = Json.writes[Profile]

    def getProfile(): Option[Profile] = DB readOnly { implicit session =>
        withSQL {
            select
                .from(Profile as p)
        }.map(Profile(p.resultName)).single().apply()
    }

    def countProfiles(): Long = DB readOnly { implicit session =>
        Profile.countAll()
    }
}