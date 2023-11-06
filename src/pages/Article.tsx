import dayjs from "dayjs";
import { parse } from "marked";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import sanitize from "sanitize-html";

import Avatar from "@/components/Avatar";
import FavoriteArticleButton from "@/components/FavoriteArticleButton";
import FollowProfileButton from "@/components/FollowProfileButton";
import NotFound from "@/components/NotFound";
import ProfileLink from "@/components/ProfileLink";
import Spinner from "@/components/Spinner";
import RootLayout from "@/layouts/RootLayout";
import { api } from "@/lib/api";
import { Routing } from "@/lib/api/routing";
import { ClientRoutes } from "@/lib/constants/routes";
import { RootState } from "@/lib/store";

export default function Article() {
  const params = useParams<{ slug: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, error } = api.articles.useOne({ slug: params.slug }, { enabled: !!params.slug });

  if (error?.response?.status && error.response.status === 404) {
    return (
      <RootLayout>
        <NotFound />
      </RootLayout>
    );
  }

  if (!data?.article || isLoading) {
    return (
      <RootLayout>
        <Spinner />
      </RootLayout>
    );
  }

  const { title, slug, favorited, favoritesCount, createdAt, body, author } = data.article;
  const editArticleHref = Routing.getInterpolatedRoute([ClientRoutes.EDITOR_EDIT_ARTICLE, { slug }]);
  const isArticleOwner = user?.username && user.username === author.username;

  return (
    <RootLayout>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{title}</h1>

            <div className="article-meta">
              <Avatar user={author} alt="Profile Photo" />
              <div className="info">
                <ProfileLink username={author.username} />
                <span className="date">{dayjs(createdAt).format("MMMM D, YYYY")}</span>
              </div>
              <FollowProfileButton username={author.username} following={author.following} />
              &nbsp;&nbsp;
              <FavoriteArticleButton slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
              &nbsp;&nbsp;
              {isArticleOwner && (
                <Link to={editArticleHref} className="btn btn-sm btn-primary">
                  Edit Article
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12" dangerouslySetInnerHTML={{ __html: parse(sanitize(body)) }} />
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Avatar user={author} alt="Profile Photo" />
              <div className="info">
                <ProfileLink username={author.username} />
                <span className="date">{dayjs(createdAt).format("MMMM D, YYYY")}</span>
              </div>
              <FollowProfileButton username={author.username} following={author.following} />
              &nbsp;
              <FavoriteArticleButton slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
