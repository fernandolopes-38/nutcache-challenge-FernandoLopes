import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { User } from "../../types";
import { Modal } from "../Modal";
import { Skeleton } from "../Skeleton";
import { TableButton } from "../TableButton/TableButton";
import styles from "./styles.module.scss";
import { selectUsersFetchStatus, updateUser } from "./../../store/usersSlice";
import { ModalConfirmation } from "../ModalConfirmation";
import { RegistrationForm } from "../RegistrationForm";
import { FormData } from "./../../pages/App";
import { useAppDispatch } from "./../../store/hooks";

interface UsersTableProps {
  users: User[];
}
export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const fetchStatus = useAppSelector(selectUsersFetchStatus);
  const dispatch = useAppDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<User>();

  const handleDeleteEmployee = (employee: User) => {
    console.log({ employee });
    setCurrentEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleEditEmployee = async (employee: User) => {
    setCurrentEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleSubmit = async (data: FormData) => {
    await dispatch(updateUser({ userId: currentEmployee!._id, user: data }));
    setIsEditModalOpen(false);
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
          {fetchStatus === "loading" && !users.length ? (
            <tr>
              <td className={styles.skeleton__container}>
                <Skeleton width={200} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={300} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={100} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={150} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton height={24} />
              </td>
            </tr>
          ) : (
            !users.length && (
              <tr>
                <td colSpan={6}>No employees....</td>
              </tr>
            )
          )}
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.startDate}</td>
              <td>{user?.team ?? "-"}</td>
              <td>
                <div className={styles.flex__center}>
                  <TableButton onClick={() => handleEditEmployee(user)}>
                    Edit
                  </TableButton>
                </div>
              </td>
              <td>
                <div className={styles.flex__center}>
                  <TableButton
                    theme="delete"
                    onClick={() => handleDeleteEmployee(user)}
                  >
                    Delete
                  </TableButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Delete employee"
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalConfirmation
          text={`Are you sure to delete ${currentEmployee?.name}?`}
          onYesClick={() => {}}
          onNoClick={() => {}}
        />
      </Modal>
      <Modal
        title="Edit employee"
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <RegistrationForm
          formSubmit={handleSubmit}
          initalData={currentEmployee}
        />
      </Modal>
    </div>
  );
};
