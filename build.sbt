lazy val root = (project in file("."))
    .enablePlugins(PlayScala)
    .enablePlugins(ScalikejdbcPlugin)
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
    "org.postgresql"    %  "postgresql"                    % "42.2.14",

    // ScalikeJdbc imports
    jdbc,
    "org.scalikejdbc"   %% "scalikejdbc"                   % "3.5.0",
    "org.scalikejdbc"   %% "scalikejdbc-config"            % "3.5.0",
    "org.scalikejdbc"   %% "scalikejdbc-test"              % "3.5.0"   % "test",

    "org.scalikejdbc"   %% "scalikejdbc-play-fixture"      % "2.8.0-scalikejdbc-3.5",
    "org.scalikejdbc"   %% "scalikejdbc-play-initializer"  % "2.8.0-scalikejdbc-3.5",

    // Logger backend library
    "ch.qos.logback"    %   "logback-classic"               % "1.2.3"
)

scalikejdbcSettings