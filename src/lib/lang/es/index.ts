import type { CurriculumModule, CurriculumTopic } from "../../../types/types";

// Módulo 1 Imports
import { conference1 } from "./module-1/conf-1";
import { conference2 } from "./module-1/conf-2";
import { conference3 } from "./module-1/conf-3";
import { conference4 } from "./module-1/conf-4";
import { conference5 } from "./module-1/conf-5";
import { conference6 } from "./module-1/conf-6";
import { conference7 } from "./module-1/conf-7";
import { conference8 } from "./module-1/conf-8";

// Módulo 2 Imports
import { conference9 } from "./module-2/conf-9";
import { conference10 } from "./module-2/conf-10";
import { conference11 } from "./module-2/conf-11";
import { conference12 } from "./module-2/conf-12";
import { conference13 } from "./module-2/conf-13";
import { conference14 } from "./module-2/conf-14";
import { conference15 } from "./module-2/conf-15";
import { conference16 } from "./module-2/conf-16";

// Módulo 3 Imports
import { conference17 } from "./module-3/conf-17";
import { conference18 } from "./module-3/conf-18";
import { conference19 } from "./module-3/conf-19";
import { conference20 } from "./module-3/conf-20";
import { conference21 } from "./module-3/conf-21";
import { conference22 } from "./module-3/conf-22";
import { conference23 } from "./module-3/conf-23";
import { conference24 } from "./module-3/conf-24";
import { conference25 } from "./module-3/conf-25";
import { conference26 } from "./module-3/conf-26";

// Módulo 4 Imports
import { conference27 } from "./module-4/conf-27";
import { conference28 } from "./module-4/conf-28";
import { conference29 } from "./module-4/conf-29";
import { conference30 } from "./module-4/conf-30";
import { conference31 } from "./module-4/conf-31";
import { conference32 } from "./module-4/conf-32";
import { conference33 } from "./module-4/conf-33";
import { conference34 } from "./module-4/conf-34";
import { conference35 } from "./module-4/conf-35";
import { conference36 } from "./module-4/conf-36";

// Módulo 5 Imports
import { conference37 } from "./module-5/conf-37";
import { conference38 } from "./module-5/conf-38";
import { conference39 } from "./module-5/conf-39";
import { conference40 } from "./module-5/conf-40";
import { conference41 } from "./module-5/conf-41";
import { conference42 } from "./module-5/conf-42";
import { conference43 } from "./module-5/conf-43";
import { conference44 } from "./module-5/conf-44";
import { conference45 } from "./module-5/conf-45";
import { conference46 } from "./module-5/conf-46";
import { conference47 } from "./module-5/conf-47";
import { conference48 } from "./module-5/conf-48";

const objetivoGeneral: CurriculumTopic = {
	id: "objetivo-general",
	title: "Objetivo General",
	content: [
		{ type: "heading", text: "Objetivo General de la Asignatura" },
		{
			type: "paragraph",
			text: "Capacitarte para construir aplicaciones móviles multiplataforma (Android, iOS y Web) utilizando React Native y Expo, con un enfoque en el desarrollo local y la persistencia de datos con SQLite y Drizzle ORM.",
		},
		{
			type: "image",
			imageUrl: "/objetivo-general.webp",
			caption: "Un ecosistema de desarrollo moderno para aplicaciones móviles.",
		},
	],
};

