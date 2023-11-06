import { useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants/keys";

type FollowProfileButtonProps = {
  username: string;
  following: boolean;
};

export default function FollowProfileButton({ username, following }: FollowProfileButtonProps) {
  const queryClient = useQueryClient();

  const onSuccessHandler = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.PROFILE, username],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ARTICLE],
    });
  };

  const { mutate: follow, isPending: isFollowPending } = api.profiles.useFollow(
    { username },
    { onSuccess: onSuccessHandler }
  );
  const { mutate: unfollow, isPending: isUnfollowPending } = api.profiles.useUnfollow(
    { username },
    { onSuccess: onSuccessHandler }
  );

  const handleOnClick = () => {
    if (following) {
      unfollow();
    } else {
      follow();
    }
  };

  const isDisabled = isFollowPending || isUnfollowPending;

  return (
    <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleOnClick} disabled={isDisabled}>
      <i className="ion-plus-round" />
      &nbsp; {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
}
