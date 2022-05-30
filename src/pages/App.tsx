import { useState } from "react";
import { Modal } from "../components/Modal";
import { RegistrationForm } from "../components/RegistrationForm";
import { UsersTable } from "../components/UsersTable";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <UsersTable users={[]} />

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <RegistrationForm />
      </Modal>
    </div>
  );
};

export default App;
