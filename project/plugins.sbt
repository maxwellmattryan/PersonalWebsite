addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.8.2")

// Database configurations
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.14"
addSbtPlugin("org.scalikejdbc" %% "scalikejdbc-mapper-generator" % "3.5.0")