import UserProfileHeader from "@/components/user/general/ProfileHeader";
import UserProfileCard from "@/components/user/general/UserProfileCard";
import UserProfileTabs from "@/components/user/tabs/UserProfileTabs";

const UserProfile = () => {
  return (
    <>
      <UserProfileHeader />
      <UserProfileCard />
      <UserProfileTabs />
    </>
  );
};

export default UserProfile;
