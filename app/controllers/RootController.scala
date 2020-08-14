package controllers

import scala.concurrent.ExecutionContext

import play.api.libs.json.Json

import javax.inject._
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Result}

import services.ProfileService

class RootController @Inject()(
    cc: ControllerComponents,
    profileService: ProfileService
)(implicit ec: ExecutionContext) extends AbstractController(cc) {

    def getIndex: Action[AnyContent] = Action { implicit request =>
        val profile = profileService.getActiveProfile()

        Ok(Json.toJson(profile))
    }
}