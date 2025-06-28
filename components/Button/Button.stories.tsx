import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button",
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const PrimaryLarge: Story = {
  args: {
    variant: "primary",
    size: "l",
    disabled: false,
  },
};

export const PrimarySmall: Story = {
  args: {
    variant: "primary",
    size: "s",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "l",
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "l",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "l",
    disabled: true,
  },
};
