import { notFound } from "next/navigation";
import { allWritings } from "contentlayer/generated";
import { Navigation } from "../../components/nav-blog";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allWritings
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function WritingDetailPage({ params }: Props) {
	const slug = params?.slug;
	const writing = allWritings.find((w) => w.slug === slug);

	if (!writing) {
		notFound();
	}

	return (
		<div className="bg-black min-h-screen">
			<Navigation />

			<div className="px-6 pt-20 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				{/* Cover Image */}
				{writing.coverImage && (
					<div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
						<Image
							src={writing.coverImage}
							alt={writing.title}
							fill
							className="object-cover"
						/>
					</div>
				)}

				{/* Title & Metadata */}
				<div className="space-y-4">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl font-display">
						{writing.title}
					</h1>
					<p className="text-lg leading-8 text-zinc-400">
						{writing.description}
					</p>

					{/* Date & Stats */}
					<div className="flex flex-col gap-2 text-sm text-zinc-500">
						{writing.date && (
							<time dateTime={new Date(writing.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
									new Date(writing.date),
								)}
							</time>
						)}
						<div className="flex gap-4">
							{writing.wordCount && (
								<span>~{writing.wordCount.toLocaleString()} words</span>
							)}
							{writing.readingTime && (
								<span>~{writing.readingTime} min read</span>
							)}
						</div>
					</div>
				</div>

				<div className="w-full h-px bg-zinc-800" />

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-4">
					<Link
						href={`/writings/${slug}/read`}
						className="px-6 py-3 bg-zinc-100 text-black rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
					>
						Read on Site
					</Link>

					{writing.pdfUrl && (
						<a
							href={writing.pdfUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 py-3 border border-zinc-400 text-zinc-100 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
						>
							Free PDF
						</a>
					)}

					{writing.amazonUrl && (
						<a
							href={writing.amazonUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 py-3 border border-zinc-400 text-zinc-100 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
						>
							Buy Physical
						</a>
					)}
				</div>

				<div className="w-full h-px bg-zinc-800" />
			</div>
		</div>
	);
}
