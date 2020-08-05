package services

import javax.inject.Inject

import play.api.mvc.ControllerComponents

import models.Profile
import repositories.ProfileRepository

class ApiService @Inject()(
    profileRepository: ProfileRepository
) {
    def getProfile(): Profile = {
        profileRepository.getActiveProfile()
    }
}
