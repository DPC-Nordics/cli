import { spawn } from "child_process";
import { type CommandModule, type Argv } from "yargs";

interface Options {
  name?: string;
}

export default function (): CommandModule<{}, Options> {
  return {
    command: "next [name]",
    describe: "Create new NextJS E-commerce project.",
    builder,
    handler,
  };
}

function builder(yargs: Argv): Argv<Options> {
  return yargs.positional("name", {
    type: "string",
    default: "dpc-next",
    describe: "Name of the project directory.",
  });
}

function handler({ name }: Options) {
  createNextProject(name);
}

function createNextProject(name: string = "dpc-next") {
  const dpcNextRepo = "https://github.com/DPC-Nordics/dpc-next.git";

  spawn("git", ["clone", dpcNextRepo, name], { stdio: "inherit" });
}
