import { MutationOptions, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { privateRequest, publicRequest } from "@/lib/api/requests";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { APIRoutes } from "@/lib/constants/routes";
import { LoginUserRequest, UpdateUserRequest, UserResponse } from "@/lib/types/api";

export const user = {
  useLogin: (options?: Omit<MutationOptions<UserResponse, AxiosError, LoginUserRequest>, "mutationFn">) => {
    return useMutation({
      mutationFn: async body => {
        const response: AxiosResponse<UserResponse> = await publicRequest.post(APIRoutes.LOGIN, body);

        return response.data;
      },
      ...options,
    });
  },

  useMe: (options?: Omit<UseQueryOptions<UserResponse, AxiosError>, "queryKey" | "queryFn">) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CURRENT_USER],
      queryFn: async () => {
        const response: AxiosResponse<UserResponse> = await privateRequest.get(APIRoutes.USER);

        return response.data;
      },
      ...options,
    });
  },

  useUpdateUser: (options?: Omit<MutationOptions<UserResponse, AxiosError, UpdateUserRequest>, "mutationFn">) => {
    return useMutation({
      mutationFn: async body => {
        const response: AxiosResponse<UserResponse> = await privateRequest.put(APIRoutes.USER, body);

        return response.data;
      },
      ...options,
    });
  },
};
