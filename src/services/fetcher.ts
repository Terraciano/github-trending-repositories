import { subWeeks, format } from "date-fns";

const lastWeek = format(subWeeks(new Date(), 1), "yyyy-MM-dd");
const apiEndpoint = `https://api.github.com/search/repositories?q=created:%3E${lastWeek}&sort=stars&order=desc`;

export const fetcher = () => {
  return fetch(apiEndpoint).then((response) => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  });
};
