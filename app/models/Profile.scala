package models

import java.time.LocalDateTime

case class Profile(
    id: Int,
    statusId: Int,
    name: String,
    tagline: String,
    landing: String,
    about: String,
    createdAt: LocalDateTime,
    updatedAt: LocalDateTime
)