import Link from "next/link";

export default function NavBar() {
  return (
    <header className="w-full bg-white shadow">
      <nav className="flex justify-center items-center h-16">
        <ul className="flex gap-4 text-2xl">
          <li>
            <Link href="/" className="text-orange-800 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/reviews" className="text-orange-800 hover:underline">
              Reviews
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              prefetch={false}
              className="text-orange-800 hover:underline"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
