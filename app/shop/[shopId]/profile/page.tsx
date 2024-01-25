import { UserButton } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div>
      ProfilePage
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default ProfilePage