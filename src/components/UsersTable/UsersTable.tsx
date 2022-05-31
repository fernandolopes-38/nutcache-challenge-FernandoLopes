import React, { useState } from "react";
import { User } from "../../types";
import { Modal } from "../Modal";
import { TableButton } from "../TableButton/TableButton";
import styles from "./styles.module.scss";

interface UsersTableProps {
  users: User[];
}
export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteEmployee = (id: string) => {
    console.log({ id });
    setIsModalOpen(true);
  };

  return (
    <div data-testid="users-table" className={styles.table__container}>
      <table>
        <colgroup>
          <col width="25%" />
          <col width="31%" />
          <col width="15%" />
          <col width="15%" />
          <col width="7%" />
          <col width="7%" />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Team</th>
            <th className={styles.flex__center}></th>
            <th className={styles.flex__center}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.startDate}</td>
              <td>{user?.team ?? "-"}</td>
              <td>
                <div className={styles.flex__center}>
                  <TableButton>Edit</TableButton>
                </div>
              </td>
              <td>
                <div className={styles.flex__center}>
                  <TableButton
                    theme="delete"
                    onClick={() => handleDeleteEmployee(user._id)}
                  >
                    Delete
                  </TableButton>
                </div>
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={6}>No employees....</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        title="Delete Employee"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <button>YES</button>
      </Modal>
    </div>
  );
};
