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

  it("should call formSubmit if all the required fields are filled", async () => {
    renderRegistrationForm();

    const nameInput = screen.getByRole("textbox", { name: "Name *" });
    const birthDateInput = screen.getByLabelText("Birth Date *");
    const genderSelect = screen.getByRole("combobox", { name: "Gender *" });
    const option = screen.getByRole("option", {
      name: "Male",
    }) as HTMLOptionElement;
    const emailInput = screen.getByRole("textbox", { name: "E-mail *" });
    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });
    const startDateInput = screen.getByRole("textbox", {
      name: "Start Date *",
    });
    const submitButton = screen.getByRole("button", { name: "Save" });

    await userEvent.type(nameInput, "Fernando");
    await userEvent.type(birthDateInput, "1992-06-13");
    await userEvent.type(emailInput, "fernando@mail.com");
    await userEvent.type(cpfInput, "08875457425");
    await userEvent.type(startDateInput, "122020");
    await userEvent.selectOptions(genderSelect, option);

    await userEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("should show CPF error message if CPF is invalid", async () => {
    renderRegistrationForm();

    const nameInput = screen.getByRole("textbox", { name: "Name *" });
    const birthDateInput = screen.getByLabelText("Birth Date *");
    const genderSelect = screen.getByRole("combobox", { name: "Gender *" });
    const option = screen.getByRole("option", {
      name: "Male",
    }) as HTMLOptionElement;
    const emailInput = screen.getByRole("textbox", { name: "E-mail *" });
    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });
    const startDateInput = screen.getByRole("textbox", {
      name: "Start Date *",
    });
    const submitButton = screen.getByRole("button", { name: "Save" });

    await userEvent.type(nameInput, "Fernando");
    await userEvent.type(birthDateInput, "1992-06-13");
    await userEvent.type(emailInput, "fernando@mail.com");
    await userEvent.type(cpfInput, "11111111111");
    await userEvent.type(startDateInput, "122020");
    await userEvent.selectOptions(genderSelect, option);
    await userEvent.click(submitButton);

    expect(screen.getByText(/Invalid CPF./i)).toBeInTheDocument();
  });

  it("should show StartDate error message if StartDate is invalid", async () => {
    renderRegistrationForm();

    const nameInput = screen.getByRole("textbox", { name: "Name *" });
    const birthDateInput = screen.getByLabelText("Birth Date *");
    const genderSelect = screen.getByRole("combobox", { name: "Gender *" });
    const option = screen.getByRole("option", {
      name: "Male",
    }) as HTMLOptionElement;
    const emailInput = screen.getByRole("textbox", { name: "E-mail *" });
    const cpfInput = screen.getByRole("textbox", { name: "CPF *" });
    const startDateInput = screen.getByRole("textbox", {
      name: "Start Date *",
    });
    const submitButton = screen.getByRole("button", { name: "Save" });

    await userEvent.type(nameInput, "Fernando");
    await userEvent.type(birthDateInput, "1992-06-13");
    await userEvent.type(emailInput, "fernando@mail.com");
    await userEvent.type(cpfInput, "08875457425");
    await userEvent.type(startDateInput, "132020");
    await userEvent.selectOptions(genderSelect, option);
    await userEvent.click(submitButton);

    expect(screen.getByText(/Invalid start date./i)).toBeInTheDocument();
  });
});
