import { infiniteAsyncChunk } from "stunk";

export type Post = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};

interface PostFilters {
  category?: string;
  search?: string;
}

export const infinitePostsChunk = infiniteAsyncChunk<Post, Error, PostFilters>(
  async ({ page, pageSize, search }) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`;
    if (search) url += `&q=${search}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts = await res.json();

    return {
      data: posts.map((post: any) => ({
        id: post.id.toString(),
        title: post.title,
        body: post.body,
        author: `User ${post.userId}`,
        createdAt: new Date().toISOString(),
      })),
      hasMore: posts.length === pageSize,
    };
  },
  {
    pageSize: 10,
    staleTime: 60000,
    cacheTime: 300000,
  }
);
