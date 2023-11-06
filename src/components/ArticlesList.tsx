import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { Routing } from "@/lib/api/routing";
import { ClientRoutes } from "@/lib/constants/routes";
import { Article } from "@/lib/types/api";

import Avatar from "./Avatar";
import FavoriteArticleButton from "./FavoriteArticleButton";
import ProfileLink from "./ProfileLink";

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <>
      {articles.map(article => {
        const { slug, author, createdAt, favorited, favoritesCount, title, description } = article;

        return (
          <div key={slug} className="article-preview">
            <div className="article-meta">
              <Avatar user={author} alt="Profile Photo" />
              <div className="info">
                <ProfileLink username={author.username} />
                <span className="date">{dayjs(createdAt).format("MMMM D, YYYY")}</span>
              </div>
              <FavoriteArticleButton slug={slug} favorited={favorited} favoritesCount={favoritesCount} compact />
            </div>
            <Link to={Routing.getInterpolatedRoute([ClientRoutes.ARTICLE, { slug }])} className="preview-link">
              <h3>{title}</h3>
              <p>{description}</p>
              <span>Read more...</span>
            </Link>
          </div>
        );
      })}
    </>
  );
}
