import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { RegistrationForm } from "../components/RegistrationForm";
import { UsersTable } from "../components/UsersTable";
import { fetchUsers, selectUsers } from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "./../store/hooks";
import styles from "../styles/pages/app.module.scss";
import { Button } from "../components/Button";

const App = () => {
  const users = useAppSelector(selectUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className={styles.container}>
      <Header></Header>

      <main>
        <Button onClick={() => setIsModalOpen(true)}>
          Register new employee
        </Button>
        <UsersTable users={users} />
      </main>

      <Modal
        title="Add New Employee"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <RegistrationForm />
      </Modal>
    </div>
  );
};

export default App;
