import { fetcher } from "./fetcher";
import { ApiResponse } from "../types/githubApi.types";
import { useQuery } from "@tanstack/react-query";
import { normalizeData } from "../utils/normalizeData";

export const useGithubData = () => {
  const { error, data } = useQuery<ApiResponse>(["githubData"], fetcher);
  return {
    items: data && normalizeData(data.items),
    error,
  };
};
