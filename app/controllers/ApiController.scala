package controllers

import javax.inject._

import play.api.mvc._

import services.ApiService

@Singleton
class ApiController @Inject()(
  cc: ControllerComponents,
  apiService: ApiService
) extends AbstractController(cc) {
  def getProfile(): Action[AnyContent] = Action { implicit request =>
    val profile = apiService.getProfile()
    println(profile)

    Ok("Welcome to the Scala-based Play REST Api!")
  }
}
