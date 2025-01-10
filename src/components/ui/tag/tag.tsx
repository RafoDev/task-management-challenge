import { ReactNode } from "react";
import styles from "./tag.module.scss";
import { TaskTag } from "../../../types";

const styleMapping: Record<
  TaskTag | "neutral" | "urgent" | "placeholder",
  string
> = {
  [TaskTag.Android]: styles["style-ANDROID"],
  [TaskTag.Ios]: styles["style-IOS"],
  [TaskTag.NodeJs]: styles["style-NODE_JS"],
  [TaskTag.Rails]: styles["style-RAILS"],
  [TaskTag.React]: styles["style-REACT"],
  neutral: styles["style-neutral"],
  urgent: styles["style-urgent"],
  placeholder: styles["style-placeholder"],
};

export const Tag = ({
  children,
  style,
}: {
  children: ReactNode;
  style: TaskTag | "neutral" | "urgent" | "placeholder";
}) => {
  const className = styleMapping[style];
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
