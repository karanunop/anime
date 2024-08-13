"use server";

import setCookies from "@/lib/auth";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validation
  if (!name || !email || !password) {
    return { error: "Name, email, and password are all required." };
  }

  if (!isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  console.log("formData", { name, email, password });

  const user = await createUser({ name, email, password });
  setCookies(user)
  redirect("/")
  return { success: true };
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
