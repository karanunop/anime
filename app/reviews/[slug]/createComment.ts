"use server";

import { decodeEmail } from "@/lib/auth";
import {createComments} from "@/lib/comment";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const user = await decodeEmail();
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!formData.get("name") || !formData.get("comment")) {
    return { isError: true, error: "All fields are required." };
  }


  const data = {
    slug: formData.get("slug") as string,
    name: formData.get("name") as string ,
    comment: formData.get("comment") as string,
  };
      const comment = await createComments(data);
      revalidatePath(`/reviews/${data.slug}`);
    redirect(`/reviews/${data.slug}`);
 
}
