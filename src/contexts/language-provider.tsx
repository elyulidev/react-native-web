// src/contexts/LanguageContext.tsx (o como lo hayas llamado)

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { translations } from "../lib/i18n";
import type { Language, CurriculumTopic } from "../types/types";
import { LanguageContext } from "./language-context";

// Define la interfaz del contexto
export interface LanguageContextType {
	language: Language;
	setLanguage: (language: Language) => void;
	t: (key: string, options?: { [key: string]: string }) => string;
	curriculum: typeof translations.es.curriculum;
	selectedTopic: CurriculumTopic | null;
	handleTopicSelect: (topic: CurriculumTopic) => void;
}

// Exporta SOLO el componente Provider
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [language, setLanguageState] = useState<Language>(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const storedLang = window.localStorage.getItem("language");
			if (storedLang === "es" || storedLang === "pt") {
				return storedLang;
			}
		}
		const browserLang = navigator.language.split("-")[0];
		return browserLang === "pt" ? "pt" : "es";
	});

	const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic | null>(
		() => translations[language].curriculum.objetivoGeneral
	);

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
	};

	const handleTopicSelect = useCallback((topic: CurriculumTopic) => {
		setSelectedTopic(topic);
	}, []);

	const t = useCallback(
		(key: string, options?: { [key: string]: string }): string => {
			let text =
				translations[language].ui[key as keyof typeof translations.es.ui] ||
				key;
			if (options) {
				Object.keys(options).forEach((optionKey) => {
					text = text.replace(`{${optionKey}}`, options[optionKey]);
				});
			}
			return text;
		},
		[language]
	);

	const value = useMemo(
		() => ({
			language,
			setLanguage,
			t,
			curriculum: translations[language].curriculum,
			selectedTopic,
			handleTopicSelect,
		}),
		[language, selectedTopic, handleTopicSelect, t]
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};
