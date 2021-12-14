#!/usr/bin/env node

import yargs from "yargs";

import nextModule from "./next";

const argv = yargs(process.argv.slice(2))
  .scriptName("dpc-nordics")
  .usage("$0 <cmd> [args]")
  .command(nextModule())
  .alias(["h"], "help")
  .alias("v", "version")
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
