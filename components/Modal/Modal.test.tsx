import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("calls onClose when Escape pressed", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Modal open onClose={handleClose} ariaLabel="modal">
        <div>Modal body</div>
      </Modal>
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalled();
  });
}); 