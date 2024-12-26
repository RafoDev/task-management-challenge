import SearchIcon from "/src/assets/icons/search.svg?react";
import NotificationIcon from "/src/assets/icons/notification.svg?react";
import CleanIcon from "/src/assets/icons/clean.svg?react";
import styles from "./top-navbar.module.scss";

export const TopNavbar = () => {
  return (
    <nav className={styles.container}>
      <figure className={styles.avatar}>
        <img src="#" alt="avatar" />
      </figure>
      <form className={styles.inputContainer}>
        <input type="text" placeholder="Search" />
        <div className={styles.cleanIconContainer}>
          <CleanIcon className={styles.icon} />
        </div>
      </form>
      <div className={styles.searchIconContainer}>
        <SearchIcon className={styles.icon} />
      </div>
      <div className={styles.notificationIconContainer}>
        <NotificationIcon className={styles.icon} />
      </div>
    </nav>
  );
};
