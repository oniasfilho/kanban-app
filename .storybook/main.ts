import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    const path = await import("path");
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias["@storybook/jest"] = path.resolve(
      __dirname,
      "storybook-jest-stub.js"
    );
    return config;
  },
};

export default config;
