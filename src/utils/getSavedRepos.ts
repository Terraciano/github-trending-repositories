import { Repository } from "../types/githubApi.types";

export const getSavedRepos = (items: Array<Repository> | undefined) => {
  const savedRepos: Array<number> = JSON.parse(
    localStorage.getItem("savedRepositories") || "[]"
  );
  if (!items) return [];
  return savedRepos
    .map((savedRepoId) => items.find((item) => savedRepoId === item.id))
    .filter((item) => !!item) as Array<Repository>;
};
