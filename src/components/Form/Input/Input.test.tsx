import { screen, render } from "@testing-library/react";
import { Input } from "./";

describe("Input", () => {
  it("should render Input component", () => {
    render(<Input />);

    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
});
