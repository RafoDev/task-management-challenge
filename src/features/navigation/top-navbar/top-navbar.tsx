import SearchIcon from "/src/assets/icons/search.svg?react";
import NotificationIcon from "/src/assets/icons/notification.svg?react";
import CleanIcon from "/src/assets/icons/clean.svg?react";
import styles from "./top-navbar.module.scss";
import { Profile } from "./components";
import { useState } from "react";

export const TopNavbar = () => {
  const [showInput, setShowInput] = useState(false);

  const onShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <nav className={styles.container}>
      <Profile />
      <form
        className={`${styles.inputContainer} ${
          showInput ? styles.inputContainerShow : ""
        }`}
      >
        <div
          className={styles.searchIconContainer}
          onClick={() => onShowInput()}
        >
          <SearchIcon className={styles.icon} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className={`${styles.input} ${showInput ? styles.inputShow : ""}`}
        />
        <div className={styles.cleanIconContainer}>
          <CleanIcon className={styles.icon} />
        </div>
      </form>

      <div className={styles.notificationIconContainer}>
        <NotificationIcon className={styles.icon} />
      </div>
    </nav>
  );
};
