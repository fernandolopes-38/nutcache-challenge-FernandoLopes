import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { RegistrationForm } from "./";
import userEvent from "@testing-library/user-event";

const mockSubmit = jest.fn();

const renderRegistrationForm = () => {
  render(
    <Provider store={store}>
      <RegistrationForm formSubmit={mockSubmit} />
    </Provider>
  );
};

describe("RegistrationForm", () => {
  it("should render RegistrationForm component", () => {
    renderRegistrationForm();

    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });

  it("should render startDate mask", async () => {
    renderRegistrationForm();
    const startDateInput = screen.getByRole("textbox", {
      name: "Start Date *",
    });

    await userEvent.type(startDateInput, "052021");

    expect(startDateInput).toHaveValue("05/2021");
  });

  it("should render cpf mask", async () => {
    renderRegistrationForm();
    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });

    await userEvent.type(cpfInput, "11111111111");

    expect(cpfInput).toHaveValue("111.111.111-11");
  });

  it("should check if form is submitted with the required fields empty", async () => {
    renderRegistrationForm();
    const submitButton = screen.getByRole("button", { name: "Save" });
    await userEvent.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();
  });
  // it("should render cpf error message when cpf input is invalid", async () => {
  //   renderRegistrationForm();

  //   const cpfInput = screen.getByRole("textbox", { name: "CPF *" });
  //   await userEvent.type(cpfInput, "11111111111");
  //   expect(cpfInput).toHaveValue("111.111.111-11");
  //   const submitButton = screen.getByRole("button", { name: "Save" });
  //   await userEvent.click(submitButton);

  //   expect(screen.getByText("Invalid CPF.")).toBeInTheDocument();
  // });
});
