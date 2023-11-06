import { redirect } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";

export function checkAuth() {
  const data = localStorage.getItem("auth");
  const auth = data ? JSON.parse(data) : undefined;

  if (!auth?.loggedIn) {
    throw redirect(ClientRoutes.LOGIN);
  }

  return null;
}
