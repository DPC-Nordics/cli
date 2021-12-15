#!/usr/bin/env node

import { Command } from "commander";
import { generateFigSpec } from "@withfig/commander";

import { version } from "../package.json";
import { nextCommand } from "./next";

console.clear();
console.log("DPC Next CLI\n------------");

const program = new Command();
program.version(version);
program.addCommand(nextCommand);

if (process.env.NODE_ENV === "development") {
  program
    .command("gfs")
    .description("Generate a fig spec")
    .action(() => {
      generateFigSpec(program, ".fig/autocomplete/src/my-cli.ts");
    });
}

program.parse(process.argv);
