import React from "react";
import styles from "./styles.module.scss";

interface User {
  name: string;
  email: string;
  startDate: string;
  team: string;
}

interface UsersTableProps {
  users: User[];
}
export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div data-testid="users-table" className={styles.table__container}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.startDate}</td>
              <td>{user.team}</td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={4}>No users....</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
