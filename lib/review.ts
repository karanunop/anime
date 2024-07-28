import "server-only"

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
export async function getReview(

  slug: string
): Promise<Review | null | undefined> {
  const options = {
    method: "GET",
    url: "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=25",
  };

  try {
    const response = await axios.request<ApiResponse>(options);
    const review = response.data.data
      .map((item) => ({
        title: item.title,
        image_url: item.images.jpg.large_image_url || item.images.jpg.image_url,
        slug: generateSlug(item.title),
        body: item.synopsis,
      }))
      .find((review) => review.slug === slug);
    if (!review) {
      return null;
    }
    return review;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const getReviews = async (
  pageSize: string,
  page: number
): Promise<GetReviews[]> => {
  const options = {
    method: "GET",
    url: `https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=${page}&limit=${pageSize}`,
  };

  try {
    const response = await axios.request<ApiResponse>(options);
    const data =  response.data.data.map((item) => ({
      mal_id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      slug: generateSlug(item.title),
    }));
    return data
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function getSlugs(): Promise<string[]> {
  const options = {
    method: "GET",
    url: "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=25",
  };

  try {
    const response = await axios.request<ApiResponse>(options);
    const reviews = response.data.data.map((item) => ({
      mal_id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      slug: generateSlug(item.title),
      body: item.synopsis,
    }));

    const slugs = reviews.map((review) => review.slug);
    return slugs;
  } catch (error) {
    console.error(error);
    return [];
  }
}



export async function getSearchableReviews() {
  const options = {
    method: "GET",
    url: "https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&page=1&limit=20",
  };

  try {
    const response = await axios.request<ApiResponse>(options);
    const reviews = response.data.data.map((item) => ({
      mal_id: item.mal_id,
      title: item.title,
      image_url: item.images.jpg.image_url,
      slug: generateSlug(item.title),
      body: item.synopsis,
    }));

    return reviews;
  } catch (error) {
    console.error(error);
    return [];
  }
}
