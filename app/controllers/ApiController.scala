package controllers

import javax.inject.{Inject, Singleton}

import play.api.mvc._

import services.ProfileService

@Singleton
class ApiController @Inject()(
    cc: ControllerComponents,
    profileService: ProfileService
) extends AbstractController(cc) {

    def getApi: Action[AnyContent] = Action { implicit request =>
        val profile = profileService.get()
        println(profile)

        Ok("Welcome to the API!")
    }
}