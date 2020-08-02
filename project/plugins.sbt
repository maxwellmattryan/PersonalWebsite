addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.8.2")

// Database configurations
libraryDependencies += "org.postgresql" % "postgresql" % "9.3-1102-jdbc41"
addSbtPlugin("org.scalikejdbc" %% "scalikejdbc-mapper-generator" % "3.5.0")