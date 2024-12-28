import GridIcon from "/src/assets/icons/dashboard.svg?react";
import ListIcon from "/src/assets/icons/list.svg?react";

import { NavLink } from "react-router-dom";
import styles from "./topbar.module.scss";

export const Topbar = () => {
  return (
    <nav className={styles.container}>
      <NavLink to="/" className={styles.link}>
        <figure className={styles.iconContainer}>
          <GridIcon className={styles.icon} />
        </figure>
      </NavLink>
      <NavLink to="/list" className={styles.link}>
        <figure className={styles.iconContainer}>
          <ListIcon className={styles.icon} />
        </figure>
      </NavLink>
    </nav>
  );
};
