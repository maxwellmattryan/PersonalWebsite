package services

import javax.inject.Inject

import models.Admin
import repositories.AdminRepository

class AdminService @Inject()(
    adminRepository: AdminRepository
) {
    def getAdmin(): Option[Admin] = adminRepository.getAdmin()
}