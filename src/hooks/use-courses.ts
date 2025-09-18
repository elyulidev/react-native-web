import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query";
import { createCourse, updateCourse, deleteCourse } from "@/services/database";
import { toast } from "sonner";
import { getAllCourses } from "@/services/supabase";

export function useCourses(page = 1, limit = 10) {
	return useQuery({
		queryKey: [...queryKeys.courses, page, limit],
		queryFn: async () => {
			const { data, error, count, currentPage, totalPages } =
				await getAllCourses(page, limit);

			if (error) throw error;

			return {
				data,
				error,
				count,
				totalPages,
				currentPage,
			};
		},
	});
}

export function useCreateCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (courseData: { name: string; instructor_id: string }) => {
			const { data, error } = await createCourse(courseData);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.courses });
			toast.success("OK ✅", {
				description: "Course created successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to create course",
			});
		},
	});
}

export function useUpdateCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			courseId,
			courseData,
		}: {
			courseId: string;
			courseData: { name: string };
		}) => {
			const { data, error } = await updateCourse(courseId, courseData);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.courses });
			toast.success("OK ✅", {
				description: "Course updated successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to update course",
			});
		},
	});
}

export function useDeleteCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (courseId: string) => {
			const { error } = await deleteCourse(courseId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.courses });
			toast.success("OK ✅", {
				description: "Course deleted successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to delete course",
			});
		},
	});
}
