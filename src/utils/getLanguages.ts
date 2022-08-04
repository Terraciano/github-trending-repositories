import { Repository } from "../types/githubApi.types";

export const getLanguages = (items: Array<Repository> | undefined) => {
  if (!items) return [""];
  return Array.from(
    new Set(
      items
        .map((item) => item.language || "")
        .filter((language) => !!language.length)
    )
  )
    .concat("All")
    .sort();
};
