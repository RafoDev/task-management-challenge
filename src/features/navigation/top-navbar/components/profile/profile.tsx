import { Avatar } from "../../../../../components/ui";
import { useGetProfileQuery } from "./getProfile.generated";

const placeholderAvatar =
  "https://avatars.githubusercontent.com/u/80899413?v=4";

export const Profile = () => {
  const { data } = useGetProfileQuery();

  const profile = data?.profile;
  return (
    <Avatar
      id={profile?.id || ""}
      fullName={profile?.fullName || ""}
      avatar={profile?.avatar || placeholderAvatar}
    />
  );
};
