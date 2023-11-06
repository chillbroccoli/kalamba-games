import { AuthState } from "@/lib/reducers/auth";

export function getAuthToken() {
  const storageData = localStorage.getItem("auth");
  const auth: AuthState | undefined = storageData ? JSON.parse(storageData) : undefined;

  return auth?.user?.token;
}
