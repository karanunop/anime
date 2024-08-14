import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReview } from "@/lib/review";
import Share from "@/components/Share";
import CommentForm from "@/components/commentForm";
import CommentList from "@/components/Comment";
import { Suspense } from "react";
import { decodeEmail } from "@/lib/auth";

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



export const metadata: Metadata = {
  title: "Reviews",
};


// Component for rendering the review page
export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const token = await decodeEmail()
  console.log("token", token)
  const review: Review | null = await getReview(slug);

  if (!review) {
    notFound();
    return null; // Ensure we return null after notFound
  }

  return (
    <>
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
      {token ? (
        <CommentForm title={review.title} slug={slug} userName={token.name} />
      ) : (
        <p className="text-red-500 italic text-lg">
          
          <a className="text-blue-600" href="/sign-in">sign</a> in to comment
        </p>
      )}

      <Suspense fallback={<p>loading....</p>}>
        <CommentList slug={slug} />
      </Suspense>
    </>
  );
}
