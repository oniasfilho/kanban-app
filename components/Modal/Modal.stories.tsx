import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../Button/Button";
import { withThemedTemplate } from "../../storybook/withThemedTemplate";

const meta: Meta<ModalProps> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    onClose: { action: "closed" },
    size: {
      options: ["s", "m", "l", "fullscreen"],
      control: { type: "radio" },
    },
    showClose: {
      control: "boolean",
      description: "Render close (×) button",
    },
    theme: {
      options: ["light", "dark"],
      control: { type: "radio" },
    },
  },
  args: {
    size: "m",
    theme: "light",
    showClose: true,
  } as unknown as Partial<ModalProps>,
};

export default meta;

type Story = StoryObj<ModalProps>;

export const Playground: Story = {
  render: () => {
    const [args, updateArgs] = useArgs();

    const Themed = withThemedTemplate(
      ({
        theme,
        ...rest
      }: { theme?: "light" | "dark" } & Partial<ModalProps>) => (
        <>
          <Button onClick={() => updateArgs({ open: true })}>Open modal</Button>
          <Modal
            {...args}
            {...(rest as ModalProps)}
            theme={theme}
            open={args.open}
            onClose={() => updateArgs({ open: false })}
          >
            <Modal.Header>Manage board</Modal.Header>
            <Modal.Body>
              <p style={{ marginBottom: "1rem" }}>
                This is the body of the modal. Put any content here.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => updateArgs({ open: false })}
              >
                Close
              </Button>
              <Button>Save</Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );

    return <Themed {...args} />;
  },
};
