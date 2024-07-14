import Headings from "@/components/Headings";
import Link from "next/link";
import Image from "next/image";
import { getReviews } from "@/lib/review";




export default async function Reviews() {
  const reviews = await getReviews()
  return (
    <>
      <Headings>Reviews</Headings>
      <ul className="py-4 flex flex-row flex-wrap  gap-3">
        {reviews.map((review) => (
          <li key={review.slug} className="bg-white px-4 py-3 border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image src={review.image} alt="" width="320" height="180"></Image>
              <h1 className="text-center font-mono">{review.title}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
