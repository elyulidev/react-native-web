// src/hooks/useLanguage.ts

import { useContext } from "react";
// Importa el contexto desde el otro archivo
import { LanguageContext } from "../contexts/language-context";

// La definición del tipo puede estar en el archivo del contexto o en types.ts
// Si necesitas reusar LanguageContextType, expórtala también desde el otro archivo.
import type { LanguageContextType } from "../contexts/language-provider";

// Exporta SOLO el hook
export const useLanguage = (): LanguageContextType => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
