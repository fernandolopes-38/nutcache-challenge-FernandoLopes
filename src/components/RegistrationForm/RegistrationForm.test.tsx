import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { RegistrationForm } from "./";
import userEvent from "@testing-library/user-event";

const renderRegistrationForm = () => {
  render(
    <Provider store={store}>
      <RegistrationForm />
    </Provider>
  );
};

describe("RegistrationForm", () => {
  it("should render RegistrationForm component", () => {
    renderRegistrationForm();

    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });

  it("should render cpf mask", async () => {
    renderRegistrationForm();
    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });

    await userEvent.type(cpfInput, "11111111111");

    expect(cpfInput).toHaveValue("111.111.111-11");
  });
  it("should render cpf error message when cpf input is invalid", async () => {
    renderRegistrationForm();

    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });
    await userEvent.type(cpfInput, "11111111111");
    expect(cpfInput).toHaveValue("111.111.111-11");
    const submitButton = screen.getByRole("button", { name: "Save" });
    await userEvent.click(submitButton);

    expect(screen.getByText("Invalid CPF.")).toBeInTheDocument();
  });
});
