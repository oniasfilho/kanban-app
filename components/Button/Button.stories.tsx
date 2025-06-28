import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect } from "@storybook/jest";
import { Button, ButtonProps } from "./Button";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

// Cast to any to satisfy generic since Button does not declare `theme` prop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = withThemedTemplate<any>(Button as any);

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  render: Template,
  argTypes: {
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button",
    ...(Template.args as Partial<ButtonProps>),
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
  play: async ({ canvasElement }) => {
    const { within, userEvent } = await import("@storybook/testing-library");
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    expect(button).toBeInTheDocument();
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
