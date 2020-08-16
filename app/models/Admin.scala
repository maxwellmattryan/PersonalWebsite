package models

import play.api.libs.json.Json

case class Admin(
    id: Int,
    username: String,
    password: String,
)

object Admin {
    implicit val format = Json.format[Admin]
}