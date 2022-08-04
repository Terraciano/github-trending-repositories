import { fetcher } from "./fetcher";
import { ApiResponse } from "../types/githubApi.types";
import { useQuery } from "@tanstack/react-query";

export const useGithubData = () => {
  const { error, data } = useQuery<ApiResponse>(["githubData"], fetcher);
  return {
    items: (data && data.items) || undefined,
    error,
  };
};
