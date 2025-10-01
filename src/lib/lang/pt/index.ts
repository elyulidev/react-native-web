import type { CurriculumTopic, CurriculumModule } from "../../../types/types";

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
	title: "Objetivo Geral",
	content: [
		{ type: "heading", text: "Objetivo Geral da Disciplina" },
		{
			type: "paragraph",
			text: "Capacitá-lo para construir aplicações móveis multiplataforma (Android, iOS e Web) utilizando React Native e Expo, com foco no desenvolvimento local e na persistência de dados com SQLite e Drizzle ORM.",
		},
		{
			type: "image",
			imageUrl: "/objetivo-general.webp",
			caption:
				"Um ecossistema de desenvolvimento moderno para aplicações móveis.",
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
					text: "Módulo 1: Fundamentos de React Native e Configuração",
				},
				{ type: "paragraph", text: "Duração: 16 horas / 8 Palestras" },
				{
					type: "paragraph",
					text: "Este módulo estabelece as bases para o desenvolvimento móvel, cobrindo a configuração do ambiente e os componentes essenciais da interface do usuário.",
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
		title: "Módulo 2: Navegação",
		overview: {
			id: "modulo-2-overview",
			title: "Módulo 2: Navegação",
			content: [
				{
					type: "heading",
					text: "Módulo 2: Navegação e Estrutura de Aplicações",
				},
				{ type: "paragraph", text: "Duração: 16 horas / 8 Palestras" },
				{
					type: "paragraph",
					text: "Este módulo foca em como organizar e navegar entre as diferentes telas da sua aplicação, utilizando as ferramentas de roteamento do Expo.",
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
		title: "Módulo 3: Persistência de Dados",
		overview: {
			id: "modulo-3-overview",
			title: "Módulo 3: Persistência de Dados",
			content: [
				{
					type: "heading",
					text: "Módulo 3: Persistência de Dados Local com SQLite e Drizzle ORM",
				},
				{ type: "paragraph", text: "Duração: 20 horas / 10 Palestras" },
				{
					type: "paragraph",
					text: "Neste módulo, você aprenderá a armazenar e gerenciar dados directamente no dispositivo do usuário, utilizando o Expo SQLite e o Drizzle ORM como uma solução local.",
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
		title: "Módulo 4: APIs e Otimização",
		overview: {
			id: "modulo-4-overview",
			title: "Módulo 4: APIs e Otimização",
			content: [
				{
					type: "heading",
					text: "Módulo 4: Consumo de APIs Externas e Otimização",
				},
				{ type: "paragraph", text: "Duração: 20 horas / 10 Palestras" },
				{
					type: "paragraph",
					text: "Este módulo ensinará você a integrar dados de serviços web externos em suas aplicações, bem como a otimizar o desempenho para uma experiência de usuário fluida.",
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
		title: "Módulo 5: Tópicos Avançados",
		overview: {
			id: "modulo-5-overview",
			title: "Módulo 5: Tópicos Avançados",
			content: [
				{
					type: "heading",
					text: "Módulo 5: Aplicações Avançadas e Melhores Práticas",
				},
				{ type: "paragraph", text: "Duração: 24 horas / 12 Palestras" },
				{
					type: "paragraph",
					text: "Este módulo foca na arquitetura de aplicações, técnicas avançadas de UI/UX, refatoração e preparação para a implantação.",
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
	title: "Avaliações",
	content: [
		{ type: "heading", text: "Download de Material de Avaliação" },
		{
			type: "paragraph",
			text: "Aqui você pode encontrar os relatórios de avaliação do curso. Por favor, baixe a versão correspondente ao seu idioma.",
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
					url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
				},
				{
					lang: "pt",
					title: "Relatório de Avaliações",
					description:
						"Este documento contém o relatório detalhado das avaliações parcial e final do curso em português.",
					buttonText: "Baixar PDF",
					url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
				},
			],
		},
	],
};

const bibliography: CurriculumTopic = {
	id: "bibliography",
	title: "Bibliografia",
	content: [
		{ type: "heading", text: "Bibliografia e Recursos Adicionais" },
		{
			type: "paragraph",
			text: "Aqui encontrará uma coleção de livros e documentação oficial recomendada para aprofundar os temas do bootcamp.",
		},
		{
			type: "bibliographyCards",
			bibliographyCards: [
				{
					type: "pdf",
					title: "React Native em Ação",
					description:
						"Um livro completo que abrange os fundamentos e padrões avançados para construir aplicações de alta qualidade com React Native.",
					buttonText: "Baixar PDF",
					url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
				},
				{
					type: "pdf",
					title: "Bases de Dados com SQLite",
					description:
						"Aprenda a projetar e gerir bases de dados relacionais locais, um recurso essencial para a persistência de dados offline.",
					buttonText: "Baixar PDF",
					url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
				},
				{
					type: "link",
					title: "Documentação Oficial do React Native",
					description:
						"A fonte da verdade para tudo relacionado ao React Native. Indispensável para consultar APIs de componentes e guias.",
					buttonText: "Visitar Site",
					url: "https://reactnative.dev/",
				},
				{
					type: "link",
					title: "Documentação Oficial do Expo",
					description:
						"Explore o ecossistema Expo, desde o roteamento até o acesso a APIs nativas e o processo de build. O seu melhor amigo no desenvolvimento.",
					buttonText: "Visitar Site",
					url: "https://docs.expo.dev/",
				},
			],
		},
	],
};

export const ptCurriculum = {
	objetivoGeneral,
	modules,
	evaluations,
	bibliography,
};
