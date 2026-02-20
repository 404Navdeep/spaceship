import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",

	fields: {
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
		},
		url: {
			type: "string",
		},
		repository: {
			type: "string",
		},
	},
	computedFields,
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
	computedFields,
}));

export const Blog = defineDocumentType(() => ({
	name: "Blog",
	filePathPattern: "./blog/**/*.mdx",
	contentType: "mdx",
	fields: {
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
	},
	computedFields,
}));

export const Writing = defineDocumentType(() => ({
	name: "Writing",
	filePathPattern: "./writings/**/*.mdx",
	contentType: "mdx",
	fields: {
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
		coverImage: {
			type: "string",
		},
		amazonUrl: {
			type: "string",
		},
		pdfUrl: {
			type: "string",
		},
	},
	computedFields: {
		...computedFields,
		wordCount: {
			type: "number",
			resolve: (doc) => {
				// Strip MDX syntax and count words
				const text = doc.body.raw
					.replace(/```[\s\S]*?```/g, "") // Remove code blocks
					.replace(/---[\s\S]*?---/g, "") // Remove frontmatter
					.replace(/[*_`~\[\]()#]/g, "") // Remove markdown syntax
					.replace(/\s+/g, " "); // Normalize whitespace
				return text.split(" ").filter((word) => word.length > 0).length;
			},
		},
		readingTime: {
			type: "number",
			resolve: (doc) => {
				// Assume 200 words per minute
				const text = doc.body.raw
					.replace(/```[\s\S]*?```/g, "")
					.replace(/---[\s\S]*?---/g, "")
					.replace(/[*_`~\[\]()#]/g, "")
					.replace(/\s+/g, " ");
				const wordCount = text.split(" ").filter((word) => word.length > 0).length;
				return Math.ceil(wordCount / 200);
			},
		},
	},
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Page, Project, Blog, Writing],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
