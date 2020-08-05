package repositories

import javax.inject.{Inject, Singleton}

@Singleton
class ProfileRepository @Inject()(dbContent: DBContent) {
    import dbContext._

    def getActiveProfile(): Profile = {
        val q: Quoted[Query[Profile]] = quote {
            query[Profile].filter(p => p.status == "ACTIVE")
        }

        dbContext.run(q)
    }
}
