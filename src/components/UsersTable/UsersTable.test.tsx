import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { User } from "../../types";
import { UsersTable } from "./";

const renderRegistrationForm = (users: User[]) => {
  render(
    <Provider store={store}>
      <UsersTable users={users} />
    </Provider>
  );
};

describe("UsersTable", () => {
  it("should render UsersTable component", () => {
    renderRegistrationForm([]);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
  });

  it("should render users infos", () => {
    renderRegistrationForm(USERS);

    expect(screen.getByText(/fernando lopes/i)).toBeInTheDocument();
  });

  it("should render all users", () => {
    renderRegistrationForm(USERS);

    const rows = screen.getAllByRole("row");

    expect(rows.length).toBe(USERS.length + 1);
  });

  it("should show empty array message if there are no employees", () => {
    renderRegistrationForm([]);

    expect(screen.getByText(/No employees..../i)).toBeInTheDocument();
  });
});

const USERS = [
  {
    _id: "id",
    name: "Fernando Lopes",
    email: "fernando@mail.com",
    gender: "male",
    startDate: "06/2022",
    birthDate: "1992-06-13",
    cpf: "08875457425",
    team: "frontend",
  },
  {
    _id: "id1",
    name: "Fernando Cruz",
    email: "fernando@mail.com",
    gender: "male",
    startDate: "06/2022",
    birthDate: "1992-06-13",
    cpf: "08875457425",
    team: "frontend",
  },
  {
    _id: "id2",
    name: "Fernando Agra",
    email: "fernando@mail.com",
    gender: "male",
    startDate: "06/2022",
    birthDate: "1992-06-13",
    cpf: "08875457425",
    team: "frontend",
  },
];
