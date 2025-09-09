export interface Role {
	id: string;
	name: "admin" | "instructor" | "student";
	description?: string;
	created_at?: string;
}

export interface Course {
	id: string;
	name: string;
	created_at?: string;
}

export interface Profile {
	id: string;
	email?: string;
	role_id?: string;
	roles?: Role;
	created_at?: string;
}

export interface UserEdited {
	id: string;
	email?: string;
	role_id?: string;
	password?: string;
}

export interface UserCourse {
	id: string;
	user_id: string;
	course_id: string;
	created_at?: string;
	profiles?: Profile;
	courses?: Course;
}

export interface QuizAttempt {
	id: string;
	user_id: string;
	course_id: string;
	quiz_id: string;
	score: number;
	answers?: any;
	created_at?: string;
	profiles?: Profile;
	courses?: Course;
}

export interface AssignmentSubmission {
	id: string;
	user_id: string;
	course_id: string;
	assignment_id: string;
	content?: string;
	created_at?: string;
	profiles?: Profile;
	courses?: Course;
}
