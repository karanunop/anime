import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReview } from "@/lib/review";
import Share from "@/components/Share";
import CommentForm from "@/components/commentForm";
import CommentList from "@/components/Comment";
import { Suspense } from "react";
import { decodeEmail } from "@/lib/auth";

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export const metadata: Metadata = {
  title: "Reviews",
};

// Component for rendering the review page
export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  try {
    const review = await getReview(slug);

    if (!review) {
      notFound();
      return null;
    }

    const token = await decodeEmail();

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
            <a className="text-blue-600" href="/sign-in">
              Sign
            </a>{" "}
            in to comment
          </p>
        )}
        <Suspense fallback={<p>Loading...</p>}>
          <CommentList slug={slug} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error fetching review:", error);
    notFound();
    return null;
  }
}
