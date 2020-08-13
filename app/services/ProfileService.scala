package services

import javax.inject.Inject

import models.Profile
import repositories.ProfileRepository

class ProfileService @Inject()(
    profileRepository: ProfileRepository
) {
    def listProfiles(): Seq[Profile] = profileRepository.list()
}