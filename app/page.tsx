import Headings from "@/components/Headings"

import { getFeaturedReview } from "@/lib/review";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const review = await getFeaturedReview()
  
  return (
    <>
    
      <Headings>Best Anime</Headings>
      <p className="pb-3">
        Only the best anime, reviewed for you.
      </p>
      <div className="bg-white border rounded shadow w-80
                      hover:shadow-xl sm:w-full">
        <Link href={`/reviews/${review.slug}`}
          className="flex flex-col sm:flex-row">
          <Image src={review.image} alt=""
            width="320" height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
            {review.title}
          </h2>
        </Link>
      </div>
    </>
  );
      
}