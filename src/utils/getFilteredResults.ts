import { Repository } from "../types/githubApi.types";

export const getFilteredResults = (
  items: Array<Repository> | undefined,
  language: string | null = "All"
) => {
  if (!items) return undefined;
  if (language === "All" || !language) return items;
  if (language === "Other") return items.filter((item) => !item.language);
  return items.filter((item) => item.language === language);
};
