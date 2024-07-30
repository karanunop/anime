import { GetServerSidePropsContext } from "next";
import { getComments } from "@/lib/comment";
import { UserCircleIcon } from "@heroicons/react/20/solid";

interface Comment {
  id: string;
  name: string;
  comment: string;
}

interface AllCommentsProps {
  comments: Comment[];
}

export default function AllComments({ comments }: AllCommentsProps) {
  if (!comments || comments.length === 0) {
    return <p className="italic mt-3">No comments yet.</p>;
  }

  return (
    <ul className="border mt-3 rounded">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            {comment.name}
          </div>
          <p className="italic">{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
}

// Server-side rendering function
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params!;
  const comments = await getComments(slug as string);

  return {
    props: {
      comments: comments || [], // Ensure comments is an array
    },
  };
}
