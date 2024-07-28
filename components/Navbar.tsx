
import Navlink from "./Navlink";

export default function NavBar() {
  return (
    <header className="w-full bg-white shadow">
      <nav className="flex justify-center items-center h-16">
        <ul className="flex gap-4 text-2xl">
          <li>
            <Navlink href="/" prefetch={true}>Home</Navlink>
          </li>
          <li>
            <Navlink href="/reviews" prefetch={true}>Reviews</Navlink>
          </li>
          <li>
            <Navlink href="/about" prefetch={false}>About</Navlink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
