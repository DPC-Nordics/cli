import { Newline, Text } from "ink";
import { useEffect, useLayoutEffect } from "react";

export default function Header({ children }: { children?: string }) {
  return (
    <Text>
      <Newline />
      <Text bold>{"DPC Nordics CLI"}</Text>
      <Newline />
      {children ? (
        <>
          {children}
          <Newline />
        </>
      ) : null}
    </Text>
  );
}
