import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export interface Review {
  title: string;
  date: string;
  image: string;
body: any;
    slug: string;
}


export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const slugs = await getSlugs();
    const reviews = []
    for (const slug of slugs) {
        const review = await getReview(slug)
        reviews.push(review)

    }
  const recent = reviews.sort(function (a, b) {
    var c:any = new Date(a.date);
    var d:any = new Date(b.date);
    return c - d;
  });
  return recent;
  
  
}


export async function getSlugs() {
  const dir = await readdir(`./content/reviews`);
  const filter = dir.filter((file) => file.endsWith(".md"));
  const slugs = filter.map((file) => file.replace(/\.md/, ""));
  return slugs
}

export async function getFeaturedReview() {
  const latest = await getReviews()
  const featured = latest.length - 1
  return latest[featured]

}
