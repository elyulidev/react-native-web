import { createContext } from "react";
import type { Profile, Session, User } from "../types/types";

export interface AuthContextType {
	user: User | null;
	session: Session | null;
	profile: Profile | null;
	isAdmin: boolean;
	loading: boolean;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
