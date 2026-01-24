import { notFound } from "next/navigation";
import { allAnnouncements } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "../../components/nav-blog";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allAnnouncements
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function AnnouncementPage({ params }: Props) {
	const slug = params?.slug;
	const announcement = allAnnouncements.find((announcement) => announcement.slug === slug);

	if (!announcement) {
		notFound();
	}

	return (
		<div className="bg-black min-h-screen">
			<Navigation />

			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl font-display">
						{announcement.title}
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-400">
						{announcement.description}
					</p>
					{announcement.date && (
						<time
							dateTime={new Date(announcement.date).toISOString()}
							className="mt-4 text-sm text-zinc-500 block"
						>
							{Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
								new Date(announcement.date),
							)}
						</time>
					)}
				</div>

				<div className="w-full h-px bg-zinc-800" />

				<div className="max-w-3xl mx-auto">
					<article className="prose prose-zinc prose-invert prose-quoteless">
						<Mdx code={announcement.body.code} />
					</article>
				</div>
			</div>
		</div>
	);
}
