import React, { useState } from "react";
import { CodeBlock } from "./code-block";
import type { CodeFileTab } from "../types/types";

/**
 * Multi-file code viewer: renders one tab per file (like an editor) and shows
 * the selected file's highlighted code below, keeping long examples compact.
 */
export const CodeTabs: React.FC<{ files: CodeFileTab[] }> = ({ files }) => {
	const [active, setActive] = useState(0);
	if (files.length === 0) return null;
	const current = files[Math.min(active, files.length - 1)];

	return (
		<div className='my-8'>
			<div
				role='tablist'
				className='flex gap-2 overflow-x-auto pb-1'
			>
				{files.map((file, index) => {
					const isActive = index === active;
					return (
						<button
							key={`${file.name}-${index}`}
							role='tab'
							aria-selected={isActive}
							onClick={() => setActive(index)}
							className={`cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isActive ? "border-primary-500 bg-primary-500 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-primary-500"}`}
						>
							{file.name}
						</button>
					);
				})}
			</div>
			<div role='tabpanel'>
				<CodeBlock code={current.code} language={current.language} />
			</div>
		</div>
	);
};
