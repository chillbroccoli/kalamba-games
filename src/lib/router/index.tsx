import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary";
import { ClientRoutes } from "@/lib/constants/routes";
import { checkAuth } from "@/lib/loaders/checkAuth";
import { redirectIfAuth } from "@/lib/loaders/redirectIfAuth";
import Article from "@/pages/Article";
import Articles from "@/pages/Articles";
import Editor from "@/pages/Editor";
import Login from "@/pages/Login";
import Logout from "@/pages/Logout";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ClientRoutes.EDITOR} element={<Editor />} loader={checkAuth} />
      <Route path={ClientRoutes.EDITOR_EDIT_ARTICLE} element={<Editor />} loader={checkAuth} />
      <Route path={ClientRoutes.LOGIN} element={<Login />} loader={redirectIfAuth} />
      <Route path={ClientRoutes.LOGOUT} element={<Logout />} />
      <Route path={ClientRoutes.PROFILE} element={<Profile />} />
      <Route path={ClientRoutes.PROFILE_FAVORITES} element={<Profile />} />
      <Route path={ClientRoutes.REGISTER} element={<Register />} loader={redirectIfAuth} />
      <Route path={ClientRoutes.SETTINGS} element={<Settings />} loader={checkAuth} />
      <Route path={ClientRoutes.ARTICLE} element={<Article />} />
      <Route path={ClientRoutes.HOME} element={<Articles />} errorElement={<ErrorBoundary />} />
    </>
  )
);
