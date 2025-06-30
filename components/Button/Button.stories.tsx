import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect } from "@storybook/jest";
import { Button, ButtonProps } from "./Button";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";
import React from "react";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    children: {
      control: "text",
      description: "Button label",
    },
  },
  args: {
    children: "Click me!",
    theme: "light",
    variant: "primary",
    size: "l",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const PrimaryLarge: Story = {
  render: (initialArgs) => {
    const [args, updateArgs] = useArgs();
    const Themed = withThemedTemplate(Button);

    return (
      <Themed
        {...args}
        onClick={() => {
          updateArgs({ children: "Clicked!" });
          initialArgs.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const { within, userEvent } = await import("@storybook/testing-library");
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    expect(button).toBeInTheDocument();
  },
};
