export type Repository = {
  name: string;
  description: string;
  url: string;
  stars: number;
  id: number;
  language: string;
  date: string;
};

export type responseItem = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  id: number;
  language: string;
  created_at: string;
};

export type ApiResponse = {
  items: Array<responseItem>;
};
