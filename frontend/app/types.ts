export type Project = {
  documentId: string;
  title: string;
  description: string;
  image: { url: string };
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }
}

export type PostMeta = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};
