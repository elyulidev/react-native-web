import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./auth-context";
import { supabase } from "../services/supabase";
import type { Profile, Session, User } from "../types/types";

// Función dedicada para obtener el perfil del usuario
const fetchUserProfile = async (user: User): Promise<Profile | null> => {
	const { data, error } = await supabase
		.from("profiles")
		.select("*, roles(name)")
		.eq("id", user.id)
		.single();

	if (error) {
		console.error("Error fetching profile:", error);
		throw new Error(error.message);
	}

	return data as Profile;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const queryClient = useQueryClient();

	// useEffect modificado para usar async/await
	useEffect(() => {
		// Se define una función asíncrona dentro del efecto para poder usar 'await'.
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setUser(session?.user ?? null);
		};

		// Se llama a la función para ejecutarla.
		getInitialSession();

		// El listener de onAuthStateChange no se basa en promesas, por lo que se mantiene igual.
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		// Función de limpieza para cancelar la suscripción.
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	// useQuery para obtener el perfil del usuario.
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ["profile", user?.id],
		queryFn: () => fetchUserProfile(user!),
		enabled: !!user,
	});

	// useMutation para gestionar el cierre de sesión.
	const { mutate: signOut, isPending: signOutPending } = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signOut();
			if (error) throw new Error(error.message);
		},
		onSuccess: () => {
			queryClient.removeQueries();
		},
	});

	const isAdmin = profile?.roles?.name === "admin";
	const loading = useMemo(
		() => isLoadingProfile || signOutPending,
		[isLoadingProfile, signOutPending]
	);

	const value = {
		user,
		session,
		profile: profile ?? null,
		isAdmin,
		loading,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
