import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  onRequestClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.container} ${isOpen ? styles.open : styles.close}`}
      >
        <header>
          <h1>{title}</h1>
          <button className={styles.close__btn} onClick={onRequestClose}>
            X
          </button>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};
