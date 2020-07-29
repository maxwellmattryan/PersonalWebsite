import scala.sys.process.Process

val Success = 0
val Error = 1

// Run angular serve task when running Play in dev mode (using "sbt run")
PlayKeys.playRunHooks += baseDirectory.map(FrontendRunHook.apply).value

val isWindowsOS = System.getProperty("os.name").toLowerCase.contains("win")

def executeCommand(script: String)(implicit dir: File): Int = {
    if(isWindowsOS)
        Process("cmd /c" + script, dir)
    else
        Process(script, dir)
}!

def isNodeModulesInstalled(implicit dir: File): Boolean = (dir / "node_modules").exists

def executeNpmInstall(implicit dir: File): Int = {
    if(isNodeModulesInstalled)
        Success
    else
        executeCommand(FrontendCommands.install)
}

def ifNodeModulesInstalled(task: => Int)(implicit dir: File): Int = {
    if(executeNpmInstall == Success)
        task
    else
        Error
}

def executeUITests(implicit dir: File): Int = ifNodeModulesInstalled(executeCommand(FrontendCommands.test))
def executeUIBuild(implicit dir: File): Int = ifNodeModulesInstalled(executeCommand(FrontendCommands.build))

lazy val `ui-test` = TaskKey[Unit]("Run UI when testing application.")
`ui-test` := {
    implicit val userInterfaceRoot = baseDirectory.value / "ui"
    if (executeUITests != Success)
        throw new Exception("UI tests failed!")
}

lazy val `ui-build` = TaskKey[Unit]("Run UI build when packaging the application.")
`ui-build` := {
    implicit val userInterfaceRoot = baseDirectory.value / "ui"
    if (executeUIBuild != Success)
        throw new Exception("Oops! UI Build crashed.")
}

dist := (dist dependsOn `ui-build`).value
stage := (stage dependsOn `ui-build`).value
test := ((test in Test) dependsOn `ui-test`).value