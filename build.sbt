// Project-level settings
lazy val commonSettings = Seq(
    name := """mattmaxwell""",
    version := "0.1",
    scalaVersion := "2.13.3",
    scalacOptions ++= Seq(
        "-deprecation",
        "-Ywarn-value-discard",
        "-Xlint:missing-interpolator",
        "-Ypartial-unification"
    )
)

lazy val root = (project in file("."))
    .configs(IntegrationTest)
    .enablePlugins(PlayScala)
    .settings(commonSettings, Defaults.itSettings)

// Google 'guice' injection dependency
libraryDependencies += guice

// Add jdbc for database access
libraryDependencies += jdbc

// Solving the SLF4J implementation problem
lazy val SLF4JVersion = "1.7.5"
libraryDependencies += "org.slf4j" % "slf4j-api" % SLF4JVersion

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

// Importing Doobie library for database access
lazy val DoobieVersion = "0.9.0"
libraryDependencies ++= Seq(
    "org.tpolecat" %% "doobie-core"         % DoobieVersion,
    "org.tpolecat" %% "doobie-hikari"       % DoobieVersion,
    "org.tpolecat" %% "doobie-postgres"     % DoobieVersion,
    "org.tpolecat" %% "doobie-specs2"       % DoobieVersion,
    "org.tpolecat" %% "doobie-scalatest"    % DoobieVersion
)

// Need PostgreSQL driver for doobie
lazy val PostgresVersion = "42.2.14"
libraryDependencies += "org.postgresql" % "postgresql" % PostgresVersion

// Using FlywayDB for migrations
// TODO: Set this mofo up with actual migration files
lazy val FlywayVersion = "6.3.1"
libraryDependencies += "org.flywaydb" % "flyway-core" % FlywayVersion

// JSON library providing automatic derivation of JSON Encoders / Decoders
lazy val CirceVersion = "0.13.0"
libraryDependencies ++= Seq(
    "io.circe" %% "circe-generic" % CirceVersion,
    "io.circe" %% "circe-literal" % CirceVersion % "it,test",
    "io.circe" %% "circe-optics"  % CirceVersion % "it"
)

// pureconfig allows for reading .conf configurations into well typed objects
lazy val PureConfigVersion = "0.12.3"
libraryDependencies ++= Seq(
    "com.github.pureconfig" %% "pureconfig"             % PureConfigVersion,
    "com.github.pureconfig" %% "pureconfig-cats-effect" % PureConfigVersion
)