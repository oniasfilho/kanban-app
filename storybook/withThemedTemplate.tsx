import React from "react";
import type { StoryFn } from "@storybook/nextjs";

type AnyProps = Record<string, unknown>;

export function withThemedTemplate<P extends { theme?: "light" | "dark" }>(
  Component: React.ComponentType<P>
) {
  const Template = ({ theme = "light", ...args }: AnyProps) => (
    <div
      style={{
        position: "fixed",
        margin: 0,
        inset: 0,
        background:
          theme === "dark" ? "var(--color-gray-800)" : "var(--color-white)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "20rem", display: "flex", justifyContent: "center" }}>
        <Component {...(args as P)} theme={theme} />
      </div>
    </div>
  );

  Template.args = {
    theme: "light",
  } as AnyProps;

  return Template as unknown as StoryFn<P & { theme?: "light" | "dark" }>;
}
