import { screen, render } from "@testing-library/react";
import { Select } from ".";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should render Input component", () => {
    render(
      <Select>
        <option value=""></option>
      </Select>
    );

    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("should change value to selected option", async () => {
    render(
      <Select>
        <option value=""></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );

    const select = screen.getByRole("combobox");
    const option1 = screen.getByRole("option", {
      name: "Option 1",
    }) as HTMLOptionElement;

    await userEvent.selectOptions(select, option1);

    expect(option1.selected).toBe(true);
  });
});
