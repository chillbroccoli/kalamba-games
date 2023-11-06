import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import ArticlesList from "@/components/ArticlesList";
import ProfileInfo from "@/components/ProfileInfo";
import Spinner from "@/components/Spinner";
import RootLayout from "@/layouts/RootLayout";
import { api } from "@/lib/api";
import { Routing } from "@/lib/api/routing";
import { ClientRoutes } from "@/lib/constants/routes";
import { cn } from "@/lib/helpers/cn";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ username: string }>();
  const showFavorites = location.pathname.endsWith("/favorites");

  if (!params.username) {
    toast.error("Not found");
    navigate(ClientRoutes.HOME);
    return;
  }

  const { data: profileData, isLoading: isProfileDataLoading } = api.profiles.useOne(
    { username: params.username },
    { enabled: !!params.username }
  );
  const { data: articlesData, isLoading: isArticlesDataLoading } = api.articles.useAll(
    { author: params.username, ...(showFavorites && { favorited: params.username }) },
    { enabled: !!params.username }
  );

  return (
    <RootLayout>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {profileData?.profile && !isProfileDataLoading ? (
                  <ProfileInfo user={profileData.profile} />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      to={Routing.getInterpolatedRoute([ClientRoutes.PROFILE, { username: params.username }])}
                      className={cn("nav-link", !showFavorites ? "active" : "")}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={Routing.getInterpolatedRoute([ClientRoutes.PROFILE_FAVORITES, { username: params.username }])}
                      className={cn("nav-link", showFavorites ? "active" : "")}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              {articlesData?.articles && !isArticlesDataLoading ? (
                <ArticlesList articles={articlesData.articles} />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
