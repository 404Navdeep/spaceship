"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

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
	const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
	const cardRef = useRef<HTMLDivElement>(null);

	function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		setMousePosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
	}

	function onMouseLeave() {
		setMousePosition({ x: 0.5, y: 0.5 });
	}

	// Calculate rotation based on mouse position (inverted for natural feel)
	const rotateX = (mousePosition.y - 0.5) * -8;
	const rotateY = (mousePosition.x - 0.5) * 8;

	// Calculate shadow offset
	const shadowY = (mousePosition.y - 0.5) * 20;
	const shadowBlur = 20 + Math.abs(mousePosition.y - 0.5) * 40;

	return (
		<Link href={href}>
			<div
				ref={cardRef}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				className="relative h-full overflow-hidden rounded-xl border border-zinc-600/50 bg-zinc-900/30 backdrop-blur-sm cursor-pointer group transition-all duration-300"
				style={{
					"--mouse-x": `${mousePosition.x}`,
					"--mouse-y": `${mousePosition.y}`,
					"--rotate-x": `${rotateX}deg`,
					"--rotate-y": `${rotateY}deg`,
					"--shadow-y": `${5 + shadowY}px`,
					"--shadow-blur": `${shadowBlur}px`,
					perspective: "1000px",
					transform: `perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))`,
					boxShadow: `0 var(--shadow-y) var(--shadow-blur) rgba(59, 130, 246, 0.15), 
						inset 0 0 20px rgba(255, 255, 255, 0.05)`,
				} as React.CSSProperties & Record<string, any>}
			>
				{/* Animated background pattern */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='20' viewBox='0 0 16 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M8 0v20L0 10M16 0v10L8 0M16 10v10H8'/%3E%3C/g%3E%3C/svg%3E")`,
				}} />

				{/* Cover Image with enhanced styling */}
				{coverImage ? (
					<div className="relative w-full h-48 overflow-hidden bg-zinc-800">
						<Image
							src={coverImage}
							alt={title}
							fill
							className="object-cover group-hover:scale-110 transition-transform duration-500"
							style={{ transformStyle: "preserve-3d" }}
						/>
						{/* Gradient overlay that intensifies on hover */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/60 group-hover:to-zinc-900/80 transition-all duration-300" />
					</div>
				) : (
					<div className="w-full h-48 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
						<span className="text-zinc-400 text-sm">No cover image</span>
					</div>
				)}

				{/* Content */}
				<div className="p-6" style={{ transformStyle: "preserve-3d" }}>
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

				{/* Premium holographic effects */}
				<div className="pointer-events-none absolute inset-0">
					{/* Multi-layered iridescent gradient */}
					<div
						className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
						style={{
							background: `conic-gradient(
								from ${mousePosition.x * 360}deg at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
								rgba(255, 0, 255, 0.3),
								rgba(0, 255, 255, 0.2),
								rgba(255, 255, 0, 0.2),
								rgba(255, 0, 255, 0.3)
							)`,
							mixBlendMode: "color-dodge",
							filter: "blur(20px)",
						}}
					/>

					{/* Bright glare/shine effect */}
					<div
						className="absolute opacity-0 group-hover:opacity-40 transition-opacity duration-300"
						style={{
							width: "200px",
							height: "200px",
							borderRadius: "50%",
							background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2), transparent)",
							left: `${mousePosition.x * 100}%`,
							top: `${mousePosition.y * 100}%`,
							transform: "translate(-50%, -50%)",
							mixBlendMode: "screen",
							filter: "blur(30px)",
						}}
					/>

					{/* Enhanced border glow */}
					<div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/30 transition-all duration-300" 
						style={{
							boxShadow: `inset 0 0 20px rgba(255, 255, 255, 0.1)`,
						}}
					/>

					{/* Ambient light rays */}
					<div
						className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
						style={{
							background: `linear-gradient(
								${mousePosition.x * 180}deg,
								rgba(59, 130, 246, 0.3) 0%,
								transparent 50%,
								rgba(139, 92, 246, 0.2) 100%
							)`,
							mixBlendMode: "overlay",
						}}
					/>
				</div>

				{/* Depth card effect - inner shadow */}
				<div className="absolute inset-0 rounded-xl shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					style={{
						boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.3)`,
					}}
				/>
			</div>
		</Link>
	);
};
