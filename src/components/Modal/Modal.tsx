import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onRequestClose,
}) => {
  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.container} ${isOpen ? styles.open : styles.close}`}
      >
        <header>
          <h1>Modal Title</h1>
          <button onClick={onRequestClose}>Close</button>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};
