import { Status } from "../../../types";
import { Cell } from "./components/cell/cell";
import { Header } from "./components/header/header";
import styles from "./table-view.module.scss";

const cells: { title: string; status: keyof typeof Status }[] = [
  {
    title: "Working",
    status: "Todo",
  },
  {
    title: "In Progress",
    status: "InProgress",
  },
  {
    title: "Completed",
    status: "Done",
  },
];

export const TableView = () => {
  return (
    <div className={styles.container}>
      <Header />
      {cells.map(({ title, status }) => (
        <Cell key={title} title={title} status={status} />
      ))}
    </div>
  );
};
