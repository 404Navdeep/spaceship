import Link from "next/link";
import React from "react";
import { allWritings } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { HoloCard } from "../components/holo-card";

export default function WritingsPage() {
	const writings = allWritings
		.filter((writing) => writing.published)
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
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Writings
					</h2>
					<p className="mt-4 text-zinc-400">
						Personal essays, reflections, and creative pieces.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
					{writings.map((writing) => (
						<HoloCard
							key={writing.slug}
							href={`/writings/${writing.slug}`}
							coverImage={writing.coverImage}
							title={writing.title}
							wordCount={writing.wordCount}
							readingTime={writing.readingTime}
						/>
					))}
				</div>

				{writings.length === 0 && (
					<div className="py-12 text-center">
						<p className="text-zinc-400">No writings yet. Check back soon!</p>
					</div>
				)}
			</div>
		</div>
	);
}
