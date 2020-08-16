package services

import scala.concurrent.ExecutionContext

import javax.inject.Inject

import models.Admin
import repositories.AdminRepository

class AdminService @Inject()(
    adminRepository: AdminRepository
)(implicit ec: ExecutionContext) {
    def getAdmin(): Option[Admin] = adminRepository.getAdmin()
}