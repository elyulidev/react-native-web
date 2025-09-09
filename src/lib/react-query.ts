import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 1,
		},
	},
});

export const queryKeys = {
	users: ["users"] as const,
	profiles: ["profiles"] as const,
	roles: ["roles"] as const,
	courses: ["courses"] as const,
	userCourses: ["user-courses"] as const,
	quizAttempts: ["quiz-attempts"] as const,
	assignmentSubmissions: ["assignment-submissions"] as const,
};
