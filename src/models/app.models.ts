export type Comment = {
  id: number;
  user: string;
  text: string;
  date: string;
};

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  source: string;
  date: string;
  image: string;
  likes: number;
  comments: Comment[];
  related: number[];
};

export type SourceItem = {
  id: number;
  name: string;
  url: string;
  icon: string;
};

export type CategoryItem = {
  id: number;
  name: string;
};
