import { useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { cn } from "@/lib/helpers/cn";

type FavoriteArticleButtonProps = {
  favorited: boolean;
  slug: string;
  favoritesCount: number;
  compact?: boolean;
};

export default function FavoriteArticleButton({
  favorited,
  favoritesCount,
  slug,
  compact = false,
}: FavoriteArticleButtonProps) {
  const queryClient = useQueryClient();

  const onSuccessHandler = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ARTICLE, slug],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ARTICLES],
    });
  };

  const { mutate: favorite, isPending: isFavoritePending } = api.articles.useFavorite(
    { slug },
    { onSuccess: onSuccessHandler }
  );
  const { mutate: unfavorite, isPending: isUnfavoritePending } = api.articles.useUnfavorite(
    { slug },
    { onSuccess: onSuccessHandler }
  );

  const handleOnClick = () => {
    if (favorited) {
      unfavorite();
    } else {
      favorite();
    }
  };

  const isDisabled = isFavoritePending || isUnfavoritePending;

  return (
    <button
      className={cn("btn btn-sm", favorited ? "btn-primary" : "btn-outline-primary", compact ? "pull-xs-right" : "")}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      {compact ? (
        <>
          <i className="ion-heart" /> {favoritesCount}
        </>
      ) : (
        <>
          <i className="ion-heart" />
          &nbsp; {favorited ? "Unfavorite" : "Favorite"} Post <span className="counter">({favoritesCount})</span>
        </>
      )}
    </button>
  );
}
