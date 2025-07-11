import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textfield } from "./Textfield";

describe("Textfield", () => {
  it("renders with placeholder", () => {
    render(<Textfield placeholder="Enter task" />);
    const input = screen.getByPlaceholderText(/enter task/i);
    expect(input).toBeInTheDocument();
  });

  it("updates value on change", async () => {
    const user = userEvent.setup();
    render(<Textfield placeholder="Task" />);
    const input = screen.getByPlaceholderText(/task/i);
    await user.type(input, "Build");
    expect(input).toHaveValue("Build");
  });

  it("applies error style and shows message", () => {
    render(<Textfield error />);
    const input = screen.getByRole("textbox");
    const star = screen.getByText("Can't be empty");
    expect(star).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
}); 