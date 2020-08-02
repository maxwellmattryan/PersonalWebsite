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

// ScalikeJDBC and other database dependencies
libraryDependencies ++= Seq(
    // Importing standard PostgreSQL driver
    "org.postgresql"        % "postgresql"      % "9.3-1102-jdbc41",

    // ScalikeJdbc async import (needs postgres-async driver)
    "org.scalikejdbc"      %% "scalikejdbc"   % "3.5.0",

    // Manages the connection pool's lifecycle
    "org.scalikejdbc"      %% "scalikejdbc-play-plugin" % "0.5.5"
)
