import { join } from "path";
import { Command } from "commander";
import { spawn } from "./helpers";

export const nextCommand = new Command()
  .command("next")
  .option("-i, --install", "Install dependencies.")
  .option("-d, --dev", "Start dev mode after setup.")
  .argument("[name]", "Name of the project directory.", "dpc-next")
  .description("Create new NextJS E-commerce project.")
  .action(createNextProject);

async function createNextProject(
  name: string,
  options: { install?: boolean; dev?: boolean }
) {
  try {
    const path = join(process.cwd(), name);
    await cloneRepo("https://github.com/DPC-Nordics/dpc-next.git", path);
    const preferYarn = await checkYarn();
    if (options.install) {
      await installDeps(path, preferYarn);
      if (options.dev) await runDevMode(path, preferYarn);
    }
    console.log(`\nYour project "${name}" is ready to go!\n`);
  } catch (error: any) {
    console.error("\n" + error.message, "\n");
  }
}

async function cloneRepo(repo: string, name: string) {
  const statusCode = await spawn("git", ["clone", repo, name]);

  if (statusCode !== 0) throw new Error("Could not clone repo");
}

async function installDeps(path?: string, yarn?: boolean) {
  return spawn(yarn ? "yarn" : "npm", ["install"], { cwd: path });
}

async function runDevMode(path?: string, yarn?: boolean) {
  return spawn(yarn ? "yarn" : "npm", ["run", "dev"], { cwd: path });
}

async function checkYarn(): Promise<boolean> {
  const status = await spawn("command", ["-v", "yarn"], { stdio: "ignore" });

  return status === 0;
}
