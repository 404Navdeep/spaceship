import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

export default function BlogPage() {
	const blogs = allBlogs
		.filter((blog) => blog.published)
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
								Blog
							</h2>
							<p className="mt-4 text-zinc-400">
								Thoughts, ideas, and things I've learned along the way.
							</p>
						</div>
						<Link
							href="/api/rss"
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

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					{blogs.map((blog) => (
						<Card key={blog.slug}>
							<Link href={`/blog/${blog.slug}`}>
								<article className="relative w-full h-full p-4 md:p-8">
									<div className="flex items-center justify-between gap-2">
										<div className="text-xs text-zinc-100">
											{blog.date ? (
												<time dateTime={new Date(blog.date).toISOString()}>
													{Intl.DateTimeFormat(undefined, {
														dateStyle: "medium",
													}).format(new Date(blog.date))}
												</time>
											) : (
												<span>SOON</span>
											)}
										</div>
									</div>

									<h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
										{blog.title}
									</h2>
									<p className="mt-4 mb-12 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
										{blog.description}
									</p>
									<div className="absolute bottom-4 md:bottom-8">
										<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
											Read more <span aria-hidden="true">&rarr;</span>
										</p>
									</div>
								</article>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
