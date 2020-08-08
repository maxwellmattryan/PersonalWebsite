package repositories

import scalikejdbc.specs2.mutable.AutoRollback
import org.specs2.mutable._
import scalikejdbc._
import java.time.{LocalDateTime}


class ProfileRepositorySpec extends Specification {

  "ProfileRepository" should {

    val p = ProfileRepository.syntax("p")

    "find by primary keys" in new AutoRollback {
      val maybeFound = ProfileRepository.find(123)
      maybeFound.isDefined should beTrue
    }
    "find by where clauses" in new AutoRollback {
      val maybeFound = ProfileRepository.findBy(sqls.eq(p.profileId, 123))
      maybeFound.isDefined should beTrue
    }
    "find all records" in new AutoRollback {
      val allResults = ProfileRepository.findAll()
      allResults.size should be_>(0)
    }
    "count all records" in new AutoRollback {
      val count = ProfileRepository.countAll()
      count should be_>(0L)
    }
    "find all by where clauses" in new AutoRollback {
      val results = ProfileRepository.findAllBy(sqls.eq(p.profileId, 123))
      results.size should be_>(0)
    }
    "count by where clauses" in new AutoRollback {
      val count = ProfileRepository.countBy(sqls.eq(p.profileId, 123))
      count should be_>(0L)
    }
    "create new record" in new AutoRollback {
      val created = ProfileRepository.create(profileStatusId = 123, name = "MyString", tagline = "MyString", landing = "MyString", about = "MyString")
      created should not beNull
    }
    "save a record" in new AutoRollback {
      val entity = ProfileRepository.findAll().head
      // TODO modify something
      val modified = entity
      val updated = ProfileRepository.save(modified)
      updated should not equalTo(entity)
    }
    "destroy a record" in new AutoRollback {
      val entity = ProfileRepository.findAll().head
      val deleted = ProfileRepository.destroy(entity) == 1
      deleted should beTrue
      val shouldBeNone = ProfileRepository.find(123)
      shouldBeNone.isDefined should beFalse
    }
    "perform batch insert" in new AutoRollback {
      val entities = ProfileRepository.findAll()
      entities.foreach(e => ProfileRepository.destroy(e))
      val batchInserted = ProfileRepository.batchInsert(entities)
      batchInserted.size should be_>(0)
    }
  }

}
