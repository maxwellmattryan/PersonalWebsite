// Play plugin
val PlayVersion = "2.8.2"
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % PlayVersion)

lazy val PostgresVersion = "42.2.14"
libraryDependencies += "org.postgresql" % "postgresql" % PostgresVersion

val ScalikeJdbcVersion = "3.5.0"
addSbtPlugin("org.scalikejdbc" %% "scalikejdbc-mapper-generator" % ScalikeJdbcVersion)