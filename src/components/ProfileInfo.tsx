import { Profile } from "@/lib/types/api";

import Avatar from "./Avatar";
import FollowProfileButton from "./FollowProfileButton";

export default function ProfileInfo({ user }: { user: Profile }) {
  return (
    <>
      <Avatar user={user} alt="Profile Photo" className="user-img" />
      <h4>{user.username}</h4>
      <p>{user.bio}</p>
      <FollowProfileButton username={user.username} following={user.following} />
    </>
  );
}
