package repositories

import java.time.LocalDate

case class ProfileRepository(
    id: Int,
    statusId: Int,
    name: String,
    tagline: String,
    landing: String,
    about: String,
    createdAt: LocalDate,
    updatedAt: LocalDate
)

object ProfileRepository {

}