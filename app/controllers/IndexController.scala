package controllers

import javax.inject._

import play.api.mvc._

import services.ProfileService

@Singleton
class IndexController @Inject()(
    cc: ControllerComponents,
    profileService: ProfileService
) extends AbstractController(cc) {

    def getIndex(): Action[AnyContent] = Action { implicit request =>
        //    val profile = apiService.getProfile getOrElse BadRequest("Bad request yo")
        //    println(profile.toString)

        val profileCount = profileService.countProfiles()
        println(s"${profileCount} profile(s) found!")

        Ok("Profiles were successfully retrieved.")
    }
}