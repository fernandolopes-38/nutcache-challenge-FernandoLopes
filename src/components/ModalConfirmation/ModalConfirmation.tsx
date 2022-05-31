import React from "react";
import { TableButton } from "../TableButton/TableButton";
import styles from "./styles.module.scss";

interface ModalConfirmationProps {
  text: string;
  onYesClick: () => void;
  onNoClick: () => void;
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  text,
  onYesClick,
  onNoClick,
}) => {
  return (
    <div className={styles.container}>
      <h2>{text}</h2>

      <div>
        <TableButton>Yes</TableButton>
        <TableButton>No</TableButton>
      </div>
    </div>
  );
};
