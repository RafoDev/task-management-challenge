import { useRef, useState } from "react";
import { useOutsideClick } from "../../../../../../../shared/hooks/use-outside-click";
import styles from "./dropdown.module.scss";
import PenIcon from "/src/assets/icons/pen.svg?react";
import ThreeDotsIcon from "/src/assets/icons/three-dots.svg?react";
import TrashIcon from "/src/assets/icons/trash.svg?react";

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ThreeDotsIcon className={styles.icon} />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          <li className={styles.option}>
            <PenIcon className={styles.icon} />
            <span className={`${styles.label} body-m-regular`}>Edit</span>
          </li>
          <li className={styles.option}>
            <TrashIcon className={styles.icon} />
            <span className={styles.label}>Delete</span>
          </li>
        </ul>
      )}
    </div>
  );
};
