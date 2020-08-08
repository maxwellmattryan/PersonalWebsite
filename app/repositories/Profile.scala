package repositories

import scalikejdbc._
import java.time.LocalDateTime

import play.api.libs.json._

case class Profile(
    profileId: Int,
    profileStatusId: Int,
    name: String,
    tagline: String,
    landing: String,
    about: String,
    createdAt: Option[LocalDateTime] = None,
    updatedAt: Option[LocalDateTime] = None) {

    def save()(implicit session: DBSession = Profile.autoSession): Profile = Profile.save(this)(session)

    def destroy()(implicit session: DBSession = Profile.autoSession): Int = Profile.destroy(this)(session)

}


object Profile extends SQLSyntaxSupport[Profile] {

    override val tableName = "profile"

    override val columns = Seq("profile_id", "profile_status_id", "name", "tagline", "landing", "about", "created_at", "updated_at")

    def apply(p: SyntaxProvider[Profile])(rs: WrappedResultSet): Profile = apply(p.resultName)(rs)

    def apply(p: ResultName[Profile])(rs: WrappedResultSet): Profile = new Profile(
        profileId = rs.get(p.profileId),
        profileStatusId = rs.get(p.profileStatusId),
        name = rs.get(p.name),
        tagline = rs.get(p.tagline),
        landing = rs.get(p.landing),
        about = rs.get(p.about),
        createdAt = rs.get(p.createdAt),
        updatedAt = rs.get(p.updatedAt)
    )

    val p = Profile.syntax("p")

    override val autoSession = AutoSession

    def find(profileId: Int)(implicit session: DBSession = autoSession): Option[Profile] = {
        withSQL {
            select.from(Profile as p).where.eq(p.profileId, profileId)
        }.map(Profile(p.resultName)).single().apply()
    }

    def findAll()(implicit session: DBSession = autoSession): List[Profile] = {
        withSQL(select.from(Profile as p)).map(Profile(p.resultName)).list().apply()
    }

    def countAll()(implicit session: DBSession = autoSession): Long = {
        withSQL(select(sqls.count).from(Profile as p)).map(rs => rs.long(1)).single().apply().get
    }

    def findBy(where: SQLSyntax)(implicit session: DBSession = autoSession): Option[Profile] = {
        withSQL {
            select.from(Profile as p).where.append(where)
        }.map(Profile(p.resultName)).single().apply()
    }

    def findAllBy(where: SQLSyntax)(implicit session: DBSession = autoSession): List[Profile] = {
        withSQL {
            select.from(Profile as p).where.append(where)
        }.map(Profile(p.resultName)).list().apply()
    }

    def countBy(where: SQLSyntax)(implicit session: DBSession = autoSession): Long = {
        withSQL {
            select(sqls.count).from(Profile as p).where.append(where)
        }.map(_.long(1)).single().apply().get
    }

    def create(
        profileStatusId: Int,
        name: String,
        tagline: String,
        landing: String,
        about: String,
        createdAt: Option[LocalDateTime] = None,
        updatedAt: Option[LocalDateTime] = None)(implicit session: DBSession = autoSession): Profile = {
        val generatedKey = withSQL {
            insert.into(Profile).namedValues(
                column.profileStatusId -> profileStatusId,
                column.name -> name,
                column.tagline -> tagline,
                column.landing -> landing,
                column.about -> about,
                column.createdAt -> createdAt,
                column.updatedAt -> updatedAt
            )
        }.updateAndReturnGeneratedKey().apply()

        Profile(
            profileId = generatedKey.toInt,
            profileStatusId = profileStatusId,
            name = name,
            tagline = tagline,
            landing = landing,
            about = about,
            createdAt = createdAt,
            updatedAt = updatedAt)
    }

    def batchInsert(entities: collection.Seq[Profile])(implicit session: DBSession = autoSession): List[Int] = {
        val params: collection.Seq[Seq[(Symbol, Any)]] = entities.map(entity =>
            Seq(
                Symbol("profileStatusId") -> entity.profileStatusId,
                Symbol("name") -> entity.name,
                Symbol("tagline") -> entity.tagline,
                Symbol("landing") -> entity.landing,
                Symbol("about") -> entity.about,
                Symbol("createdAt") -> entity.createdAt,
                Symbol("updatedAt") -> entity.updatedAt))
        SQL(
            """insert into profile(
      profile_status_id,
      name,
      tagline,
      landing,
      about,
      created_at,
      updated_at
    ) values (
      {profileStatusId},
      {name},
      {tagline},
      {landing},
      {about},
      {createdAt},
      {updatedAt}
    )""").batchByName(params.toSeq: _*).apply[List]()
    }

    def save(entity: Profile)(implicit session: DBSession = autoSession): Profile = {
        withSQL {
            update(Profile).set(
                column.profileId -> entity.profileId,
                column.profileStatusId -> entity.profileStatusId,
                column.name -> entity.name,
                column.tagline -> entity.tagline,
                column.landing -> entity.landing,
                column.about -> entity.about,
                column.createdAt -> entity.createdAt,
                column.updatedAt -> entity.updatedAt
            ).where.eq(column.profileId, entity.profileId)
        }.update().apply()
        entity
    }

    def destroy(entity: Profile)(implicit session: DBSession = autoSession): Int = {
        withSQL {
            delete.from(Profile).where.eq(column.profileId, entity.profileId)
        }.update().apply()
    }

}
