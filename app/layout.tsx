
import Share from "@/components/Share";
import "./globals.css";
import NavBar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-green-300 {`${inter.variable} ${roboto_mono.variable}`}"
    >
      <body className="px-4 py-6 flex flex-col min-h-screen">
        <header>
          <NavBar />
          <Share />
        </header>
        <main className="grow py-5">{children}</main>
        <footer className="text-xs border-t mt-5 py-3 text-center">
          content is courtesy of <a href="google.com"> Google</a>
        </footer>
      </body>
    </html>
  );
}