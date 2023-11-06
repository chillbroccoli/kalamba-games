import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { navigation } from "@/lib/constants/navigation";
import { ClientRoutes } from "@/lib/constants/routes";
import { cn } from "@/lib/helpers/cn";
import { RootState } from "@/lib/store";

export default function Navbar() {
  const auth = useSelector((state: RootState) => state.auth);
  const navLinkClassName = ({ isActive }: { isActive: boolean }) => cn("nav-link", isActive ? "active" : "");

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={ClientRoutes.HOME}>
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {navigation.map(item => {
            if (item.protected && !auth.loggedIn) {
              return null;
            }
            return (
              <li key={item.name} className="nav-item">
                <NavLink to={item.href} className={navLinkClassName}>
                  {item?.icon ? (
                    <>
                      <i className={item.icon} />
                      &nbsp;
                    </>
                  ) : null}
                  {item.name}
                </NavLink>
              </li>
            );
          })}
          {auth.loggedIn ? (
            <li className="nav-item">
              <NavLink to={ClientRoutes.LOGOUT} className={navLinkClassName}>
                Logout
              </NavLink>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to={ClientRoutes.LOGIN} className={navLinkClassName}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={ClientRoutes.REGISTER} className={navLinkClassName}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
