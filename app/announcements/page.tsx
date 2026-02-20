import Link from "next/link";
import React from "react";
import { allAnnouncements } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

export default function AnnouncementsPage() {
	const announcements = allAnnouncements
		.filter((announcement) => announcement.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative pb-16 bg-black min-h-screen">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
								Announcements
							</h2>
							<p className="mt-4 text-zinc-400">
								Latest updates and announcements.
							</p>
						</div>
						<Link
							href="/api/announcements-rss"
							className="text-zinc-500 hover:text-zinc-300 transition-colors"
							title="Subscribe to RSS feed"
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 6.925 13.075 3 8 3 5.003 3 5 3 5 3z"></path>
								<path d="M4 9a1 1 0 000 2c3.314 0 6 2.686 6 6a1 1 0 102 0c0-4.418-3.582-8-8-8z"></path>
								<circle cx="5" cy="15" r="1"></circle>
							</svg>
						</Link>
					</div>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="space-y-4">
					{announcements.map((announcement) => (
						<Card key={announcement.slug}>
							<Link href={`/announcements/${announcement.slug}`}>
								<article className="relative w-full p-4 md:p-8">
									<div className="flex items-center justify-between gap-2 mb-4">
										<h2 className="text-lg font-bold text-zinc-100">
											{announcement.title}
										</h2>
										<div className="text-xs text-zinc-400 whitespace-nowrap">
											{announcement.date ? (
												<time dateTime={new Date(announcement.date).toISOString()}>
													{Intl.DateTimeFormat(undefined, {
														dateStyle: "short",
													}).format(new Date(announcement.date))}
												</time>
											) : (
												<span>SOON</span>
											)}
										</div>
									</div>
									<p className="text-zinc-400">
										{announcement.description}
									</p>
								</article>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
