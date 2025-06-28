import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default with label", () => {
    render(<Checkbox label="Subtask" />);
    const checkbox = screen.getByRole("checkbox", { name: /subtask/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const container = checkbox.closest("label");
    expect(container).toHaveClass("container");
  });

  it("applies theme class", () => {
    render(<Checkbox label="Task" theme="dark" />);
    const checkbox = screen.getByRole("checkbox", { name: /task/i });
    const container = checkbox.closest("label");
    expect(container).toHaveClass("dark");
  });

  it("toggles and fires onChange when enabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Checkbox label="Done" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox", { name: /done/i });
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Checkbox label="Dormant" disabled onChange={handleChange} />
    );
    const checkbox = screen.getByRole("checkbox", { name: /dormant/i });
    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });
}); 