import type { FetchedTableResponse, UserEdited } from "@/types/database";
import type { QuizAttempt, AssignmentSubmission } from "../types/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const projectId = import.meta.env.VITE_PROJECT_ID;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const PAGE_SIZE = 10;

// Check if placeholder values are still being used.
const isSupabaseConfigured =
	supabaseUrl.includes(projectId) && supabaseAnonKey.includes(supabaseAnonKey);

let supabase: SupabaseClient;

if (isSupabaseConfigured) {
	supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
} else {
	// If Supabase is not configured, we'll log a warning and use a mock client.
	// This allows the rest of the app to function without crashing.
	console.warn(
		"Supabase credentials are not set. Please update constants.ts with your own credentials for authentication and data storage to work."
	);

	const mockAuth = {
		getSession: () => Promise.resolve({ data: { session: null }, error: null }),
		onAuthStateChange: () => ({
			data: { subscription: { unsubscribe: () => {} } },
		}),
		signInWithPassword: () =>
			Promise.resolve({
				data: { user: null, session: null },
				error: { message: "Supabase not configured. Check constants.ts" },
			}),
		signUp: () =>
			Promise.resolve({
				data: { user: null, session: null },
				error: { message: "Supabase not configured. Check constants.ts" },
			}),
		signOut: () => Promise.resolve({ error: null }),
	};

	const mockDB = {
		from: () => ({
			select: () => Promise.resolve({ data: [], error: null }),
			insert: (data: { [key: string]: string }) =>
				Promise.resolve({
					data,
					error: { message: "Supabase not configured. Check constants.ts" },
				}),
		}),
	};

	supabase = {
		...mockDB,
		auth: mockAuth,
	} as unknown as SupabaseClient;
}

export { supabase };

// --- Quiz & Assignment Submissions ---

export const saveQuizAttempt = async (attempt: QuizAttempt) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase.from("quiz_attempts").insert(attempt).select().single();
};

export const getQuizAttemptForUser = async (userId: string, quizId: string) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase
		.from("quiz_attempts")
		.select("*")
		.eq("user_id", userId)
		.eq("quiz_id", quizId)
		.maybeSingle();
};

export const saveAssignmentSubmission = async (
	submission: AssignmentSubmission
) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase
		.from("assignment_submissions")
		.insert(submission)
		.select()
		.single();
};

export const getAssignmentSubmissionForUser = async (
	userId: string,
	assignmentId: string
) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase
		.from("assignment_submissions")
		.select("*")
		.eq("user_id", userId)
		.eq("assignment_id", assignmentId)
		.maybeSingle();
};

// --- Admin Panel Data Fetching ---

// --- Roles ---
export const getAllRoles = async () => {
	if (!isSupabaseConfigured) return { data: [], error: null };
	return await supabase.from("roles").select("*");
};

export const getRoleByName = async (name: string) => {
	if (!isSupabaseConfigured) return { data: null, error: null };
	return await supabase
		.from("roles")
		.select("*")
		.eq("name", name)
		.maybeSingle();
};

// --- User CRUD ---
export async function getAllProfiles(page = 1, limit = 10) {
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	const { data, error, count } = await supabase
		.from("profiles")
		.select(
			`
      *,
      roles (
        id,
        name,
        description
      )
    `,
			{ count: "exact" }
		)
		.eq("active", true)
		.order("email")
		.range(from, to);

	return {
		data: data || [],
		error,
		count: count || (0 as number),
		totalPages: Math.ceil((count || 0) / limit) as number,
		currentPage: page as number,
	} as FetchedTableResponse;
}

export const updateUserRole = async ({
	userId,
	role_id,
}: {
	userId: string;
	role_id: string;
}) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };

	return await supabase
		.from("profiles")
		.update({ role_id })
		.eq("id", userId)
		.select()
		.single();
};

export const adminCreateUser = async ({
	email,
	password,
	role_id,
}: {
	email: string;
	password: string;
	role_id: string;
}) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };

	const { data: authData, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (signUpError) return { data: null, error: signUpError };

	if (authData.user) {
		const { data, error } = await updateUserRole({
			userId: authData.user.id,
			role_id,
		});
		return { data, error };
	}

	return { data: null, error: { message: "User was not created." } };
};

export const updateUserProfile = async ({
	userId,
	updates,
}: {
	userId: string;
	updates: Omit<UserEdited, "id">;
}) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };

	const { error } = await supabase.auth.admin.updateUserById(userId, {
		email: updates.email,
		password: updates.password,
	});

	if (error) throw error;

	return await supabase
		.from("profiles")
		.update({ email: updates.email, role_id: updates.role_id })
		.eq("id", userId)
		.select()
		.single();
};

export const deleteUser = async (userId: string) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase.auth.admin.deleteUser(userId);
};

export const getQuizAttempts = async (
	page: number,
	courseId?: string | null
) => {
	if (!isSupabaseConfigured) return { data: [], count: 0, error: null };
	const from = (page - 1) * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	let query = supabase
		.from("quiz_attempts")
		.select("*, profiles(email), courses(name)", { count: "exact" });

	if (courseId) {
		query = query.eq("course_id", courseId);
	}

	return await query.order("created_at", { ascending: false }).range(from, to);
};

export const getAssignmentSubmissions = async (
	page: number,
	courseId?: string | null
) => {
	if (!isSupabaseConfigured) return { data: [], count: 0, error: null };
	const from = (page - 1) * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	let query = supabase
		.from("assignment_submissions")
		.select("*, profiles(email), courses(name)", { count: "exact" });

	if (courseId) {
		query = query.eq("course_id", courseId);
	}

	return await query.order("created_at", { ascending: false }).range(from, to);
};
// Courses CRUD
export async function getAllCourses(page = 1, limit = 10) {
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	const { data, error, count } = await supabase
		.from("courses")
		.select("*", { count: "exact" })
		.order("name")
		.range(from, to);

	return {
		data: data || [],
		error,
		count: count || (0 as number),
		totalPages: Math.ceil((count || 0) / limit) as number,
		currentPage: page as number,
	} as FetchedTableResponse;
}

export const createCourse = async (name: string) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase.from("courses").insert({ name }).select().single();
};

export const updateCourse = async (courseId: string, name: string) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase
		.from("courses")
		.update({ name })
		.eq("id", courseId)
		.select()
		.single();
};

export const deleteCourse = async (courseId: string) => {
	if (!isSupabaseConfigured)
		return { data: null, error: { message: "Supabase not configured." } };
	return await supabase.from("courses").delete().eq("id", courseId);
};
