import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-backgrounds",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};

export default config; 