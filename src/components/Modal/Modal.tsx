import React, { ReactNode, useEffect, useState, AnimationEvent } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  children?: ReactNode;
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
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(isOpen);
  }, [isOpen]);

  const handleAnimationEnd = (_: AnimationEvent) => {
    if (!animation) {
      onRequestClose();
    }
  };

  return (
    <div
      data-testid="modal"
      className={`${styles.wrapper} ${animation ? styles.open : styles.close}`}
    >
      <div
        className={`${styles.container} ${
          animation ? styles.open : styles.close
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <header>
          <h1>{title}</h1>
          <button
            className={styles.close__btn}
            onClick={() => setAnimation(false)}
          >
            X
          </button>
        </header>

        <div>{children}</div>
      </div>

      <div
        className={`${styles.overlay} ${
          animation ? styles.open : styles.close
        }`}
      />
    </div>
  );
};
