"use server";

import {createComments} from "@/lib/comment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  if (!formData.get("name") || !formData.get("comment")) {
    return { isError: true, error: "All fields are required." };
  }

  const data = {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string,
    comment: formData.get("comment") as string,
  };
      const comment = await createComments(data);
      revalidatePath(`/reviews/${data.slug}`);
    redirect(`/reviews/${data.slug}`);
 
}
