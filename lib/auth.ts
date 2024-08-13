import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);




export async function decodeEmail() {
  try {
    const cookie = cookies().get("jwt")?.value;
    if (!cookie) {
      return null;
    }

    const { payload } = await jwtVerify(cookie, SECRET);
    console.log("payload", payload)
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}


export default async function setCookies(user:any) {
    const jwt = await new SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(SECRET);

    cookies().set("jwt", jwt,{httpOnly:true});
    console.log("formData", user);
}
