import React from "react";
import { Button } from "../Button";
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
      <h3>{text}</h3>

      <div className={styles.buttons__container}>
        <Button theme="success" onClick={onYesClick}>
          Yes
        </Button>
        <Button theme="delete" onClick={onNoClick}>
          No
        </Button>
      </div>
    </div>
  );
};
