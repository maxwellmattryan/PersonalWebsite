// Play plugin
val PlayVersion = "2.8.2"
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % PlayVersion)

lazy val FlywaySBTVersion = "6.5.0"
addSbtPlugin("io.github.davidmweber" % "flyway-sbt" % FlywaySBTVersion)