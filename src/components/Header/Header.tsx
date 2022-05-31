import React from "react";
import styles from "./styles.module.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={styles.header}>
      <h1>Nutcache People Manager</h1>
    </header>
  );
};
