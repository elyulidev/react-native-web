import React, { useState, useMemo, useCallback, useEffect } from "react";
import type {
	CurriculumTopic,
	ContentPart,
	IconMap,
	QuizQuestion,
	FileItem,
	QuizAttempt,
	AssignmentSubmission,
} from "../types/types";
import { CodeBlock } from "./code-block";

import {
	saveQuizAttempt,
	getQuizAttemptForUser,
	saveAssignmentSubmission,
	getAssignmentSubmissionForUser,
} from "../services/supabase";
import {
	InfoIcon,
	WarningIcon,
	TipIcon,
	DevicePhoneMobileIcon,
	CodeBracketIcon,
	BoltIcon,
	UsersIcon,
	AcademicCapIcon,
	FolderIcon,
	RectangleGroupIcon,
	ArrowRightIcon,
	FileIcon,
	DocumentTextIcon,
	PhotoIcon,
	Bars3BottomLeftIcon,
	ArrowsUpDownIcon,
	CursorArrowRaysIcon,
	PowerIcon,
	ListBulletIcon,
	// New Icons for Conf 4
	ArrowPathIcon,
	ChatBubbleBottomCenterTextIcon,
	SparklesIcon,
	KeyIcon,
	LinkIcon,
	RectangleStackIcon,
	MagnifyingGlassPlusIcon,
	WindowIcon,
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
} from "./icons";
import { useLanguage } from "../hooks/use-language";
import { useAuth } from "../hooks/use-auth";
import { Spinner } from "./spinner";
import { useParams } from "react-router-dom";
import { translations, type Translations } from "@/lib/i18n";

// Map icon names from data to actual components
const icons: IconMap = {
	DevicePhoneMobileIcon,
	CodeBracketIcon,
	BoltIcon,
	UsersIcon,
	AcademicCapIcon,
	FolderIcon,
	RectangleGroupIcon,
	ArrowRightIcon,
	DocumentTextIcon,
	PhotoIcon,
	Bars3BottomLeftIcon,
	ArrowsUpDownIcon,
	CursorArrowRaysIcon,
	PowerIcon,
	ListBulletIcon,
	// New Icons for Conf 4
	ArrowPathIcon,
	ChatBubbleBottomCenterTextIcon,
	SparklesIcon,
	KeyIcon,
	LinkIcon,
	RectangleStackIcon,
	MagnifyingGlassPlusIcon,
	WindowIcon,
};

// --- Base Container Component ---
const InteractiveContentContainer: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div className='my-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700'>
		{children}
	</div>
);

// --- Spinner Container ---
const SpinnerContainer: React.FC = () => (
	<InteractiveContentContainer>
		<div className='flex justify-center items-center h-48'>
			<Spinner />
		</div>
	</InteractiveContentContainer>
);

// --- Login Prompt Component ---
const LoginPrompt: React.FC<{
	onLoginRequest: () => void;
	title: string;
	body: string;
}> = ({ onLoginRequest, title, body }) => {
	const { t } = useLanguage();
	return (
		<InteractiveContentContainer>
			<div className='text-center'>
				<h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
					{title}
				</h3>
				<p className='text-slate-600 dark:text-slate-300 mb-6'>{body}</p>
				<button
					onClick={onLoginRequest}
					className='px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800'
				>
					{t("login")}
				</button>
			</div>
		</InteractiveContentContainer>
	);
};

