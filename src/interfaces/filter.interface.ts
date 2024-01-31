export type AllowedQueries = "title" | "authorId" | "content" | null;

export interface Filter {
  key?: AllowedQueries;
  value?: string | number;
}
