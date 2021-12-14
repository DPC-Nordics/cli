import { useEffect } from "react";
import { Box, useApp } from "ink";
import PropTypes from "prop-types";
import { spawn } from "child_process";
import Header from "../components/Header";

export default function Next({ name }: NextProps): JSX.Element {
  useCloseRepo(name);

  return (
    <Box flexDirection="column">
      <Header>{`NextJS E-commerce project ${
        name ? `as "${name}"` : ""
      }`}</Header>
    </Box>
  );
}

interface NextProps {
  name?: string;
}

Next.propTypes = {
  /// Name of the project after cloning
  name: PropTypes.string,
};

Next.positionalArgs = ["name"];

function useCloseRepo(name: string = "dpc-next") {
  const { exit } = useApp();

  useEffect(() => {
    const cloneSpawn = spawn(
      "git",
      ["clone", "https://github.com/DPC-Nordics/dpc-next.git", name],
      { stdio: "inherit" }
    );

    cloneSpawn.addListener("message", (message) => console.log(message));
    cloneSpawn.addListener("close", (exitCode) =>
      exit(exitCode ? new Error("Error occurred") : undefined)
    );

    return () => {
      cloneSpawn.removeAllListeners("message");
      cloneSpawn.removeAllListeners("close");
    };
  }, [name, exit]);
}
