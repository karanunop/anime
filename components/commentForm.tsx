
import { createComments } from "@/lib/comment";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { useState, useEffect } from "react";


export default function CommentForm({ slug, title, userName }: any) {

  async function action(formData: FormData) {
    "use server";


    const comment = await createComments({
      slug,
      name: formData.get("user") as string,
      comment: formData.get("message") as string,
    });
    revalidatePath(`/reviews/${slug}`);
  }

  return (
    <div>
      
        <form
          action={action}
          className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded max-w-screen-sm"
        >
          <p className="pb-1">
            Already played <strong>{title}</strong>? Have your say!
          </p>
          <div className="flex">
            <label htmlFor="userField" className="shrink-0 w-32">
              Your name
            </label>
          <span>{userName}</span>
          </div>
          <div className="flex">
            <label htmlFor="messageField" className="shrink-0 w-32">
              Your comment
            </label>
            <textarea
              id="messageField"
              name="message"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-800 rounded px-2 py-1 self-center
                       text-slate-50 w-32 hover:bg-orange-700"
          >
            Submit
          </button>
        </form>
      
    </div>
  );
}
