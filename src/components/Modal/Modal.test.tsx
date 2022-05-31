import { screen, render } from "@testing-library/react";
import { Modal } from "./";
import userEvent from "@testing-library/user-event";

const mockClose = jest.fn();

describe("Modal", () => {
  it("should render Modal component", () => {
    render(
      <Modal isOpen={true} onRequestClose={mockClose}>
        childen
      </Modal>
    );

    const modal = screen.getByTestId("modal");
    const modalStyles = getComputedStyle(modal);

    expect(modal).toBeInTheDocument();
    expect(modalStyles.visibility).toBe("visible");
  });
});
