import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader/Loader";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: number;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  width,
  loading,
  children,
  ...props
}) => {
  return (
    <button
      className={styles.button}
      {...props}
      style={{ width }}
      disabled={loading}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
