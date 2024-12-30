import { Avatar } from "../../../../../components/ui";
import { useGetProfileQuery } from "./getProfile.generated";

export const Profile = () => {
  const { data } = useGetProfileQuery();

  const profile = data?.profile;
  return (
    <Avatar
      id={profile?.id || ""}
      fullName={profile?.fullName || ""}
      avatar={profile?.avatar}
      size="m"
    />
  );
};
