import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { RegistrationForm } from "../components/RegistrationForm";
import { UsersTable } from "../components/UsersTable";
import { fetchUsers, registerUser, selectUsers } from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "./../store/hooks";
import styles from "../styles/pages/app.module.scss";
import { Button } from "../components/Button";
import { validateCpf, validateStartDate } from "../utils/validator.utils";
import { Input } from "../components/Form/Input";
import { User } from "../types";

export interface FormData {
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  cpf: string;
  startDate: string;
  team?: string;
}

const App = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setUsersFiltered(users);
  }, [users]);

  const handleSubmit = async (data: FormData) => {
    await dispatch(registerUser(data));
    setIsModalOpen(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.team?.toLowerCase().includes(value)
    );
    setUsersFiltered(filteredUsers);
  };

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <div className={styles.row}>
          <Input
            type="search"
            placeholder="Search"
            width={250}
            onChange={handleSearch}
          />

          <Button onClick={() => setIsModalOpen(true)}>
            Register new employee
          </Button>
        </div>
        <UsersTable users={usersFiltered} />
      </main>

      <Modal
        title="Add new employee"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <RegistrationForm formSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default App;
