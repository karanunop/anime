import "server-only";
import axios from "axios";

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

const fetchData = async (url: string): Promise<ApiResponse> => {
  try {
    const { data } = await axios.get<ApiResponse>(url);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    throw new Error("Failed to fetch data");
  }
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
  const data = await fetchData(url);
  return (
    data.data.map(mapReviewData).find((review) => review.slug === slug) || null
  );
}

export async function getReviews(
  pageSize: number,
  page: number
): Promise<GetReviews[]> {
  const url = `${API_BASE_URL}&page=${page}&limit=${pageSize}`;
  const data = await fetchData(url);
  return data.data.map(mapGetReviewData);
}

export async function getSlugs(): Promise<string[]> {
  const url = `${API_BASE_URL}&page=1&limit=${PAGE_LIMIT}`;
  const data = await fetchData(url);
  return data.data.map((item) => generateSlug(item.title));
}

export async function getSearchableReviews(): Promise<SearchableReview[]> {
  const url = `${API_BASE_URL}&page=1&limit=${PAGE_LIMIT}`;
  const data = await fetchData(url);
  return data.data.map((item) => ({
    title: item.title,
    slug: generateSlug(item.title),
  }));
}
