import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders icons", () => {
    render(<ThemeToggle checked={false} />);

    const lightIcon = screen.getByAltText(/light theme/i);
    const darkIcon = screen.getByAltText(/dark theme/i);

    expect(lightIcon).toBeInTheDocument();
    expect(darkIcon).toBeInTheDocument();
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<ThemeToggle checked={false} onChange={handleChange} />);

    const switchInput = screen.getByLabelText(/toggle dark mode/i);
    await user.click(switchInput);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<ThemeToggle checked={false} disabled onChange={handleChange} />);

    const switchInput = screen.getByLabelText(/toggle dark mode/i);
    await user.click(switchInput);

    expect(handleChange).not.toHaveBeenCalled();
  });
}); 