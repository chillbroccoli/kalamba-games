import { Link } from "react-router-dom";

import placeholderImage from "@/assets/images/placeholder-image.png";
import { Routing } from "@/lib/api/routing";
import { ClientRoutes } from "@/lib/constants/routes";
import { cn } from "@/lib/helpers/cn";
import { Profile } from "@/lib/types/api";

type AvatarProps = {
  user: Profile;
  alt: string;
  className?: string;
};

export default function Avatar({ user, alt, className = "" }: AvatarProps) {
  const userImg = user.image || placeholderImage;
  const href = Routing.getInterpolatedRoute([ClientRoutes.PROFILE, { username: user.username }]);

  return (
    <Link to={href}>
      <img src={userImg} alt={alt} className={cn(className)} />
    </Link>
  );
}
