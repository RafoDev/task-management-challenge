import { Avatar } from "../../../../../../components/ui";
import { formatDate } from "../../../../../tasks/utils";
import { useGetProfileInfoQuery } from "../graphql/queries/getProfileInfo.generated";
import { ProfileField } from "./components/profile-field/profile-field";
import styles from "./profile-info.module.scss";

export const ProfileInfo = () => {
  const { data } = useGetProfileInfoQuery();

  const profileFields = [
    {
      label: "Email address",
      value: data?.profile.email,
    },
    {
      label: "Creation Date",
      value: formatDate(data?.profile.createdAt).toLowerCase(),
    },
    {
      label: "Last Update",
      value: formatDate(data?.profile.updatedAt).toLowerCase(),
    },
    {
      label: "ID",
      value: data?.profile.id,
    },
  ];

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={`${styles.title} body-xl-bold`}>My Profile</h2>
      </header>
      <section className={styles.sections}>
        <article className={`${styles.section} ${styles.nameSection}`}>
          <div className={styles.avatar}>
            <Avatar
              fullName={data?.profile?.fullName || ""}
              avatar={data?.profile?.avatar || ""}
              size="l"
            />
          </div>
          <h3 className={`${styles.name}`}>{data?.profile.fullName}</h3>
          <span className={styles.type}>{data?.profile.type}</span>
        </article>
        <article className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>

          <section className={styles.fields}>
            {profileFields.map(
              (field) =>
                field.value && (
                  <ProfileField
                    key={field.label}
                    label={field.label}
                    value={field.value}
                  />
                )
            )}
          </section>
        </article>
      </section>
    </section>
  );
};
