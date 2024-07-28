import Headings from "@/components/Headings";
import Link from "next/link";
import { getReviews, getSearchableReviews } from "@/lib/review";
import Image from "next/image";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

export const revalidate = 3600;

function checkPage(page: string): number {
  return page ? parseInt(page) : 1;
}

interface reviewsProps {
  searchParams: { page: string };
}

export default async function Reviews({
  searchParams: { page },
}: reviewsProps) {
  const currentPage = checkPage(page);
  const reviews = await getReviews("8", currentPage);
  const searchable = await getSearchableReviews()
  return (
    <>
      <Pagination currentPage={currentPage} />
      <Search reviews={ searchable} />
      <Headings>Reviews</Headings>
      <ul className="py-4 flex flex-row flex-wrap gap-3">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.mal_id}
              className="bg-white px-4 py-3 border rounded shadow w-80 hover:shadow-xl"
            >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  src={review.image_url}
                  alt={review.title}
                  width="320"
                  height="180"
                />
                <h1 className="text-center font-mono">{review.title}</h1>
              </Link>
            </li>
          ))
        ) : (
          <li>No reviews found.</li>
        )}
      </ul>
    </>
  );
}
