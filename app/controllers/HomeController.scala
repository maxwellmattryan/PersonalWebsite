package controllers

import scala.concurrent.ExecutionContext

import play.api.libs.json.Json

import javax.inject._
import play.api.mvc._

import models.Profile
import services.ProfileService

class HomeController @Inject()(
    cc: ControllerComponents,
    profileService: ProfileService
)(implicit ec: ExecutionContext) extends AbstractController(cc) {

    def getIndex(): Action[AnyContent] = Action { implicit request =>
        val profiles = profileService.listProfiles()

        Ok(Json.toJson[Seq[Profile]](p))
    }
}