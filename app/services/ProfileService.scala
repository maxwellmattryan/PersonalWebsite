package services

import javax.inject.Inject

import play.api.libs.json.Json

import repositories.ProfileRepository
import scalikejdbc._

class ProfileService @Inject()() {
    private val p = ProfileRepository.p

    implicit val profileWrites = Json.writes[ProfileRepository]

    def getProfile(): Option[ProfileRepository] = DB readOnly { implicit session =>
        withSQL {
            select
                .from(ProfileRepository as p)
        }.map(ProfileRepository(p.resultName)).single().apply()
    }

    def countProfiles(): Long = DB readOnly { implicit session =>
        ProfileRepository.countAll()
    }
}