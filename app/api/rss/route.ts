import { allBlogs } from "contentlayer/generated";

export async function GET() {
	const blogs = allBlogs
		.filter((blog) => blog.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	const baseUrl = "https://navdeep.online";
	const rssItems = blogs
		.map(
			(blog) =>
				`<item>
        <title>${escapeXml(blog.title)}</title>
        <link>${baseUrl}/blog/${blog.slug}</link>
        <guid>${baseUrl}/blog/${blog.slug}</guid>
        <description>${escapeXml(blog.description)}</description>
        <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      </item>`,
		)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Navdeep - Blog</title>
    <link>${baseUrl}</link>
    <description>Thoughts, ideas, and things I've learned along the way.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
		},
	});
}

function escapeXml(unsafe: string): string {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return c;
		}
	});
}
