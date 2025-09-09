"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query";
import { toast } from "sonner";
import { useLanguage } from "./useLanguage";
import {
	adminCreateUser,
	deleteUser,
	getAllProfiles,
	getAllRoles,
	updateUserProfile,
	updateUserRole,
} from "@/services/supabase";
import type { UserEdited } from "@/types/database";

export function useUsers(page = 1, limit = 10) {
	return useQuery({
		queryKey: [...queryKeys.users, page, limit],
		queryFn: async () => {
			const { data, error, count, totalPages, currentPage } =
				await getAllProfiles(page, limit);

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

export function useRoles() {
	return useQuery({
		queryKey: queryKeys.roles,
		queryFn: async () => {
			const { data, error } = await getAllRoles();
			if (error) throw error;
			return data;
		},
	});
}

export function useCreateUser() {
	const queryClient = useQueryClient();
	const { t } = useLanguage();

	return useMutation({
		mutationFn: adminCreateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users });
			toast.success("OK ✅", {
				description: t("notificationUserCreated"),
			});
		},
		onError: () => {
			toast.error("Error 👎", {
				description: t("notificationError"),
			});
		},
	});
}

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();
	const { t } = useLanguage();

	return useMutation({
		mutationFn: ({
			userId,
			updates,
		}: {
			userId: string;
			updates: Omit<UserEdited, "id">;
		}) => updateUserProfile({ userId, updates }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users });
			toast.success("OK ✅", {
				description: t("notificationUserUpdated"),
			});
		},
		onError: () => {
			toast.error("Error 👎", {
				description: t("notificationError"),
			});
		},
	});
}

export function useUpdateUserRole() {
	const queryClient = useQueryClient();
	const { t } = useLanguage();

	return useMutation({
		mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
			updateUserRole({ userId, roleId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users });
			toast.success("OK ✅", {
				description: t("notificationUserUpdated"),
			});
		},
		onError: () => {
			toast.error("Error 👎", {
				description: t("notificationError"),
			});
		},
	});
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	const { t } = useLanguage();

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users });
			toast.success("OK ✅", {
				description: t("notificationUserDeleted"),
			});
		},
		onError: () => {
			toast.error("Error 👎", {
				description: t("notificationError"),
			});
		},
	});
}
