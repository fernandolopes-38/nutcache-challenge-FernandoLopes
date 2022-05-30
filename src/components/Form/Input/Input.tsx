import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className={styles.container}>
      <input data-testid="input" {...props} />
    </div>
  );
};
