"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query";
import {
	getAssignmentSubmissions,
	deleteAssignmentSubmission,
} from "@/services/database";
import { toast } from "sonner";

export function useAssignmentSubmissions() {
	return useQuery({
		queryKey: queryKeys.assignmentSubmissions,
		queryFn: async () => {
			const { data, error } = await getAssignmentSubmissions();
			if (error) throw error;
			return data || [];
		},
	});
}

export function useDeleteAssignmentSubmission() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (submissionId: string) => {
			const { error } = await deleteAssignmentSubmission(submissionId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.assignmentSubmissions,
			});
			toast.success("OK ✅", {
				description: "Assignment submission deleted successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to delete assignment submission",
			});
		},
	});
}
