package models

import play.api.libs.json.Json

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}

case class User(
    username: String,
    password: String,

    loginInfo: LoginInfo = null
) extends Identity

object User {
    implicit val format = Json.format[User]
}