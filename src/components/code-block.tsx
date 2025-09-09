import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyIcon, CheckIcon } from "./icons";
import { useLanguage } from "../hooks/useLanguage";

interface CodeBlockProps {
	code: string;
	language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
	const [copied, setCopied] = useState(false);
	const { t } = useLanguage();

	const handleCopy = () => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const languageMap: { [key: string]: string | undefined } = {
		jsx: "javascript",
		tsx: "typescript",
		bash: "shell",
	};
	const highlighterLanguage = languageMap[language] || language;

	return (
		<div className='my-6 rounded-lg overflow-hidden shadow-lg border border-slate-700/50'>
			<div className='flex justify-between items-center px-4 py-2 bg-slate-700 dark:bg-slate-800'>
				<span className='text-xs font-sans text-slate-300 uppercase'>
					{language}
				</span>
				<button
					onClick={handleCopy}
					className='flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors'
				>
					{copied ? (
						<>
							<CheckIcon className='w-4 h-4 text-green-400' />
							{t("copied")}
						</>
					) : (
						<>
							<CopyIcon className='w-4 h-4' />
							{t("copy")}
						</>
					)}
				</button>
			</div>
			<SyntaxHighlighter
				language={highlighterLanguage}
				style={vscDarkPlus}
				customStyle={{
					margin: 0,
					borderBottomLeftRadius: "0.5rem",
					borderBottomRightRadius: "0.5rem",
					padding: "1rem",
				}}
				codeTagProps={{
					style: {
						fontFamily: "'Fira Code', monospace",
						fontSize: "14px",
					},
				}}
				showLineNumbers
			>
				{code.trim()}
			</SyntaxHighlighter>
		</div>
	);
};
