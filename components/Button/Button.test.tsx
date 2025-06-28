import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", { name: /save/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("button", "primary", "l");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="secondary" size="s">
        Click
      </Button>
    );
    const btn = screen.getByRole("button", { name: /click/i });
    expect(btn).toHaveClass("secondary", "s");
  });

  it("fires onClick when enabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    await user.click(screen.getByRole("button", { name: /press/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not fire onClick when aria-disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button disabled aria-disabled="true" onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole("button", { name: /disabled/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 