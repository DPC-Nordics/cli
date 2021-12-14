import { useEffect } from "react";
import { Box } from "ink";
import PropTypes from "prop-types";
import { spawn } from "child_process";
import Header from "../components/Header";

export default function Next({ name = "dpc-next" }: NextProps): JSX.Element {
  useEffect(() => {
    const cloneSpawn = spawn(
      "git",
      ["clone", "https://github.com/DPC-Nordics/dpc-next.git", name],
      { stdio: "inherit" }
    );

    cloneSpawn.addListener("message", (message) => console.log(message));

    return () => {
      cloneSpawn.removeAllListeners("message");
    };
  }, [name]);

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
