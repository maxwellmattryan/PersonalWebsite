package controllers

import scala.concurrent.ExecutionContext

import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import com.google.inject.Inject
import services.ProfileService

class ProfileController @Inject()(
    cc: ControllerComponents,
    profileService: ProfileService
)(implicit ec: ExecutionContext) extends AbstractController(cc) {

    def getProfiles(): Action[AnyContent] = Action { implicit request =>
        val profiles = profileService.getProfiles()

        Ok(Json.toJson(profiles))
    }
}
