package services

import javax.inject.Inject

import models.Profile
import repositories.ProfileRepository

class ProfileService @Inject()(
    repo: ProfileRepository
) {
    def listProfiles(): Seq[Profile] = repo.list()
}