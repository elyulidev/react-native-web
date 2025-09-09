import { createContext } from "react";
import type { LanguageContextType } from "./language-provider";

// Exporta el contexto para que el hook pueda usarlo
export const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);
