import { Repository, responseItem } from "../types/githubApi.types";

export const normalizeData = (
  items: Array<responseItem> | undefined
): Array<Repository> | undefined => {
  if (!items) return undefined;
  return items.map((repository) => {
    return {
      name: repository.name,
      date: repository.created_at,
      language: repository.language,
      description: repository.description,
      url: repository.html_url,
      stars: repository.stargazers_count,
      id: repository.id,
    };
  });
};
