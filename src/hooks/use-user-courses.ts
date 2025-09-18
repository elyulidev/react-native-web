import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query";
import {
	getUserCourses,
	assignUserToCourse,
	removeUserFromCourse,
} from "@/services/database";
import { toast } from "sonner";
import { getAllCourses, getAllProfiles } from "@/services/supabase";

export function useUserCourses() {
	return useQuery({
		queryKey: queryKeys.userCourses,
		queryFn: async () => {
			const { data, error } = await getUserCourses();
			if (error) throw error;
			return data || [];
		},
	});
}

export function useProfiles() {
	return useQuery({
		queryKey: queryKeys.profiles,
		queryFn: async () => {
			const { data, error } = await getAllProfiles();
			if (error) throw error;
			return data || [];
		},
	});
}

export function useCoursesForEnrollment() {
	return useQuery({
		queryKey: queryKeys.courses,
		queryFn: async () => {
			const { data, error } = await getAllCourses();
			if (error) throw error;
			return data || [];
		},
	});
}

export function useAssignUserToCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			userId,
			courseId,
		}: {
			userId: string;
			courseId: string;
		}) => {
			const { data, error } = await assignUserToCourse(userId, courseId);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.userCourses });
			toast.success("OK ✅", {
				description: "User enrolled successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to enroll user",
			});
		},
	});
}

export function useRemoveUserFromCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (enrollmentId: string) => {
			const { error } = await removeUserFromCourse(enrollmentId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.userCourses });
			toast.success("OK ✅", {
				description: "Enrollment removed successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to remove enrollment",
			});
		},
	});
}
