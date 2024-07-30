import "server-only";
import axios from "axios";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export type SearchableReview = Pick<Review, "slug" | "title">;

interface GetReviews {
  mal_id: number;
  title: string;
  image_url: string;
  slug: string;
}

interface ApiResponse {
  data: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
        large_image_url?: string;
      };
    };
    synopsis: string;
  }[];
}

export interface Review {
  title: string;
  image_url: string;
  slug: string;
  body: string;
}

const fetchData = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    throw new Error("Failed to fetch data");
  }
};

export async function getReview(slug: string): Promise<Review | null> {
  const url = "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=1";
  const data = await fetchData(url);

  const review = data.data
    .map((item) => ({
      title: item.title,
      image_url: item.images.jpg.large_image_url || item.images.jpg.image_url,
      slug: generateSlug(item.title),
      body: item.synopsis,
    }))
    .find((review) => review.slug === slug);

  return review || null;
}

export const getReviews = async (pageSize: string, page: number): Promise<GetReviews[]> => {
  const url = `https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=${page}&limit=${pageSize}`;
  const data = await fetchData(url);

  return data.data.map((item) => ({
    mal_id: item.mal_id,
    title: item.title,
    image_url: item.images.jpg.image_url,
    slug: generateSlug(item.title),
  }));
};

export async function getSlugs(): Promise<string[]> {
  const url = "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=1";
  const data = await fetchData(url);

  return data.data.map((item) => generateSlug(item.title));
}

export async function getSearchableReviews(): Promise<SearchableReview[]> {
  const url = "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=1";
  const data = await fetchData(url);

  return data.data.map((item) => ({
    title: item.title,
    slug: generateSlug(item.title),
  }));
}

