import React, { ReactNode, SelectHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label}>{label}</label>
      <select id={label ?? ""} data-testid="select" {...props}>
        {children}
      </select>
    </div>
  );
};
