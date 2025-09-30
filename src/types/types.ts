import type { Session, User } from "@supabase/supabase-js";

export type Language = "es" | "pt";

export interface IconMap {
	[key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface QuizQuestion {
	question: string;
	options: string[];
	correctAnswer: number; // index of the correct option
}

export interface FileItem {
	id: string;
	name: string;
	description: string[];
}

export interface EvaluationCardData {
	lang: Language;
	title: string;
	description: string;
	buttonText: string;
	url: string;
}

export interface BibliographyCardData {
	type: "pdf" | "link";
	title: string;
	description: string;
	buttonText: string;
	url: string;
}

export interface ContentPart {
	type:
		| "heading"
		| "paragraph"
		| "code"
		| "list"
		| "alert"
		| "subtitle"
		| "image"
		| "twoColumn"
		| "featureCard"
		| "callout"
		| "divider"
		| "quiz"
		| "fileStructure"
		| "componentGrid"
		| "assignment"
		| "evaluationCards"
		| "bibliographyCards";
	text?: string;
	id?: string; // For anchor links to subtitles
	code?: string;
	language?: string;
	items?: (string | { text: string; subItems?: string[] })[];
	alertType?: "info" | "warning" | "tip";
	// New properties for richer content
	imageUrl?: string;
	caption?: string;
	columns?: {
		title: string;
		content: string[];
	}[];
	featureItems?: {
		icon: string;
		title: string;
		text: string;
	}[];
	questions?: QuizQuestion[];
	files?: FileItem[];
	componentGridItems?: {
		id: string;
		title: string;
		icon: string;
	}[];
	// Assignment properties
	assignmentId?: string;
	description?: string[];
	evaluationCards?: EvaluationCardData[];
	bibliographyCards?: BibliographyCardData[];
}

export interface CurriculumTopic {
	id: string;
	title: string;
	content: ContentPart[];
}

export interface CurriculumModule {
	id: string;
	title: string;
	overview: CurriculumTopic;
	conferences: CurriculumTopic[];
}

export interface ChatMessage {
	sender: "user" | "ai";
	text: string;
}

// Auth & DB Types
// Session and User are now imported from Supabase to ensure type compatibility.
export type { Session, User };

export interface Role {
	id: string;
	name: "admin" | "instructor" | "student";
	description?: string;
}

export interface Profile {
	id: string;
	email: string | null;
	role_id: string;
	roles?: Role | null;
}

export interface Course {
	id: string;
	name: string;
}

export interface QuizAttempt {
	id?: string;
	user_id: string;
	course_id: string;
	quiz_id: string;
	score: number;
	answers: Record<number, number | null>;
	created_at?: string;
	profiles?: { email: string } | null;
	courses?: { name: string } | null;
}

export interface AssignmentSubmission {
	id?: string;
	user_id: string;
	course_id: string;
	assignment_id: string;
	content: string | null;
	created_at?: string;
	profiles?: { email: string } | null;
	courses?: { name: string } | null;
}
