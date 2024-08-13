
import { cookies } from "next/headers";
import Navlink from "./Navlink";
import { decodeEmail } from "@/lib/auth";
import SignOut from "./SignOut";

const SECRET = new TextEncoder().encode("secret");


function deleteCookie() {
  cookies().delete("jwt")

}

export default async function NavBar() {
  const userName = await decodeEmail();

  return (
    <header className="w-full bg-white shadow">
      <nav className="flex justify-center items-center h-16">
        <ul className="flex gap-4 text-2xl">
          <li>
            <Navlink href="/" prefetch={true}>
              Home
            </Navlink>
          </li>
          <li>
            <Navlink href="/reviews" prefetch={true}>
              Reviews
            </Navlink>
          </li>
          <li>
            <Navlink href="/about" prefetch={false}>
              About
            </Navlink>
          </li>
          {userName ? (
            <li>
              <SignOut />
            </li>
          ) : (
            <li>
              <Navlink href="/sign-in" prefetch={false}>
                Sign In
              </Navlink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
