"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


interface navProps {
  href: string;
  prefetch: boolean;
  children: string;
}

export default function Navlink({ href, prefetch, children }: navProps) {
    const pathname = usePathname();
    if (pathname == href) {
        return <span className="text-orange-800">{children}</span>;
    }
    
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-orange-800 hover:underline"
    >
      {children}
    </Link>
  );
}
