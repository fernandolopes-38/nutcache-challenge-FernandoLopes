import { screen, render } from "@testing-library/react";
import { Select } from ".";

describe("Input", () => {
  it("should render Input component", () => {
    render(
      <Select>
        <option value=""></option>
      </Select>
    );

    expect(screen.getByTestId("select")).toBeInTheDocument();
  });
});
