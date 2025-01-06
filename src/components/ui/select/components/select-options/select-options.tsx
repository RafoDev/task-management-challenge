import { memo } from "react";
import styles from "./select-options.module.scss";

export const SelectOptions = memo(
  ({ children }: { children: React.ReactNode }) => (
    <div className={styles.options}>{children}</div>
  )
);
