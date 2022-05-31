import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className={`${styles.container} ${error ? styles.error : ""}`}>
      {label && <label htmlFor={label}>{label}</label>}

      <input id={label ?? ""} {...props} />

      {error && <span>{error}</span>}
    </div>
  );
};
