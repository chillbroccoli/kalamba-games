import { MutationOptions, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { privateRequest, publicRequest } from "@/lib/api/requests";
import { Routing } from "@/lib/api/routing";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { APIRoutes } from "@/lib/constants/routes";
import { ProfileResponse } from "@/lib/types/api";

export const profiles = {
  useOne: (
    { username }: { username: string },
    options?: Omit<UseQueryOptions<ProfileResponse, AxiosError>, "queryKey" | "queryFn">
  ) => {
    return useQuery<ProfileResponse, AxiosError>({
      queryKey: [QUERY_KEYS.PROFILE, username],
      queryFn: async () => {
        const response: AxiosResponse<ProfileResponse> = await publicRequest.get(
          Routing.getInterpolatedRoute([APIRoutes.PROFILE, { username }])
        );

        return response.data;
      },
      ...options,
    });
  },

  useFollow: ({ username }: { username: string }, options?: MutationOptions<ProfileResponse, AxiosError>) => {
    return useMutation<ProfileResponse, AxiosError>({
      mutationFn: async () => {
        const response: AxiosResponse<ProfileResponse> = await privateRequest.post(
          Routing.getInterpolatedRoute([APIRoutes.FOLLOW, { username }])
        );

        return response.data;
      },
      ...options,
    });
  },

  useUnfollow: (
    { username }: { username: string },
    options?: Omit<MutationOptions<ProfileResponse, AxiosError>, "mutationFn">
  ) => {
    return useMutation<ProfileResponse, AxiosError>({
      mutationFn: async () => {
        const response: AxiosResponse<ProfileResponse> = await privateRequest.delete(
          Routing.getInterpolatedRoute([APIRoutes.FOLLOW, { username }])
        );

        return response.data;
      },
      ...options,
    });
  },
};
