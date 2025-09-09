import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query";
import { getQuizAttempts, deleteQuizAttempt } from "@/services/database";
import { toast } from "sonner";

export function useQuizAttempts() {
	return useQuery({
		queryKey: queryKeys.quizAttempts,
		queryFn: async () => {
			const { data, error } = await getQuizAttempts();
			if (error) throw error;
			return data || [];
		},
	});
}

export function useDeleteQuizAttempt() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (attemptId: string) => {
			const { error } = await deleteQuizAttempt(attemptId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.quizAttempts });
			toast.success("OK ✅", {
				description: "Quiz attempt deleted successfully",
			});
		},
		onError: () => {
			toast.error("Error", {
				description: "Failed to delete quiz attempt",
			});
		},
	});
}
