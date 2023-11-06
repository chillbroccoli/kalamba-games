import { Link } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <Link to={ClientRoutes.HOME} className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
          under MIT.
        </span>
      </div>
    </footer>
  );
}
