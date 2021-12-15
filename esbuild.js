#!/usr/bin/env node
// Script to build CLI with esbuild.

const args = process.argv.slice(2);
const watch = args.includes("watch");

/** @type import("esbuild").BuildOptions */
const buildOptions = {
  entryPoints: ["src/index.ts"],
  outfile: "./bin/index.js",
  bundle: true,
  platform: "node",
  target: ["node14"],
  external: [],
  minify: true,
  watch,
  color: true,
  logLevel: "info",
  define: { "process.env.NODE_ENV": watch ? '"development"' : '"production"' },
};

require("esbuild")
  .build(buildOptions)
  .catch(() => process.exit(1));
