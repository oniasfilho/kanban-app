import type { Meta, StoryObj } from "@storybook/nextjs";
import { Textfield, TextfieldProps } from "./Textfield";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const Template = withThemedTemplate(Textfield);

const meta: Meta = {
  title: "Components/Textfield",
  render: Template,
  component: Textfield,
  argTypes: {
    onChange: { action: "changed" },
  },
  args: {
    placeholder: "Enter task name",
    ...(Template.args as Partial<TextfieldProps>),
  },
};

export default meta;

type Story = StoryObj;

export const Idle: Story = {};

export const Active: Story = {
  args: {
    value: "Building a slideshow",
  },
};

export const Error: Story = {
  args: {
    error: "Can't be empty",
    placeholder: "Enter task name",
  },
};
