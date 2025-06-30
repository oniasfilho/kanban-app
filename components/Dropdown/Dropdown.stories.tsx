import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Dropdown, DropdownProps } from "./Dropdown";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const options = [
  { value: "todo", label: "Todo" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const meta: Meta<DropdownProps> = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    options,
    value: "todo",
    theme: "light",
  },
  argTypes: {
    onChange: { action: "changed" },
    options: { table: { disable: true } },
    value: {
      control: {
        type: "select",
        options: options.map((o) => o.value),
      },
    },
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

export const Idle: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    const Themed = withThemedTemplate(Dropdown);

    return (
      <Themed
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};
