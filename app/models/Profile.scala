package models

import java.time.LocalDateTime

case class Profile(
    Id: Int,
    Status: Int,
    Name: String,
    Tagline: String,
    Landing: String,
    About: String,
    CreatedAt: LocalDateTime,
    UpdatedAt: LocalDateTime
)
