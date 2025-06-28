import type { Meta, StoryObj, StoryFn } from "@storybook/nextjs";
import { Textfield, TextfieldProps } from "./Textfield";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const Template = withThemedTemplate(Textfield);

const Render: StoryFn<TextfieldProps> = (props) => <Template {...props} />;

const meta: Meta<TextfieldProps> = {
  title: "Components/Textfield",
  component: Textfield,
  render: Render,
  argTypes: {
    onChange: { action: "changed" },
    error: { control: "boolean", name: "Error" },
  },
  args: {
    placeholder: "Enter task name",
    error: false,
    ...(Template.args as TextfieldProps),
  },
};

export default meta;

type Story = StoryObj<TextfieldProps>;

export const Idle: Story = {};

export const Active: Story = {
  args: {
    value: "Building a slideshow",
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};
