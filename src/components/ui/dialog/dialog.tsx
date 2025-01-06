import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./dialog.module.scss";

export type DialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById("modal-root");

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  return { isDialogOpen, closeDialog, openDialog };
};

export const Dialog = ({ isOpen, children, actions, onClose }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={handleOverlayClick}
    >
      <div className={styles.dialog} ref={dialogRef}>
        {children}
        {actions && <footer className={styles.footer}>{actions}</footer>}
      </div>
    </div>,
    modalRoot!
  );
};
