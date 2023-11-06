export enum APIRoutes {
  ARTICLES = "/api/articles",
  ARTICLE = "/api/articles/:slug",
  FAVORITE = "/api/articles/:slug/favorite",
  PROFILE = "/api/profiles/:username",
  FOLLOW = "/api/profiles/:username/follow",
  LOGIN = "/api/users/login",
  USERS = "/api/users",
  USER = "/api/user",
}

export enum ClientRoutes {
  HOME = "/",
  ARTICLE = "/:slug",
  PROFILE = "/profile/:username",
  PROFILE_FAVORITES = "/profile/:username/favorites",
  EDITOR = "/editor",
  EDITOR_EDIT_ARTICLE = "/editor/:slug",
  LOGIN = "/login",
  REGISTER = "/register",
  LOGOUT = "/logout",
  SETTINGS = "/settings",
}
