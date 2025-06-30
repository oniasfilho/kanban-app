import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";

const options = [
  { value: "todo", label: "Todo" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

describe("Dropdown", () => {
  it("renders selected label", () => {
    render(<Dropdown options={options} value="doing" />);
    expect(screen.getByRole("button", { name: /doing/i })).toBeInTheDocument();
  });

  it("opens list and selects option", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Dropdown options={options} value="todo" onChange={handleChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button", { name: /done/i }));
    expect(handleChange).toHaveBeenCalledWith("done");
  });
}); 