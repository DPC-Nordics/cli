import { Box, Text, Newline } from "ink";
import SelectInput from "ink-select-input";
import { type Item } from "ink-select-input/build/SelectInput";
import { useState } from "react";

import Next from "./next";
import Header from "../components/Header";

const commands = [
  { value: "next", label: "NextJS E-commerce", component: <Next /> },
];

export default function Index(): JSX.Element {
  const [commandComponent, setCommandComponent] = useState<JSX.Element | null>(
    null
  );

  const handleSelect = (item: Item<string>) => {
    const { component } =
      commands.find((command) => command.value === item.value) || {};

    if (component) setCommandComponent(component);
  };

  return (
    <Box flexDirection="column">
      <Header>The following commands are available:</Header>

      <SelectInput items={commands} onSelect={handleSelect} isFocused />

      {commandComponent}
    </Box>
  );
}
