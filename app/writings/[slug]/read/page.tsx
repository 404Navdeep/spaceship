import { notFound } from "next/navigation";
import { allWritings } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "../../../components/nav-blog";
import Link from "next/link";

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

export default async function WritingReadPage({ params }: Props) {
	const slug = params?.slug;
	const writing = allWritings.find((w) => w.slug === slug);

	if (!writing) {
		notFound();
	}

	return (
		<div className="bg-black min-h-screen">
			<Navigation />

			<div className="px-6 pt-20 mx-auto space-y-8 max-w-4xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				{/* Header */}
				<div className="max-w-2xl">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl font-display">
						{writing.title}
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-400">
						{writing.description}
					</p>
					{writing.date && (
						<time
							dateTime={new Date(writing.date).toISOString()}
							className="mt-4 text-sm text-zinc-500 block"
						>
							{Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
								new Date(writing.date),
							)}
						</time>
					)}
				</div>

				<div className="w-full h-px bg-zinc-800" />

				{/* Content */}
				<div className="max-w-3xl">
					<article className="prose prose-zinc prose-invert prose-quoteless">
						<Mdx code={writing.body.code} />
					</article>
				</div>

				<div className="w-full h-px bg-zinc-800" />

				{/* Back link */}
				<div className="pb-16">
					<Link
						href={`/writings/${slug}`}
						className="text-zinc-400 hover:text-zinc-100 transition-colors"
					>
						← Back to writing details
					</Link>
				</div>
			</div>
		</div>
	);
}
