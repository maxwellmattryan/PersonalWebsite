// SETTINGS

// Project-level settings
lazy val commonSettings = Seq(
    name := """mattmaxwell""",
    version := "0.1",
    scalaVersion := "2.13.3",
    scalacOptions ++= Seq(
        "-deprecation", // Gives warning and location for usages of deprecated APIs
        "-feature",     // Gives warning and location for usages of features that need to be imported explicitly
        "-unchecked",   // Warns where generated code depends on assumptions

        "-Ywarn-value-discard", // Warns when non-unit expression results are unused

        "-Xfatal-warnings",             // Fail the compilaton if there are any errors
        "-Xlint:missing-interpolator",  // String literal is missing an interpolator ID
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


// RESOLVERS
resolvers += Resolver.jcenterRepo
resolvers += "Atlassian Releases" at "https://maven.atlassian.com/public/"


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

// Silhouette security library for handling authentication
lazy val SilhouetteVersion = "6.1.1"
libraryDependencies ++= Seq(
    "com.mohiva" %% "play-silhouette"                   % SilhouetteVersion,
    "com.mohiva" %% "play-silhouette-password-bcrypt"   % SilhouetteVersion,
    "com.mohiva" %% "play-silhouette-persistence"       % SilhouetteVersion,
    "com.mohiva" %% "play-silhouette-crypto-jca"        % SilhouetteVersion,
    "com.mohiva" %% "play-silhouette-totp"              % SilhouetteVersion,
    "com.mohiva" %% "play-silhouette-testkit"           % SilhouetteVersion % "test",
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

// pureconfig allows for reading .conf configurations into well typed objects
lazy val PureConfigVersion = "0.12.3"
libraryDependencies ++= Seq(
    "com.github.pureconfig" %% "pureconfig"             % PureConfigVersion,
    "com.github.pureconfig" %% "pureconfig-cats-effect" % PureConfigVersion
)