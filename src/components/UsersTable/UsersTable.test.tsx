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
    name: "Fernando Lopes",
    email: "fernando@mail.com",
    startDate: "06/2022",
    team: "Frontend",
  },
];
