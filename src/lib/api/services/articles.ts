import { MutationOptions, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { privateRequest, publicRequest } from "@/lib/api/requests";
import { Routing } from "@/lib/api/routing";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { APIRoutes } from "@/lib/constants/routes";
import { MultipleArticlesResponse, NewArticleRequest, SingleArticleResponse } from "@/lib/types/api";

type ArticlesQueryOptions = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};

export const articles = {
  useAll: (
    query?: ArticlesQueryOptions,
    options?: Omit<UseQueryOptions<MultipleArticlesResponse, AxiosError>, "queryKey" | "queryFn">
  ) => {
    return useQuery<MultipleArticlesResponse, AxiosError>({
      queryKey: [QUERY_KEYS.ARTICLES, query],
      queryFn: async () => {
        const response: AxiosResponse<MultipleArticlesResponse> = await publicRequest.get(APIRoutes.ARTICLES, {
          params: query,
        });

        return response.data;
      },
      ...options,
    });
  },

  useOne: (
    { slug }: { slug: string | undefined },
    options?: Omit<UseQueryOptions<SingleArticleResponse, AxiosError>, "queryKey" | "queryFn">
  ) => {
    return useQuery<SingleArticleResponse, AxiosError>({
      queryKey: [QUERY_KEYS.ARTICLE, slug],
      queryFn: async () => {
        if (!slug) {
          throw new Error("Slug is required");
        }

        const response: AxiosResponse<SingleArticleResponse> = await publicRequest.get(
          Routing.getInterpolatedRoute([APIRoutes.ARTICLE, { slug }])
        );

        return response.data;
      },
      ...options,
    });
  },

  useCreateArticle: (
    options?: Omit<MutationOptions<SingleArticleResponse, AxiosError, NewArticleRequest>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async body => {
        const response: AxiosResponse<SingleArticleResponse> = await privateRequest.post(APIRoutes.ARTICLES, body);

        return response.data;
      },
      ...options,
    });
  },

  useUpdateArticle: (
    { slug }: { slug: string },
    options?: Omit<MutationOptions<SingleArticleResponse, AxiosError, NewArticleRequest>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async body => {
        const response: AxiosResponse<SingleArticleResponse> = await privateRequest.put(
          Routing.getInterpolatedRoute([APIRoutes.ARTICLE, { slug }]),
          body
        );

        return response.data;
      },
      ...options,
    });
  },

  useFavorite: (
    { slug }: { slug: string | undefined },
    options?: Omit<MutationOptions<SingleArticleResponse, AxiosError>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async () => {
        if (!slug) {
          throw new Error("Slug is required");
        }

        const response: AxiosResponse<SingleArticleResponse> = await privateRequest.post(
          Routing.getInterpolatedRoute([APIRoutes.FAVORITE, { slug }])
        );

        return response.data;
      },
      ...options,
    });
  },

  useUnfavorite: (
    { slug }: { slug: string | undefined },
    options?: Omit<MutationOptions<SingleArticleResponse, AxiosError>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async () => {
        if (!slug) {
          throw new Error("Slug is required");
        }

        const response: AxiosResponse<SingleArticleResponse> = await privateRequest.delete(
          Routing.getInterpolatedRoute([APIRoutes.FAVORITE, { slug }])
        );

        return response.data;
      },
      ...options,
    });
  },
};
