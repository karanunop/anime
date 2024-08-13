"use server";
import setCookies from "@/lib/auth";
import { checkUser } from "@/lib/user";


export default async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      return { error: "Both email and password are required." };
    }

    if (!isValidEmail(email)) {
      return { error: "Please enter a valid email address." };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long." };
    }

    const user = await checkUser({ email, password });

    if (user) {
      await setCookies(user);
      return { success: true }; // Indicate success
    } else {
      return { error: "Invalid email or password." };
    }
  } catch (error: any) {
    console.error("Sign-in action error:", error.message);
    return { error: `An error occurred during sign-in: ${error.message}` };
  }
}


// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
