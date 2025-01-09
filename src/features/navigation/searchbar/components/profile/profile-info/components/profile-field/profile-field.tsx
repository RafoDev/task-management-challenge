import styles from "./profile-field.module.scss";

type ProfileFieldProps = { label: string; value: string };
export const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <article className={styles.container}>
      <span className={styles.label}>{label}</span>
      <span className={styles.key}>{value}</span>
    </article>
  );
};
