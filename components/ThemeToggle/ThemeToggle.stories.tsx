import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { ThemeToggle, ThemeToggleProps } from "./ThemeToggle";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const Template = withThemedTemplate(ThemeToggle);

const meta: Meta<ThemeToggleProps> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  argTypes: {
    onChange: { action: "toggled" },
    checked: {
      control: "boolean",
      description: "Whether dark mode is enabled",
    },
  },
  args: {
    checked: false,
    disabled: false,
    ...(Template.args as Partial<ThemeToggleProps>),
  },
};

export default meta;

type Story = StoryObj<ThemeToggleProps>;

export const Idle: Story = {
  render: (initialArgs) => {
    const [args, updateArgs] = useArgs();
    const Themed = withThemedTemplate(ThemeToggle);

    return (
      <Themed
        {...args}
        onChange={(checked) => {
          updateArgs({ checked });
          initialArgs.onChange?.(checked as unknown as never);
        }}
      />
    );
  },
}; 