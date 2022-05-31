import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: string;
}

export const TableButton: React.FC<TableButtonProps> = ({
  children,
  theme,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${theme === "delete" ? styles.delete : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
