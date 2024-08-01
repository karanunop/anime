import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReview, getSlugs } from "@/lib/review";
import Share from "@/components/Share";
import CommentForm from "@/components/commentForm";
import CommentList from "@/components/Comment";

interface Review {
  title: string;
  image_url: string;
  body: string;
}

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}
const dynamic = "force-dynamic";

// Function to generate static parameters for static site generation
// export async function generateStaticParams(): Promise<ReviewPageParams[]> {
//   const slugs = await getSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

// // Function to generate metadata for each review page
// export async function generateMetadata({
//   params: { slug },
// }: ReviewPageProps): Promise<Metadata> {
//   const review: Review | null = await getReview(slug);
//   if (!review) {
//     notFound();
//   }
//   return {
//     title: review.title,
//   };
// }

// Component for rendering the review page
export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  console.log("[ReviewPage] rendering", slug);
  const review: Review | null = await getReview(slug);

  if (!review) {
    notFound();
    return null; // Ensure we return null after notFound
  }

  return (
    <>
      <h1>{review.title}</h1>
      <p className="font-semibold pb-3">{review.title}</p>
      <div className="flex gap-3 items-baseline">
        <Share />
      </div>
      <Image
        src={review.image_url}
        alt={review.title}
        priority
        width={640}
        height={360}
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
      
        <CommentForm title={review.title} slug={slug} />
        <CommentList slug={slug} />
      
    </>
  );
}
