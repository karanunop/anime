
import AllComments from "@/components/Comment";
import CommentForm from "@/components/commentForm";
import { getReview } from "@/lib/review";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic"

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

interface Review {
  title: string;
  image_url: string;
  body: string;
}

interface ReviewPageParams {
  slug: string;
}

// export function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string };
// }): { title: string } {
//   return {
//     title: slug,
//   };
// }


export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);

  if (!review) {
    notFound(); // This will throw and prevent further code execution
  }

  return (
    <>
      <h1 className="font-bold">{review.title}</h1>
      <Image
        priority
        src={review.image_url}
        alt={review.title}
        height="360"
        width="640"
      />
      <article
        className="pt-3 max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: review.body }}
      />
      <section className="border-dashed border-t mt-4 p-4 bg-green-50 rounded-md shadow-lg max-w-screen-sm">
        <h2 className="font-bold text-xl flex items-center gap-2 mb-4 text-green-700">
          <ChatBubbleBottomCenterIcon className="h-5 w-5 text-green-700" />
          Comments
        </h2>
        <CommentForm title={review.title} slug={slug} />
        <AllComments slug={slug} />
      </section>
    </>
  );
}

