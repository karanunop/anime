import { getReview, getSlugs } from "@/lib/review";
import Image from "next/image";


export function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): { title: string } {
  console.log("params", slug);
  return {
    title: slug,
  };
}


// Define the type for the props
interface ReviewPageProps {
  params: {
    slug: string;
  };
}

// Define the type for the review
interface Review {
  title: string;
  date: string;
  image: string;
  body: string;
}

interface ReviewPageParams {
  slug: string;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review: Review = await getReview(slug);

  return (
    <>
      <h1 className="font-bold">{review.title}</h1>
      <h2 className="mb-3">{review.date}</h2>
      <Image src={review.image} alt="" height="360" width="640" />
      <article
        className="pt-3 max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: review.body }}
      />
    </>
  );
}
