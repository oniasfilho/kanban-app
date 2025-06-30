import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect } from "@storybook/jest";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const Template = withThemedTemplate(Checkbox);

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: { action: "changed" },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    label: {
      control: "text",
      description: "Label for the checkbox",
    },
  },
  args: {
    label: "Subtask",
    checked: false,
    disabled: false,
    ...(Template.args as Partial<CheckboxProps>),
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Idle: Story = {
  render: (initialArgs) => {
    const [args, updateArgs] = useArgs();
    const Themed = withThemedTemplate(Checkbox);

    return (
      <Themed
        {...args}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
          initialArgs.onChange?.(event); // trigger action logger
        }}
      />
    );
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
  render: Template,
};
