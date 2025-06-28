import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect } from "@storybook/jest";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const Template = withThemedTemplate(Checkbox);

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  render: Template,
  argTypes: {
    onChange: { action: "changed" },
  },
  args: {
    label: "Subtask",
    ...(Template.args as Partial<CheckboxProps>),
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Idle: Story = {
  args: {
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
    disabled: true,
    checked: true,
    theme: "light",
  },
};
