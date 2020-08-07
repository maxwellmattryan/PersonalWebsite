package repositories

import scalikejdbc.specs2.mutable.AutoRollback
import org.specs2.mutable._
import scalikejdbc._
import java.time.{LocalDateTime}


class ProfileSpec extends Specification {

  "Profile" should {

    val p = Profile.syntax("p")

    "find by primary keys" in new AutoRollback {
      val maybeFound = Profile.find(123)
      maybeFound.isDefined should beTrue
    }
    "find by where clauses" in new AutoRollback {
      val maybeFound = Profile.findBy(sqls.eq(p.profileId, 123))
      maybeFound.isDefined should beTrue
    }
    "find all records" in new AutoRollback {
      val allResults = Profile.findAll()
      allResults.size should be_>(0)
    }
    "count all records" in new AutoRollback {
      val count = Profile.countAll()
      count should be_>(0L)
    }
    "find all by where clauses" in new AutoRollback {
      val results = Profile.findAllBy(sqls.eq(p.profileId, 123))
      results.size should be_>(0)
    }
    "count by where clauses" in new AutoRollback {
      val count = Profile.countBy(sqls.eq(p.profileId, 123))
      count should be_>(0L)
    }
    "create new record" in new AutoRollback {
      val created = Profile.create(profileStatusId = 123, name = "MyString", tagline = "MyString", landing = "MyString", about = "MyString")
      created should not beNull
    }
    "save a record" in new AutoRollback {
      val entity = Profile.findAll().head
      // TODO modify something
      val modified = entity
      val updated = Profile.save(modified)
      updated should not equalTo(entity)
    }
    "destroy a record" in new AutoRollback {
      val entity = Profile.findAll().head
      val deleted = Profile.destroy(entity) == 1
      deleted should beTrue
      val shouldBeNone = Profile.find(123)
      shouldBeNone.isDefined should beFalse
    }
    "perform batch insert" in new AutoRollback {
      val entities = Profile.findAll()
      entities.foreach(e => Profile.destroy(e))
      val batchInserted = Profile.batchInsert(entities)
      batchInserted.size should be_>(0)
    }
  }

}
