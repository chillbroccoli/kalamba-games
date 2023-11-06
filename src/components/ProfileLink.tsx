import { Link } from "react-router-dom";

import { Routing } from "@/lib/api/routing";
import { ClientRoutes } from "@/lib/constants/routes";
import { Profile } from "@/lib/types/api";

export default function ProfileLink({ username }: { username: Profile["username"] }) {
  const href = Routing.getInterpolatedRoute([ClientRoutes.PROFILE, { username: username }]);

  return (
    <Link to={href} className="author">
      {username}
    </Link>
  );
}
