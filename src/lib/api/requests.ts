import axios, { type CreateAxiosDefaults } from "axios";

import { getAuthToken } from "@/lib/helpers/getAuthToken";

const CONFIG = {
  baseURL: import.meta.env.VITE_SERVER_ORIGIN,
  withCredentials: true,
  proxy: {
    protocol: import.meta.env.PROD ? "https" : "http",
    host: import.meta.env.VITE_SEVER_HOST,
    port: Number(import.meta.env.VITE_SERVER_PORT),
  },
} satisfies CreateAxiosDefaults;

export const publicRequest = axios.create(CONFIG);
export const privateRequest = axios.create(CONFIG);

// Don't like the idea of  setting Authorization token before each request,
// but with having to store token in `localStorage`, can't think of other way to do that at this time.
// If I'd set Authorization header inside `CONFIG` then the same token would be used for next requests
// even if user has logged out and token was `undefined`

publicRequest.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Token: ${getAuthToken()}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

privateRequest.interceptors.request.use(
  config => {
    const token = getAuthToken();

    // I suppose somewhere around here I'd try to verify the token
    // if token has expired, redirect to /logout
    if (!token) {
      throw new Error("Unauthorized. You must be logged in.");
    }

    config.headers["Authorization"] = `Token: ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
