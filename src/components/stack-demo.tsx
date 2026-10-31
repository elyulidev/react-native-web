import React, { useEffect, useRef, useState } from "react";
import type { StackDemoData } from "../types/types";

/* Palette applied per-screen in data order, mirroring the header tint of the cards. */
const SCREEN_COLORS = ["#6366f1", "#f97316", "#10b981", "#eab308", "#ec4899"];

const MAX_DEPTH = 5;
const ANIMATION_MS = 340;
const STEP_PX = 12;
const SCALE_FACTOR = 0.04;
const RESET_STAGGER_MS = 70;

interface StackCard {
	id: string;
	uid: number;
}

interface ExitingCard {
	key: number;
	screenId: string;
	delay: number;
}

/**
 * Interactive simulation of a Stack Navigator: push places a new screen card
 * on top of the pile, back removes the visible one and replace swaps it.
 * Reset dismisses every screen above the root with a staggered fly-out.
 */
export const StackDemo: React.FC<{ data: StackDemoData }> = ({ data }) => {
	const rootId = data.screens[0]?.id ?? "";
	const nextUid = useRef(1);
	const [stack, setStack] = useState<StackCard[]>(
		rootId ? [{ id: rootId, uid: 0 }] : []
	);
	const [mode, setMode] = useState<"push" | "replace">("push");
	const [exiting, setExiting] = useState<ExitingCard[]>([]);

	useEffect(() => {
		if (exiting.length === 0) return;
		const timers = exiting.map((exit) =>
			window.setTimeout(
				() =>
					setExiting((prev) => prev.filter((e) => e.key !== exit.key)),
				ANIMATION_MS + exit.delay
			)
		);
		return () => timers.forEach((t) => window.clearTimeout(t));
	}, [exiting]);

	const topId = stack[stack.length - 1]?.id;
	const canPush = stack.length < MAX_DEPTH;

	const pushCard = (screenId: string) =>
		setStack((prev) => [...prev, { id: screenId, uid: nextUid.current++ }]);

	const handleScreen = (screenId: string) => {
		if (screenId === topId) return;
		if (mode === "replace") {
			const replaced = stack[stack.length - 1];
			if (!replaced) return;
			setStack((prev) => [...prev.slice(0, -1), { id: screenId, uid: nextUid.current++ }]);
			setExiting((prev) => [
				...prev,
				{ key: replaced.uid, screenId: replaced.id, delay: 0 },
			]);
		} else if (canPush) {
			pushCard(screenId);
		}
	};

	const handleBack = () => {
		if (stack.length <= 1) return;
		const top = stack[stack.length - 1];
		setStack((prev) => prev.slice(0, -1));
		setExiting((prev) => [
			...prev,
			{ key: top.uid, screenId: top.id, delay: 0 },
		]);
	};

	const handleReset = () => {
		if (stack.length <= 1) return;
		const [root, ...removed] = stack;
		setStack(root ? [root] : []);
		setExiting((prev) => [
			...prev,
			// Bottom-most removed card flies out first, then the ones above it.
			...removed.map((card, index) => ({
				key: card.uid,
				screenId: card.id,
				delay: index * RESET_STAGGER_MS,
			})),
		]);
	};

	return (
		<div className='my-10'>
			<style>{`
				@keyframes stackdemo-in {
					from { transform: translate3d(90%, 30%, 0) scale(0.5) rotate(5deg); opacity: 0.2; }
					to { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); opacity: 1; }
				}
				@keyframes stackdemo-out {
					from { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
					to { transform: translate3d(110%, 12%, 0) rotate(7deg); opacity: 0; }
				}
				@media (prefers-reduced-motion: reduce) {
					.stackdemo-anim { animation-duration: 0.01ms !important; }
				}
			`}</style>

			<div
				className='relative mx-auto w-full max-w-lg'
				style={{ height: 232 }}
			>
				{stack.map((card, index) => {
					const screen = data.screens.find((s) => s.id === card.id);
					if (!screen) return null;
					const depth = stack.length - 1 - index; // 0 = top card
					const screenIndex = data.screens.findIndex(
						(s) => s.id === card.id
					);
					const color =
						SCREEN_COLORS[screenIndex % SCREEN_COLORS.length] ??
						"#64748b";
					return (
						<div
							key={card.uid}
							className='absolute inset-x-0 mx-auto w-[82%] max-w-sm'
							style={{
								top: 36,
								zIndex: 30 - depth,
								opacity: 1 - depth * 0.05,
								transform: `translateY(${-depth * STEP_PX}px) scale(${1 - depth * SCALE_FACTOR})`,
								transition: `transform ${ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_MS}ms ease`,
							}}
						>
							<div
								className='stackdemo-anim overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700'
								style={{
									animation: `stackdemo-in ${ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
								}}
							>
								<div
									className='flex h-9 items-center justify-between px-4'
									style={{ backgroundColor: color }}
								>
									<span className='text-sm font-semibold text-white'>
										{screen.name}
									</span>
									<span className='font-mono text-[11px] text-white/70'>
										{screen.route}
									</span>
								</div>
								<div className='flex h-24 items-center justify-center bg-white dark:bg-slate-900'>
									<span className='font-mono text-base text-slate-600 dark:text-slate-300'>
										{screen.route}
									</span>
								</div>
							</div>
						</div>
					);
				})}

				{exiting.map((exit) => {
					const screen = data.screens.find(
						(s) => s.id === exit.screenId
					);
					if (!screen) return null;
					const screenIndex = data.screens.findIndex(
						(s) => s.id === exit.screenId
					);
					const color =
						SCREEN_COLORS[screenIndex % SCREEN_COLORS.length] ??
						"#64748b";
					return (
						<div
							key={exit.key}
							className='absolute inset-x-0 mx-auto w-[82%] max-w-sm'
							style={{ top: 36, zIndex: 40 }}
						>
							<div
								className='stackdemo-anim overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700'
								style={{
									animation: `stackdemo-out ${ANIMATION_MS}ms ease-in both`,
									animationDelay: `${exit.delay}ms`,
								}}
							>
								<div
									className='flex h-9 items-center justify-between px-4'
									style={{ backgroundColor: color }}
								>
									<span className='text-sm font-semibold text-white'>
										{screen.name}
									</span>
									<span className='font-mono text-[11px] text-white/70'>
										{screen.route}
									</span>
								</div>
								<div className='flex h-24 items-center justify-center bg-white dark:bg-slate-900'>
									<span className='font-mono text-base text-slate-600 dark:text-slate-300'>
										{screen.route}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<p className='mt-3 text-center text-sm leading-6 text-slate-600 dark:text-slate-300'>
				{data.caption}
			</p>

			<div className='mt-5 flex flex-wrap items-center justify-center gap-2'>
				<div className='flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700'>
					<button
						type='button'
						aria-pressed={mode === "push"}
						onClick={() => setMode("push")}
						className={`px-3 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${mode === "push" ? "bg-primary-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"}`}
					>
						push
					</button>
					<button
						type='button'
						aria-pressed={mode === "replace"}
						onClick={() => setMode("replace")}
						className={`px-3 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${mode === "replace" ? "bg-primary-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"}`}
					>
						replace
					</button>
				</div>
				<button
					type='button'
					onClick={handleBack}
					disabled={stack.length <= 1}
					className='cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 disabled:dark:hover:bg-slate-900'
				>
					{data.backLabel}
				</button>
				<button
					type='button'
					onClick={handleReset}
					disabled={stack.length <= 1}
					className='cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 disabled:dark:hover:bg-slate-900'
				>
					{data.resetLabel}
				</button>
			</div>

			<div className='mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3'>
				{data.screens.map((screen) => {
					const isTop = screen.id === topId;
					const disabled = isTop || (mode === "push" && !canPush);
					return (
						<button
							key={screen.id}
							type='button'
							onClick={() => handleScreen(screen.id)}
							disabled={disabled}
							aria-label={`${mode} ${screen.route}`}
							className={`cursor-pointer rounded-xl border px-3 py-2 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${disabled ? "cursor-not-allowed border-slate-200 dark:border-slate-800" : "border-slate-200 hover:border-primary-400 hover:bg-primary-50/60 dark:border-slate-700 dark:hover:border-primary-500 dark:hover:bg-primary-950/40"}`}
						>
							<span
								className={`block text-xs font-semibold ${isTop ? "text-primary-600 dark:text-primary-400" : "text-slate-700 dark:text-slate-200"}`}
							>
								{screen.name}
							</span>
							<span
								className={`block font-mono text-[11px] ${isTop ? "text-primary-600 dark:text-primary-400" : "text-slate-400 dark:text-slate-500"}`}
							>
								{screen.route}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};
