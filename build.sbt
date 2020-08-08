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

    // Disables checksum checking in Maven repo downloads (was throwing error)
    useCoursier := false
)

lazy val root = (project in file("."))
    .configs(IntegrationTest)
    .enablePlugins(PlayScala)
    .enablePlugins(ScalikejdbcPlugin)
    .settings(commonSettings, Defaults.itSettings)

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

// Importing ScalikeJdbc library for database access
lazy val ScalikeJdbcVersion = "3.5.0"
libraryDependencies ++= Seq(
    "org.scalikejdbc" %% "scalikejdbc" % ScalikeJdbcVersion,
    "org.scalikejdbc" %% "scalikejdbc-test" % ScalikeJdbcVersion,
    "org.scalikejdbc" %% "scalikejdbc-config" % ScalikeJdbcVersion,
    "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.8.0-scalikejdbc-3.5"
)

// Need PostgreSQL driver for doobie
lazy val PostgresVersion = "42.2.14"
libraryDependencies += "org.postgresql" % "postgresql" % PostgresVersion

// Using FlywayDB for migrations
// TODO: Set this mofo up with actual migration files
lazy val FlywayVersion = "6.3.1"
libraryDependencies += "org.flywaydb" % "flyway-core" % FlywayVersion