import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect } from "@storybook/jest";
import { Checkbox, CheckboxProps } from "./Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: { action: "changed" },
  },
  args: {
    label: "Subtask",
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Idle: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const { within, userEvent } = await import("@storybook/testing-library");

    const canvas = within(canvasElement);
    const label = canvas.getByText(/subtask/i).closest("label") as HTMLElement;
    await userEvent.hover(label);

    expect(label).toHaveStyle({
      background: "var(--color-gray-700-bg)",
    });
  },
};

export const Completed: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
