import type { Role, Course } from "@/types/database";
import { supabase } from "./supabase";

// Roles CRUD
export async function getAllRoles() {
	return await supabase.from("roles").select("*").order("name");
}

export async function createRole(role: Omit<Role, "id" | "created_at">) {
	return await supabase.from("roles").insert([role]).select().single();
}

export async function updateRole(id: string, updates: Partial<Role>) {
	return await supabase
		.from("roles")
		.update(updates)
		.eq("id", id)
		.select()
		.single();
}

export async function deleteRole(id: string) {
	return await supabase.from("roles").delete().eq("id", id);
}

export async function createCourse(course: Omit<Course, "id" | "created_at">) {
	return await supabase.from("courses").insert([course]).select().single();
}

export async function updateCourse(id: string, updates: Partial<Course>) {
	return await supabase
		.from("courses")
		.update(updates)
		.eq("id", id)
		.select()
		.single();
}

export async function deleteCourse(id: string) {
	return await supabase.from("courses").delete().eq("id", id);
}

// User-Course assignments CRUD
export async function getUserCourses() {
	return await supabase
		.from("user_course")
		.select(
			`
      *,
      profiles (
        id,
        email,
        roles (
          name
        )
      ),
      courses (
        id,
        name
      )
    `
		)
		.order("created_at", { ascending: false });
}

export async function assignUserToCourse(userId: string, courseId: string) {
	return await supabase
		.from("user_course")
		.insert([{ user_id: userId, course_id: courseId }])
		.select()
		.single();
}

export async function removeUserFromCourse(id: string) {
	return await supabase.from("user_course").delete().eq("id", id);
}

// Quiz Attempts CRUD
export async function getQuizAttempts() {
	return await supabase
		.from("quiz_attempts")
		.select(
			`
      *,
      profiles (
        id,
        email
      ),
      courses (
        id,
        name
      )
    `
		)
		.order("created_at", { ascending: false });
}

export async function deleteQuizAttempt(id: string) {
	return await supabase.from("quiz_attempts").delete().eq("id", id);
}

// Assignment Submissions CRUD
export async function getAssignmentSubmissions() {
	return await supabase
		.from("assignment_submissions")
		.select(
			`
      *,
      profiles (
        id,
        email
      ),
      courses (
        id,
        name
      )
    `
		)
		.order("created_at", { ascending: false });
}

export async function deleteAssignmentSubmission(id: string) {
	return await supabase.from("assignment_submissions").delete().eq("id", id);
}
