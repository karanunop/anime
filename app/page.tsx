import { getReviews } from "@/lib/review";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const reviews = await getReviews('3',1);

  if (!reviews) {
    return <div>No featured review found</div>;
  }

  return (
    <>
      <h1 className="font-bold">Best Anime</h1>
      <p className="o-oo">Only the best anime, reviewed for you.</p>
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
};

export default Home;