// --- Quiz Component ---
interface QuizProps {
	questions: QuizQuestion[];
	quizId: string;
	onLoginRequest: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, quizId, onLoginRequest }) => {
	const { t } = useLanguage();
	const { user } = useAuth();

	const [loadingAttempt, setLoadingAttempt] = useState(true);
	const [existingAttempt, setExistingAttempt] = useState<QuizAttempt | null>(
		null
	);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, number | null>
	>({});
	const [quizFinished, setQuizFinished] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const totalQuestions = questions.length;

	useEffect(() => {
		const fetchAttempt = async () => {
			if (!user) {
				setLoadingAttempt(false);
				return;
			}
			setLoadingAttempt(true);
			const { data, error } = await getQuizAttemptForUser(user.id, quizId);
			if (error) {
				console.error("Error fetching quiz attempt:", error);
			} else {
				setExistingAttempt(data);
			}
			setLoadingAttempt(false);
		};

		fetchAttempt();
	}, [user, quizId]);

	const handleSaveAttempt = useCallback(
		async (finalScore: number, finalAnswers: Record<number, number | null>) => {
			if (!user) return;

			setIsSaving(true);
			const DEMO_COURSE_ID = "e9e0755e-013d-4c3e-a83d-8a6526a0c444";

			const attempt: QuizAttempt = {
				user_id: user.id,
				quiz_id: quizId,
				score: finalScore,
				answers: finalAnswers,
				course_id: DEMO_COURSE_ID,
			};

			const { data, error } = await saveQuizAttempt(attempt);
			if (error) {
				console.error("Error saving quiz attempt:", error);
			} else if (data) {
				setExistingAttempt(data);
			}
			setIsSaving(false);
		},
		[user, quizId]
	);

	const handleAnswerSelect = (optionIndex: number) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[currentQuestionIndex]: optionIndex,
		}));
	};

	const handleNext = () => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else {
			setQuizFinished(true);
		}
	};

	const score = useMemo(() => {
		if (questions.length === 0) return 0;
		const correctAnswers = questions.reduce((count, question, index) => {
			if (selectedAnswers[index] === question.correctAnswer) {
				return count + 1;
			}
			return count;
		}, 0);
		return Math.round((correctAnswers / totalQuestions) * 100);
	}, [questions, selectedAnswers, totalQuestions]);

	useEffect(() => {
		if (quizFinished && !isSaving) {
			handleSaveAttempt(score, selectedAnswers);
		}
	}, [quizFinished, score, selectedAnswers, handleSaveAttempt, isSaving]);

	if (totalQuestions === 0) return null;

	const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

	if (loadingAttempt) {
		return <SpinnerContainer />;
	}

	if (!user) {
		return (
			<LoginPrompt
				onLoginRequest={onLoginRequest}
				title={t("loginToTakeQuizTitle")}
				body={t("loginToTakeQuizBody")}
			/>
		);
	}

	if (existingAttempt) {
		return (
			<InteractiveContentContainer>
				<div className='text-center'>
					<h3 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>
						{t("quizCompleted")}
					</h3>
					<p className='text-5xl font-extrabold text-primary-500 mb-4'>
						{existingAttempt.score}%
					</p>
					<p className='text-slate-600 dark:text-slate-300'>
						{t("yourSavedScore")}
					</p>
				</div>
			</InteractiveContentContainer>
		);
	}

	if (quizFinished) {
		return <SpinnerContainer />;
	}

	return (
		<InteractiveContentContainer>
			<>
				<div className='mb-4'>
					<div className='flex justify-between items-center mb-2'>
						<h4 className='font-semibold text-slate-800 dark:text-slate-100'>
							{t("quizQuestion", {
								current: String(currentQuestionIndex + 1),
								total: String(totalQuestions),
							})}
						</h4>
					</div>
					<div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5'>
						<div
							className='bg-primary-500 h-2.5 rounded-full'
							style={{
								width: `${progress}%`,
								transition: "width 0.3s ease-in-out",
							}}
						></div>
					</div>
				</div>

				<p className='text-lg font-medium text-slate-900 dark:text-white my-4'>
					{questions[currentQuestionIndex].question}
				</p>

				<div className='space-y-3'>
					{questions[currentQuestionIndex].options.map((option, index) => {
						const isSelected = selectedAnswers[currentQuestionIndex] === index;
						return (
							<button
								key={index}
								onClick={() => handleAnswerSelect(index)}
								className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${
									isSelected
										? "bg-primary-100 dark:bg-primary-900/50 border-primary-500"
										: "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-primary-400"
								}`}
							>
								<span
									className={`font-medium ${
										isSelected
											? "text-primary-700 dark:text-primary-300"
											: "text-slate-800 dark:text-slate-200"
									}`}
								>
									{option}
								</span>
							</button>
						);
					})}
				</div>

				<div className='mt-6 flex justify-end'>
					<button
						onClick={handleNext}
						disabled={
							selectedAnswers[currentQuestionIndex] === undefined ||
							selectedAnswers[currentQuestionIndex] === null
						}
						className='px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800'
					>
						{currentQuestionIndex < totalQuestions - 1
							? t("quizNext")
							: t("quizSubmit")}
					</button>
				</div>
			</>
		</InteractiveContentContainer>
	);
};
// --- End Quiz Component ---

// --- Assignment Component ---
interface AssignmentProps {
	assignmentId: string;
	description: string[];
	initialCode?: string;
	onLoginRequest: () => void;
}

const Assignment: React.FC<AssignmentProps> = ({
	assignmentId,
	description,
	initialCode,
	onLoginRequest,
}) => {
	const { t } = useLanguage();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const [existingSubmission, setExistingSubmission] =
		useState<AssignmentSubmission | null>(null);
	const [solution, setSolution] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const DEMO_COURSE_ID = "e9e0755e-013d-4c3e-a83d-8a6526a0c444";

	useEffect(() => {
		const fetchSubmission = async () => {
			if (!user) {
				setLoading(false);
				return;
			}
			setLoading(true);
			const { data, error } = await getAssignmentSubmissionForUser(
				user.id,
				assignmentId
			);
			if (error) {
				console.error("Error fetching submission:", error);
			} else {
				setExistingSubmission(data);
			}
			setLoading(false);
		};
		fetchSubmission();
	}, [user, assignmentId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user || !solution.trim()) return;

		setIsSubmitting(true);
		const submission: AssignmentSubmission = {
			user_id: user.id,
			assignment_id: assignmentId,
			content: solution,
			course_id: DEMO_COURSE_ID,
		};
		const { data, error } = await saveAssignmentSubmission(submission);
		if (error) {
			console.error("Error saving submission:", error);
		} else if (data) {
			setExistingSubmission(data);
		}
		setIsSubmitting(false);
	};

	return (
		<InteractiveContentContainer>
			{/* Assignment details are always visible */}
			<div className='space-y-3 mb-4'>
				{description.map((p, index) => (
					<p
						key={index}
						className='text-slate-600 dark:text-slate-300 leading-relaxed'
					>
						{p}
					</p>
				))}
			</div>
			{initialCode && <CodeBlock code={initialCode} language='jsx' />}

			{/* Submission area is conditional */}
			<div className='mt-6 pt-6 border-t border-slate-200 dark:border-slate-700'>
				{loading ? (
					<div className='flex justify-center items-center h-48'>
						<Spinner />
					</div>
				) : !user ? (
					<div className='text-center'>
						<h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
							{t("loginToSubmitAssignmentTitle")}
						</h3>
						<p className='text-slate-600 dark:text-slate-300 mb-6'>
							{t("loginToSubmitAssignmentBody")}
						</p>
						<button
							onClick={onLoginRequest}
							className='px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800'
						>
							{t("login")}
						</button>
					</div>
				) : existingSubmission ? (
					<div>
						<h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
							{t("assignmentCompleted")}
						</h3>
						<p className='text-slate-600 dark:text-slate-300 mb-4'>
							{t("assignmentSubmittedOn", {
								date: new Date(existingSubmission.created_at!).toLocaleString(),
							})}
						</p>
						<h4 className='text-lg font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2'>
							{t("yourSubmission")}
						</h4>
						<CodeBlock code={existingSubmission.content || ""} language='jsx' />
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<textarea
							value={solution}
							onChange={(e) => setSolution(e.target.value)}
							placeholder={t("pasteYourCodeHere")}
							rows={15}
							className='w-full p-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-primary-500 focus:border-primary-500 font-mono text-sm'
							required
						/>
						<div className='mt-4 flex justify-end'>
							<button
								type='submit'
								disabled={isSubmitting || !solution.trim()}
								className='px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800 flex items-center'
							>
								{isSubmitting && <Spinner />}
								<span className={isSubmitting ? "ml-2" : ""}>
									{t("submitAssignment")}
								</span>
							</button>
						</div>
					</form>
				)}
			</div>
		</InteractiveContentContainer>
	);
};
// --- End Assignment Component ---

// --- FileStructure Component ---
interface FileStructureProps {
	files: FileItem[];
}

const FileStructure: React.FC<FileStructureProps> = ({ files }) => {
	const [selectedFile, setSelectedFile] = useState<FileItem | null>(
		files.length > 0 ? files[0] : null
	);

	if (files.length === 0) return null;

	return (
		<div className='my-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden'>
			<table className='w-full text-sm'>
				<thead className='bg-slate-100 dark:bg-slate-800/50'>
					<tr>
						<th className='w-1/3 md:w-1/4 p-3 text-left font-semibold text-slate-800 dark:text-slate-200'>
							Archivo/Carpeta
						</th>
						<th className='p-3 text-left font-semibold text-slate-800 dark:text-slate-200'>
							Descripción
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className='align-top'>
						<td className='p-0 border-r border-slate-200 dark:border-slate-700'>
							<div className='flex flex-col'>
								{files.map((file) => (
									<button
										key={file.id}
										className={`flex items-center gap-3 w-full p-3 text-left transition-colors ${
											selectedFile?.id === file.id
												? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
										}`}
										onClick={() => setSelectedFile(file)}
									>
										<FileIcon className='w-4 h-4 flex-shrink-0' />
										<span className='font-medium'>{file.name}</span>
									</button>
								))}
							</div>
						</td>
						<td className='p-4'>
							{selectedFile ? (
								<div className='space-y-3'>
									{selectedFile.description.map((p, index) => (
										<p
											key={index}
											className='text-slate-600 dark:text-slate-300 leading-relaxed'
										>
											{p}
										</p>
									))}
								</div>
							) : (
								<div className='flex items-center justify-center h-full text-slate-500 dark:text-slate-400'>
									Selecciona un archivo para ver su descripción
								</div>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
// --- End FileStructure Component ---

// --- ComponentGrid Component ---
const ComponentGrid: React.FC<{
	items: { id: string; title: string; icon: string }[];
}> = ({ items }) => {
	const handleScrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6'>
			{items.map((item) => {
				const IconComponent = icons[item.icon];
				return (
					<div
						key={item.id}
						onClick={() => handleScrollTo(item.id)}
						className='flex flex-col items-center justify-center text-center p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:shadow-md transition-all duration-200 group cursor-pointer'
					>
						{IconComponent && (
							<IconComponent className='w-8 h-8 mb-2 text-slate-600 dark:text-slate-300 group-hover:text-primary-500 transition-colors' />
						)}
						<span className='font-semibold text-sm text-slate-800 dark:text-slate-100'>
							{item.title}
						</span>
					</div>
				);
			})}
		</div>
	);
};
// --- End ComponentGrid Component ---

const Alert: React.FC<{ part: ContentPart }> = ({ part }) => {
	const alertStyles = {
		info: {
			bg: "bg-blue-100 dark:bg-blue-900/50",
			border: "border-blue-500",
			text: "text-blue-800 dark:text-blue-200",
			icon: <InfoIcon className='w-5 h-5 text-blue-500' />,
		},
		warning: {
			bg: "bg-yellow-100 dark:bg-yellow-900/50",
			border: "border-yellow-500",
			text: "text-yellow-800 dark:text-yellow-200",
			icon: <WarningIcon className='w-5 h-5 text-yellow-500' />,
		},
		tip: {
			bg: "bg-green-100 dark:bg-green-900/50",
			border: "border-green-500",
			text: "text-green-800 dark:text-green-200",
			icon: <TipIcon className='w-5 h-5 text-green-500' />,
		},
	};

	const styles = alertStyles[part.alertType || "info"];

	return (
		<div
			className={`flex items-start gap-3 p-5 my-6 rounded-xl border shadow-sm ${styles.bg} ${styles.border} border-l-4`}
			role='alert'
		>
			<div className='flex-shrink-0 mt-0.5'>{styles.icon}</div>
			<p className={`text-[0.95rem] leading-7 ${styles.text}`}>{part.text}</p>
		</div>
	);
};

// Inline rich text for lists: **bold** + `code`
const renderRichInline = (text: string) => {
	const boldParts = text.split("**");
	return boldParts.map((boldSeg, bi) => {
		if (bi % 2 === 1) {
			return (
				<strong
					key={bi}
					className='font-semibold text-slate-900 dark:text-slate-50'
				>
					{boldSeg}
				</strong>
			);
		}
		const codeParts = boldSeg.split("`");
		return (
			<React.Fragment key={bi}>
				{codeParts.map((codeSeg, ci) =>
					ci % 2 === 1 ? (
						<code
							key={ci}
							className='rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 font-mono text-[0.85em] text-primary-700 dark:text-primary-300 break-words'
						>
							{codeSeg}
						</code>
					) : (
						<React.Fragment key={ci}>{codeSeg}</React.Fragment>
					)
				)}
			</React.Fragment>
		);
	});
};

const Paragraph: React.FC<{ text?: string }> = ({ text }) => (
	<p className='mb-4 leading-relaxed text-slate-700 dark:text-slate-300'>
		{renderRichInline(text ?? "")}
	</p>
);

const ContentPartRenderer: React.FC<{
	part: ContentPart;
	topic: CurriculumTopic;
	partIndex: number;
	onLoginRequest: () => void;
}> = ({ part, topic, partIndex, onLoginRequest }) => {
	const { language } = useLanguage();
	switch (part.type) {
		case "heading": {
			if (
				part.text?.startsWith("Tarea Extraclase") ||
				part.text?.startsWith("Tarefa Extraclasse")
			) {
				return (
					<div className='my-10 overflow-hidden rounded-2xl border border-primary-200 dark:border-primary-900/60 shadow-sm'>
						<div className='bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-5'>
							<p className='text-xs font-semibold uppercase tracking-widest text-primary-100'>
								{language === "pt"
									? "Encerramento · trabalho individual"
									: "Cierre · trabajo individual"}
							</p>
							<h2 className='mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-white text-balance'>
								{part.text}
							</h2>
						</div>
					</div>
				);
			}
			return (
				<>
					<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-3 text-slate-900 dark:text-white text-balance'>
						{part.text}
					</h1>
					<div
						className='mb-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-300'
						aria-hidden
					/>
				</>
			);
		}
		case "subtitle": {
			const slug =
				part.id ||
				part.text
					?.toLowerCase()
					.replace(/<[^>]*>?/gm, "") // Remove HTML tags
					.replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
					.replace(/\s+/g, "-") // Collapse whitespace and replace by -
					.replace(/-+/g, "-"); // Collapse dashes
			return (
				<h2
					id={slug}
					className='flex items-center gap-3 mt-14 mb-5 text-2xl md:text-[1.75rem] font-bold tracking-tight text-slate-900 dark:text-slate-50 scroll-mt-24'
				>
					<span
						className='h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary-500 to-primary-300'
						aria-hidden
					/>
					<span className='border-b border-slate-200 dark:border-slate-700/80 pb-2 flex-1'>
						{part.text}
					</span>
				</h2>
			);
		}
		case "paragraph":
			return <Paragraph text={part.text} />;
		case "code":
			return (
				<CodeBlock code={part.code || ""} language={part.language || "bash"} />
			);
		case "list": {
			const items = part.items ?? [];
			const steppedCount = items.filter((item) => {
				const t = typeof item === "string" ? item : item.text;
				return /^\s*\d+\.\s*/.test(t);
			}).length;
			const isStepped = items.length >= 2 && steppedCount >= 2;
			return (
				<ul
					className={
						isStepped
							? "my-6 space-y-3"
							: "my-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/40 divide-y divide-slate-200 dark:divide-slate-700/60"
					}
				>
					{items.map((item, index) => {
						const rawText = typeof item === "string" ? item : item.text;
						const subItems =
							typeof item !== "string" && item.subItems ? item.subItems : [];
						const stepMatch = rawText.match(/^\s*(\d+)\.\s*([\s\S]*)$/);
						const cleanText = stepMatch ? stepMatch[2] : rawText;
						const stepNumber = stepMatch ? stepMatch[1] : String(index + 1);
						if (isStepped) {
							return (
								<li
									key={index}
									className='flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/40 p-4 sm:p-5 shadow-sm'
								>
									<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white'>
										{stepNumber}
									</span>
									<div className='min-w-0 flex-1 text-[0.95rem] leading-7 text-slate-700 dark:text-slate-300'>
										{renderRichInline(cleanText)}
										{subItems.length > 0 && (
											<ul className='mt-3 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3'>
												{subItems.map((subItem, subIndex) => (
													<li
														key={subIndex}
														className='flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400'
													>
														<span
															className='mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-slate-400'
															aria-hidden
														/>
														<span>{renderRichInline(subItem)}</span>
													</li>
												))}
											</ul>
										)}
									</div>
								</li>
							);
						}
						return (
							<li
								key={index}
								className='flex gap-3 px-4 sm:px-5 py-3.5 text-[0.95rem] leading-7 text-slate-700 dark:text-slate-300'
							>
								<span
									className='mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500'
									aria-hidden
								/>
								<div className='min-w-0 flex-1'>
									{renderRichInline(rawText)}
									{subItems.length > 0 && (
										<ul className='mt-2 ml-1 space-y-1.5'>
											{subItems.map((subItem, subIndex) => (
												<li
													key={subIndex}
													className='flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400'
												>
													<span
														className='mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-slate-400'
														aria-hidden
													/>
													<span>{renderRichInline(subItem)}</span>
												</li>
											))}
										</ul>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			);
		}
		case "alert":
		case "callout":
			return <Alert part={part} />;
		case "image":
			return (
				<figure className='my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/40 shadow-sm'>
					<img
						src={part.imageUrl}
						alt={part.caption || "Imagen de la conferencia"}
						className='w-full max-h-[480px] object-cover'
						loading='lazy'
					/>
					{part.caption && (
						<figcaption className='px-4 py-3 text-center text-[13px] leading-5 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/40'>
							{part.caption}
						</figcaption>
					)}
				</figure>
			);
		case "twoColumn":
			return (
				<div className='grid md:grid-cols-2 gap-4 my-8'>
					{part.columns?.map((col, index) => (
						<div
							key={index}
							className={`rounded-2xl border p-5 shadow-sm ${index === 0 ? "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/40" : "border-primary-200 dark:border-primary-900/60 bg-primary-50/60 dark:bg-primary-950/30"}`}
						>
							<h3 className='text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3'>
								{col.title}
							</h3>
							<ul className='space-y-2'>
								{col.content.map((item, i) => (
									<li
										key={i}
										className='rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 px-3 py-2 font-mono text-[13.5px] leading-6 text-slate-700 dark:text-slate-200 break-words'
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			);
		case "featureCard": {
			const count = part.featureItems?.length ?? 0;
			return (
				<div
					className={`grid gap-4 my-8 sm:grid-cols-2 ${count === 3 ? "lg:grid-cols-3" : ""}`}
				>
					{part.featureItems?.map((item, index) => {
						const IconComponent = icons[item.icon];
						return (
							<div
								key={index}
								className='group flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
							>
								{IconComponent && (
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/50 transition-colors group-hover:bg-primary-500 group-hover:text-white'>
										<IconComponent className='w-6 h-6 text-primary-600 dark:text-primary-300 group-hover:text-white' />
									</div>
								)}
								<div className='min-w-0'>
									<h4 className='font-bold text-slate-900 dark:text-white'>
										{item.title}
									</h4>
									<p className='mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300'>
										{item.text}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			);
		}
		case "divider":
			return (
				<hr className='my-12 h-px border-0 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent' />
			);
		case "fileStructure":
			return <FileStructure files={part.files || []} />;
		case "componentGrid":
			return <ComponentGrid items={part.componentGridItems || []} />;
		case "quiz":
			return (
				<Quiz
					questions={part.questions || []}
					quizId={`${topic.id}-${partIndex}`}
					onLoginRequest={onLoginRequest}
				/>
			);
		case "assignment":
			return (
				<Assignment
					assignmentId={part.assignmentId || `${topic.id}-${partIndex}`}
					description={part.description || []}
					initialCode={part.code}
					onLoginRequest={onLoginRequest}
				/>
			);
		case "evaluationCards":
			return (
				<div className='grid md:grid-cols-2 gap-6 my-8'>
					{part.evaluationCards?.map((card) => (
						<div
							key={card.lang}
							className='bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col'
						>
							<h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
								{card.title}
							</h3>
							<p className='text-slate-600 dark:text-slate-300 mb-6 flex-1'>
								{card.description}
							</p>
							<a
								href={card.url}
								download
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800 transition-colors'
							>
								<ArrowDownTrayIcon className='w-5 h-5' />
								{card.buttonText}
							</a>
						</div>
					))}
				</div>
			);
		case "bibliographyCards":
			return (
				<div className='grid md:grid-cols-2 gap-6 my-8'>
					{part.bibliographyCards?.map((card, index) => (
						<div
							key={index}
							className='bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col'
						>
							<h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
								{card.title}
							</h3>
							<p className='text-slate-600 dark:text-slate-300 mb-6 flex-1'>
								{card.description}
							</p>
							<a
								href={card.url}
								download={card.type === "pdf"}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800 transition-colors'
							>
								{card.type === "pdf" ? (
									<ArrowDownTrayIcon className='w-5 h-5' />
								) : (
									<ArrowTopRightOnSquareIcon className='w-5 h-5' />
								)}
								{card.buttonText}
							</a>
						</div>
					))}
				</div>
			);
		default:
			return null;
	}
};

interface ContentDisplayProps {
	topic: CurriculumTopic;
	onLoginRequest: () => void;
}

const findTopic = (
	id: string,
	translations: Translations,
	language: keyof typeof translations
) => {
	// Get a direct reference to the curriculum to avoid repetition.
	const curriculum = translations[language].curriculum;

	// Handle dynamic IDs based on their prefix first.
	if (id.startsWith("modulo-")) {
		// Correctly extract the module's unique ID.
		const moduleId = id.slice(0, id.length - 9);

		return curriculum.modules.find((mod) => mod.id === moduleId)?.overview;
	}

	if (id.startsWith("conf-")) {
		// Flatten all conferences into a single array and then search.
		// This correctly returns the conference topic itself, not its parent module.
		const allConferences = curriculum.modules.flatMap((mod) => mod.conferences);
		return allConferences.find((topic) => topic.id === id);
	}

	// For static IDs, use a lookup map. It's cleaner and more scalable than a switch.
	const staticTopicsMap: Record<string, unknown> = {
		"objetivo-general": curriculum.objetivoGeneral,
		evaluations: curriculum.evaluations,
		bibliography: curriculum.bibliography,
	};

	// Return the value from the map. If the ID is not a key, this returns undefined.
	return staticTopicsMap[id] || staticTopicsMap["objetivo-general"];
};

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
	onLoginRequest,
}) => {
	// 1. Obtener el parámetro de la URL
	const { id } = useParams<{ id: string }>();

	// 2. Acceder al contexto y obtener la función para actualizar el tema
	const { language, selectedTopic, handleTopicSelect } = useLanguage();

	useEffect(() => {
		if (!id) return;

		const currentTopic = findTopic(
			id,
			translations,
			language
		) as CurriculumTopic;

		if (currentTopic) {
			handleTopicSelect(currentTopic);
		}
	}, [id, language, handleTopicSelect]);

	return (
		<article className='max-w-4xl mx-auto'>
			{selectedTopic?.content.map((part, index) => (
				<ContentPartRenderer
					key={index}
					part={part}
					topic={selectedTopic as CurriculumTopic}
					partIndex={index}
					onLoginRequest={onLoginRequest}
				/>
			))}
		</article>
	);
};
