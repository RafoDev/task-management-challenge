import GridIcon from "/src/assets/icons/dashboard.svg?react";
import ListIcon from "/src/assets/icons/list.svg?react";

import { NavLink } from "react-router-dom";
import styles from "./topbar.module.scss";

export const Topbar = () => {
  return (
    <nav className={styles.container}>
      <NavLink
        to="/table"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
        }
      >
        <figure className={styles.iconContainer}>
          <ListIcon className={styles.icon} />
        </figure>
        <span className={`${styles.label} body-s-regular`}>Task</span>
      </NavLink>
      <NavLink
        to="/kanban"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
        }
      >
        <figure className={styles.iconContainer}>
          <GridIcon className={styles.icon} />
        </figure>
        <span className={`${styles.label} body-s-regular`}>Dashboard</span>
      </NavLink>
    </nav>
  );
};
