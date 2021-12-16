#!/usr/bin/env node

import yargs from "yargs";
import { version } from "../package.json";
import { Header } from "./helpers";
import nextCommand from "./next";

Header();

yargs(process.argv.slice(2))
  .scriptName("dpc-nordics")
  .version(version)
  .usage("$0 <cmd> [args]")
  .command(nextCommand)
  .alias("h", "help")
  .alias("v", "version")
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
