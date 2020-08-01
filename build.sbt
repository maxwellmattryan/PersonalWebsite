lazy val root = (project in file("."))
    .enablePlugins(PlayScala)
    .settings(
        name := """mattmaxwell""",
        version := "0.1",
        scalaVersion := "2.13.3"
    )

// Google 'guice' injection dependency
libraryDependencies += guice

// Testing library from play
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test

// ScalikeJDBC dependencies
libraryDependencies ++= Seq(
    "mysql" % "mysql-connector-java" % "5.1.49",
    "org.scalikejdbc" %% "scalikejdbc" % "3.5.0",
    "org.scalikejdbc" %% "scalikejdbc-config" % "3.5.0",
    "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.8.0-scalikejdbc-3.5"
)
