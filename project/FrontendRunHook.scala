import sbt._

import scala.sys.process.Process

import play.sbt.PlayRunHook

// PlayRunHook for building front end
object FrontendRunHook {
    def apply(base: File): PlayRunHook = {
        object UIBuildHook extends PlayRunHook {
            var process: Option[Process] = None

            var npmInstall: String = FrontendCommands.install
            var npmRun: String = FrontendCommands.serve

            // Windows requires "cmd /c" prefix for npm commands
            if(System.getProperty("os.name").toLowerCase.contains("win")) {
                npmInstall = "cmd /c" + npmInstall
                npmRun = "cmd /c" + npmRun
            }

            // Run npm installer if node modules don't exist
            override def beforeStarted(): Unit =
                if(!(base / "ui" / "node_modules").exists)
                    Process(npmInstall, base / "ui").!

            // Execute the front start script
            override def afterStarted(): Unit =
                process = Option(Process(npmRun, base / "ui").run)

            // Cleanup the frontend execution processes
            override def afterStopped(): Unit = {
                process.foreach(_.destroy)
                process = None
            }
        }

        UIBuildHook
    }
}
