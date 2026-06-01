export interface Article {
  id: number;
  title: Record<"ca" | "es", string>;
  category: Record<"ca" | "es", string>;
  date: string; // ISO date string for sorting
  readTime: Record<"ca" | "es", string>;
  image: string;
  description: Record<"ca" | "es", string>;
  alt: Record<"ca" | "es", string>;
  slug: Record<"ca" | "es", string>;
  content: Record<"ca" | "es", string[]>;
  featured?: boolean; // Flag to highlight an article at the top of the news portal
}

export const newsArticles: Article[] = [];
