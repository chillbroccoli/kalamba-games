import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const queryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof AxiosError || error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  },
});

export const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    if (error instanceof AxiosError || error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
