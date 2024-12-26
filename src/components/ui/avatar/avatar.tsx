import { User } from "../../../types";
import styles from "./avatar.module.scss";

type AvatarType = Pick<User, "id" | "fullName" | "avatar"> & {
  placeholder?: boolean;
};

export const Avatar = ({ avatar, placeholder, fullName }: AvatarType) => {
  return (
    <figure className={styles.container}>
      {avatar && <img src={avatar} alt={fullName} className={styles.img} />}
    </figure>
  );
};
