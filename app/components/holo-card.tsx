"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface HoloCardProps {
	href: string;
	coverImage?: string;
	title: string;
	wordCount?: number;
	readingTime?: number;
}

export const HoloCard: React.FC<HoloCardProps> = ({
	href,
	coverImage,
	title,
	wordCount,
	readingTime,
}) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	// 3D tilt
	const rotateX = useTransform(
		mouseY,
		[0, 300],
		[5, -5]
	);
	const rotateY = useTransform(
		mouseX,
		[0, 300],
		[-5, 5]
	);

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	function onMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	// Rainbow iridescent gradient (position shifts with mouse)
	const glareX = useMotionTemplate`${mouseX}px`;
	const glareY = useMotionTemplate`${mouseY}px`;

	return (
		<Link href={href}>
			<motion.div
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				style={{
					rotateX,
					rotateY,
					transformStyle: "preserve-3d",
				}}
				className="relative h-full overflow-hidden rounded-xl border border-zinc-600 bg-zinc-900/50 hover:border-zinc-400/50 transition-colors duration-300 cursor-pointer group"
			>
				{/* Cover Image */}
				{coverImage ? (
					<div className="relative w-full h-48 overflow-hidden bg-zinc-800">
						<Image
							src={coverImage}
							alt={title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
				) : (
					<div className="w-full h-48 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
						<span className="text-zinc-400 text-sm">No cover image</span>
					</div>
				)}

				{/* Content */}
				<div className="p-6">
					<h3 className="text-xl font-bold text-zinc-100 mb-4 font-display line-clamp-2">
						{title}
					</h3>

					{/* Word Count & Reading Time */}
					<div className="flex gap-4 text-sm text-zinc-400">
						{wordCount && (
							<span>~{wordCount.toLocaleString()} words</span>
						)}
						{readingTime && (
							<span>~{readingTime} min read</span>
						)}
					</div>
				</div>

				{/* Holographic overlay layers */}
				<div className="pointer-events-none absolute inset-0">
					{/* Iridescent rainbow gradient overlay */}
					<motion.div
						className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
						style={{
							background: `conic-gradient(
								from 0deg at ${glareX} ${glareY},
								#ff00ff,
								#00ffff,
								#ffff00,
								#ff00ff
							)`,
							mixBlendMode: "color-dodge",
						}}
					/>

					{/* Glare/shine effect */}
					<motion.div
						className="absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
						style={{
							background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent)",
							left: mouseX,
							top: mouseY,
							transform: "translate(-50%, -50%)",
							mixBlendMode: "screen",
							pointerEvents: "none",
						}}
					/>

					{/* Thin highlight border that glows on hover */}
					<div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 transition-all duration-300" />
				</div>
			</motion.div>
		</Link>
	);
};
