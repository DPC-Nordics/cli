import { spawn as _spawn, type SpawnOptions } from "child_process";

/** Promisify Spawn processes */
export async function spawn(
  command: string,
  args: string[] = [],
  options: SpawnOptions = {}
): Promise<number | null> {
  return new Promise<number | null>(function (resolve, reject) {
    const p = _spawn(command, args, { stdio: "inherit", ...options });
    p.on("exit", resolve);
    p.on("error", reject);
  });
}
