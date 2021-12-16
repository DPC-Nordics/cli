import type { CommandModule, Argv, Arguments } from "yargs";
import { join } from "path";
import { spawn } from "./helpers";

export default {
  command: "next [name]",
  describe: "Create new NextJS E-commerce project.",
  builder,
  handler,
} as CommandModule;

function builder(yargs: Argv) {
  yargs.positional("name", {
    type: "string",
    default: "dpc-next",
    describe: "Name of the project directory.",
  });

  yargs.option("i", {
    alias: "install",
    describe: "Install dependencies.",
    type: "boolean",
    default: false,
  });

  yargs.option("d", {
    alias: "dev",
    describe: "Start dev mode after setup.",
    type: "boolean",
    default: false,
  });

  return yargs;
}

interface Options extends Arguments {
  name: string;
  install: boolean;
  dev: boolean;
}

async function handler({ name, install, dev }: Options) {
  try {
    const path = join(process.cwd(), name);
    await cloneRepo("https://github.com/DPC-Nordics/dpc-next.git", path);
    const preferYarn = await checkYarn();
    if (install) {
      await installDeps(path, preferYarn);
      if (dev) await runDevMode(path, preferYarn);
    }
    console.log(`\nYour project "${name}" is ready to go!\n`);
  } catch (error: any) {
    console.error("\n" + error.message, "\n");
  }
}

// Helpers

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
