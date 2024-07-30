import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getReview, getSlugs } from "@/lib/review";
import Share from "@/components/Share";

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  // console.log('[ReviewPage] generateStaticParams:', slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  console.log("[ReviewPage] rendering", slug);
  const review = await getReview(slug);
  if (!review) {
    notFound();
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
        alt=""
        priority
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
