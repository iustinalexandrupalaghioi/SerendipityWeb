import UserProfileHeader from "@/components/user/ProfileHeader";
import UserProfileCard from "@/components/user/UserProfileCard";
import UserProfileTabs from "@/components/user/UserProfileTabs";

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
