import { prisma } from "./db";
import bcrypt from "bcrypt";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

interface CheckUserProps {
  email: string;
  password: string;
}

export async function createUser({ name, email, password }: CreateUserProps) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.sign.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}

// Function to check sign (user) credentials
export async function checkUser({ email, password }: CheckUserProps) {
  try {
    const user = await prisma.sign.findUnique({
      where: { email },
      select: { id: true, password: true }, // Only select necessary fields
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error checking user:", error);
    throw new Error("An error occurred while checking the user");
  }
}


