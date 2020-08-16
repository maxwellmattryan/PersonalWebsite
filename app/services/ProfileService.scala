package services

import scala.concurrent.ExecutionContext

import javax.inject.Inject

import models.Profile
import repositories.ProfileRepository

class ProfileService @Inject()(
    profileRepository: ProfileRepository
)(implicit ec: ExecutionContext) {
    // Retrieve an active profile (there should always only be one in the database)
    def getActiveProfile(): Option[Profile] =
        profileRepository.getActiveProfile()

    // Retrieves all profiles within the database
    def listProfiles(): Seq[Profile] =
        profileRepository.list()
}