const modules: CurriculumModule[] = [
	{
		id: "modulo-1",
		title: "Módulo 1: Fundamentos",
		overview: {
			id: "modulo-1-overview",
			title: "Módulo 1: Fundamentos",
			content: [
				{
					type: "heading",
					text: "Módulo 1: Fundamentos de React Native y Configuración",
				},
				{ type: "paragraph", text: "Duración: 16 horas / 8 Conferencias" },
				{
					type: "paragraph",
					text: "Este módulo sienta las bases para el desarrollo móvil, cubriendo la configuración del entorno y los componentes esenciales de la interfaz de usuario.",
				},
			],
		},
		conferences: [
			conference1,
			conference2,
			conference3,
			conference4,
			conference5,
			conference6,
			conference7,
			conference8,
		],
	},
	{
		id: "modulo-2",
		title: "Módulo 2: Navegación",
		overview: {
			id: "modulo-2-overview",
			title: "Módulo 2: Navegación",
			content: [
				{
					type: "heading",
					text: "Módulo 2: Navegación y Estructura de Aplicaciones",
				},
				{ type: "paragraph", text: "Duración: 16 horas / 8 Conferencias" },
				{
					type: "paragraph",
					text: "Este módulo se centra en cómo organizar y navegar entre las diferentes pantallas de tu aplicación, utilizando las herramientas de enrutamiento de Expo.",
				},
			],
		},
		conferences: [
			conference9,
			conference10,
			conference11,
			conference12,
			conference13,
			conference14,
			conference15,
			conference16,
		],
	},
	{
		id: "modulo-3",
		title: "Módulo 3: Persistencia de Datos",
		overview: {
			id: "modulo-3-overview",
			title: "Módulo 3: Persistencia de Datos",
			content: [
				{
					type: "heading",
					text: "Módulo 3: Persistencia de Datos Local con SQLite y Drizzle ORM",
				},
				{ type: "paragraph", text: "Duración: 20 horas / 10 Conferencias" },
				{
					type: "paragraph",
					text: "En este módulo, aprenderás a almacenar y gestionar datos directamente en el dispositivo del usuario, utilizando Expo SQLite y Drizzle ORM como una solución local.",
				},
			],
		},
		conferences: [
			conference17,
			conference18,
			conference19,
			conference20,
			conference21,
			conference22,
			conference23,
			conference24,
			conference25,
			conference26,
		],
	},
	{
		id: "modulo-4",
		title: "Módulo 4: APIs y Optimización",
		overview: {
			id: "modulo-4-overview",
			title: "Módulo 4: APIs y Optimización",
			content: [
				{
					type: "heading",
					text: "Módulo 4: Consumo de APIs Externas y Optimización",
				},
				{ type: "paragraph", text: "Duración: 20 horas / 10 Conferencias" },
				{
					type: "paragraph",
					text: "Este módulo te enseñará a integrar datos de servicios web externos en tus aplicaciones, así como a optimizar el rendimiento para una experiencia de usuario fluida.",
				},
			],
		},
		conferences: [
			conference27,
			conference28,
			conference29,
			conference30,
			conference31,
			conference32,
			conference33,
			conference34,
			conference35,
			conference36,
		],
	},
	{
		id: "modulo-5",
		title: "Módulo 5: Tópicos Avanzados",
		overview: {
			id: "modulo-5-overview",
			title: "Módulo 5: Tópicos Avanzados",
			content: [
				{
					type: "heading",
					text: "Módulo 5: Aplicaciones Avanzadas y Mejores Prácticas",
				},
				{ type: "paragraph", text: "Duración: 24 horas / 12 Conferencias" },
				{
					type: "paragraph",
					text: "Este módulo se enfoca en la arquitectura de aplicaciones, técnicas avanzadas de UI/UX, refactorización y la preparación para el despliegue.",
				},
			],
		},
		conferences: [
			conference37,
			conference38,
			conference39,
			conference40,
			conference41,
			conference42,
			conference43,
			conference44,
			conference45,
			conference46,
			conference47,
			conference48,
		],
	},
];

const evaluations: CurriculumTopic = {
	id: "evaluations",
	title: "Evaluaciones",
	content: [
		{ type: "heading", text: "Descarga de Material de Evaluación" },
		{
			type: "paragraph",
			text: "Aquí puedes encontrar los informes de evaluación del curso. Por favor, descarga la versión correspondiente a tu idioma.",
		},
		{
			type: "evaluationCards",
			evaluationCards: [
				{
					lang: "es",
					title: "Informe de Evaluaciones",
					description:
						"Este documento contiene el informe detallado de las evaluaciones parcial y final del curso en español.",
					buttonText: "Descargar PDF",
					url: "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/Opcional%20I%20-%20ES.pdf",
				},
				{
					lang: "pt",
					title: "Relatório de Avaliações",
					description:
						"Este documento contém o relatório detalhado das avaliações parcial e final do curso em português.",
					buttonText: "Baixar PDF",
					url: "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/Opcional%20I.pdf",
				},
			],
		},
	],
};

const bibliography: CurriculumTopic = {
	id: "bibliography",
	title: "Bibliografía",
	content: [
		{ type: "heading", text: "Bibliografía y Recursos Adicionales" },
		{
			type: "paragraph",
			text: "Aquí encontrarás una colección de libros y documentación oficial recomendada para profundizar en los temas del bootcamp.",
		},
		{
			type: "bibliographyCards",
			bibliographyCards: [
				{
					type: "pdf",
					title: "Learning React Native	- 2nd Edition",
					description: "Building Native Mobile Apps with JavaScript",
					buttonText: "Descargar PDF",
					url: "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/Learning%20React%20Native%20-%20building%20Native%20mobile%20apps%20with%20--%20Eisenman%2C%20Bonnie%20--%20%28%20WeLib.org%20%29.pdf",
				},
				{
					type: "pdf",
					title: "Introducing SQLite for Mobile Developers",
					description: "Enabling Database Functionality for Android and iPhone",
					buttonText: "Descargar PDF",
					url: "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/Introducing%20SQLite%20for%20mobile%20developers%20-%20enabling%20database%20--%20Jesse%20Feiler%20--%20%28%20WeLib.org%20%29.pdf",
				},
				{
					type: "link",
					title: "Documentación Oficial de React Native",
					description:
						"La fuente de verdad para todo lo relacionado con React Native. Imprescindible para consultar APIs de componentes y guías.",
					buttonText: "Visitar Sitio",
					url: "https://reactnative.dev/docs/getting-started",
				},
				{
					type: "link",
					title: "Documentación Oficial de Expo",
					description:
						"Explora el ecosistema de Expo, desde el enrutamiento hasta el acceso a APIs nativas y el proceso de build. Tu mejor amigo en el desarrollo.",
					buttonText: "Visitar Sitio",
					url: "https://docs.expo.dev/",
				},
			],
		},
	],
};

export const esCurriculum = {
	objetivoGeneral,
	modules,
	evaluations,
	bibliography,
};
