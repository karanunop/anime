import "server-only";
import axios, { AxiosError } from "axios";

const API_BASE_URL =
  "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite";
const PAGE_LIMIT = 25;

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type SearchableReview = Pick<Review, "slug" | "title">;

interface ApiResponseItem {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url?: string;
    };
  };
  synopsis: string;
}

interface ApiResponse {
  data: ApiResponseItem[];
}

export interface Review {
  title: string;
  image_url: string;
  slug: string;
  body: string;
}

interface GetReviews {
  mal_id: number;
  title: string;
  image_url: string;
  slug: string;
}

// Simple in-memory cache to store API responses
const cache: { [key: string]: { data: ApiResponse; expiry: number } } = {};

const fetchDataWithCacheAndRetry = async (
  url: string,
  retries = 3
): Promise<ApiResponse> => {
  const cacheKey = url;
  const now = Date.now();

  // Check if data is in cache and not expired
  if (cache[cacheKey] && cache[cacheKey].expiry > now) {
    return cache[cacheKey].data;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get<ApiResponse>(url);
      const expiry = now + 60000; // Cache for 1 minute (60000 ms)
      cache[cacheKey] = { data: response.data, expiry };
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"]
          ? parseInt(error.response.headers["retry-after"], 10) * 1000
          : 10000; // Default to 10 seconds if no header provided

        console.warn(
          `Rate limit exceeded. Retrying in ${retryAfter / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
      } else if (error instanceof Error) {
        console.error(`Attempt ${i + 1} failed:`, error.message);
      } else {
        console.error(`Attempt ${i + 1} failed with an unknown error.`);
      }

      if (i === retries - 1) {
        throw new Error("Failed to fetch data after multiple attempts");
      }
    }
  }

  // If all retries fail, throw an error
  throw new Error("Failed to fetch data after multiple attempts");
};

const mapReviewData = (item: ApiResponseItem): Review => ({
  title: item.title,
  image_url: item.images.jpg.large_image_url || item.images.jpg.image_url,
  slug: generateSlug(item.title),
  body: item.synopsis,
});

const mapGetReviewData = (item: ApiResponseItem): GetReviews => ({
  mal_id: item.mal_id,
  title: item.title,
  image_url: item.images.jpg.image_url,
  slug: generateSlug(item.title),
});

export async function getReview(slug: string): Promise<Review | null> {
  const url = `${API_BASE_URL}&page=1&limit=${PAGE_LIMIT}`;
  const data = await fetchDataWithCacheAndRetry(url);
  return (
    data.data.map(mapReviewData).find((review) => review.slug === slug) || null
  );
}

export async function getReviews(
  pageSize: number,
  page: number
): Promise<GetReviews[]> {
  const url = `${API_BASE_URL}&page=${page}&limit=${pageSize}`;
  const data = await fetchDataWithCacheAndRetry(url);
  return data.data.map(mapGetReviewData);
}

export async function getSlugs(): Promise<string[]> {
  const url = `${API_BASE_URL}&page=1&limit=${PAGE_LIMIT}`;
  const data = await fetchDataWithCacheAndRetry(url);
  return data.data.map((item) => generateSlug(item.title));
}

export async function getSearchableReviews(): Promise<SearchableReview[]> {
  const url = `${API_BASE_URL}&page=1&limit=${PAGE_LIMIT}`;
  const data = await fetchDataWithCacheAndRetry(url);
  return data.data.map((item) => ({
    title: item.title,
    slug: generateSlug(item.title),
  }));
}
