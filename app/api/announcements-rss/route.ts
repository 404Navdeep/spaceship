import { allAnnouncements } from "contentlayer/generated";

export async function GET() {
	const announcements = allAnnouncements
		.filter((announcement) => announcement.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	const baseUrl = "https://navdeep.online";
	const rssItems = announcements
		.map(
			(announcement) =>
				`<item>
        <title>${escapeXml(announcement.title)}</title>
        <link>${baseUrl}/announcements/${announcement.slug}</link>
        <guid>${baseUrl}/announcements/${announcement.slug}</guid>
        <description>${escapeXml(announcement.description)}</description>
        <pubDate>${new Date(announcement.date).toUTCString()}</pubDate>
      </item>`,
		)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Navdeep - Announcements</title>
    <link>${baseUrl}</link>
    <description>Latest updates and announcements.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/api/announcements-rss" rel="self" type="application/rss+xml" />
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
