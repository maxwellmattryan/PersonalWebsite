// SETTINGS

// Project-level settings
lazy val commonSettings = Seq(
    name := """mattmaxwell""",
    version := "0.1",
    scalaVersion := "2.13.3",
    scalacOptions ++= Seq(
        "-deprecation",
        "-Ywarn-value-discard",
        "-Xlint:missing-interpolator"
    ),
    javacOptions ++= Seq("-Xlint:unchecked", "-Xlint:deprecation", "-Werror"),

    // Disables checksum checking in Maven repo downloads (was throwing error)
    useCoursier := false
)

lazy val flywaySettings = Seq(
    flywayUrl := "jdbc:postgresql://localhost:5432/mattmaxwell",
    flywayLocations += "db/migration",
    flywayUser := "postgres",
    flywayPassword := ""
)

lazy val root = (project in file("."))
    .configs(IntegrationTest)
    .enablePlugins(PlayScala)
    .enablePlugins(FlywayPlugin)
    .settings(commonSettings, Defaults.itSettings)
    .settings(inConfig(Runtime)(FlywayPlugin.flywayBaseSettings(Runtime) ++ flywaySettings): _*)

// DEPENDENCIES

// Add filters to library dependencies
libraryDependencies += filters

// Google 'guice' injection dependency
libraryDependencies += guice

// Add jdbc for database access
libraryDependencies += jdbc

// Use scala-logging for all my logging needs
lazy val ScalaLoggingVersion = "3.9.2"
libraryDependencies += "com.typesafe.scala-logging" %% "scala-logging" % ScalaLoggingVersion

// Logging module for slf4j implementation
lazy val LogbackVersion = "1.2.3"
libraryDependencies += "ch.qos.logback" % "logback-classic" % LogbackVersion

// Testing libraries from scala
lazy val ScalaTestVersion = "3.1.1"
lazy val ScalaMockVersion = "4.4.0"
libraryDependencies ++= Seq(
    "org.scalatest" %% "scalatest" % ScalaTestVersion % "it,test",
    "org.scalamock" %% "scalamock" % ScalaMockVersion % "test"
)

// Need PostgreSQL driver for doobie
lazy val PostgresVersion = "42.2.14"
libraryDependencies += "org.postgresql" % "postgresql" % PostgresVersion

// Importing Anorm library from Play for database access
lazy val AnormVersion = "2.6.7"
libraryDependencies += "org.playframework.anorm" %% "anorm" % AnormVersion

// Using FlywayDB for migrations
lazy val FlywayVersion = "6.0.0"
libraryDependencies += "org.flywaydb" %% "flyway-play" % FlywayVersion