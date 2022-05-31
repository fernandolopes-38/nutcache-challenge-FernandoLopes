import { screen, render } from "@testing-library/react";
import { UsersTable } from "./";

describe("UsersTable", () => {
  it("should render UsersTable component", () => {
    render(<UsersTable users={[]} />);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
  });

  it("should render users infos", () => {
    render(<UsersTable users={USERS} />);

    expect(screen.getByText(/fernando lopes/i)).toBeInTheDocument();
  });
});

const USERS = [
  {
    _id: "id",
    name: "Fernando Lopes",
    email: "fernando@mail.com",
    gender: "male",
    startDate: "06/2022",
    birthDate: "06/2022",
    cpf: "Frontend",
  },
];
