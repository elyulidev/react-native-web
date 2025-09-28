export interface LocalizedString {
	es: string;
	pt: string;
}
export interface BibliographyItem {
	title: LocalizedString;
	description: LocalizedString;
	file: string;
}

export const bibliographyContent: BibliographyItem[] = [
	{
		title: {
			es: "Libro de HTML & CSS",
			pt: "Livro de HTML & CSS",
		},
		description: {
			es: "Documento PDF con bibliografía completa recomendada para los módulos de HTML & CSS",
			pt: "Documento PDF com a bibliografia completa recomendada para os módulos de HTML & CSS",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/HTML%20%26%20CSS%20design%20and%20build%20websites.pdf",
	},
	{
		title: {
			es: "Libro de JavaScript",
			pt: "Livro de JavaScript",
		},
		description: {
			es: "Un libro para profundizar en JavaScript moderno y ES6+.",
			pt: "Um livro para aprofundar em JavaScript moderno e ES6+.",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/Programming%20JavaScript%20Applications.pdf",
	},
	{
		title: {
			es: "Aprende Diseño Web",
			pt: "Aprende Design Web",
		},
		description: {
			es: "Mejores prácticas y convenciones para escribir CSS mantenible y escalable.",
			pt: "Melhores práticas e convenções para escrever CSS sustentável e escalável.",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/Learning%20Web%20Design%20-%20A%20Beginner%E2%80%99s%20Guide%20to%20HTML%2C%20CSS.pdf",
	},
	{
		title: {
			es: "Aprende sobre API REST",
			pt: "Aprende sobre API REST",
		},
		description: {
			es: "Documento PDF con ejemplos de puesta en producción de API REST.",
			pt: "Documento PDF com exemplos de implantação de API REST",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/api_rest.pdf",
	},
	{
		title: {
			es: "Cheatsheet de HTML5",
			pt: "Cheatsheet de HTML5",
		},
		description: {
			es: "Recopilación de los principales conceptos y etiquetas de HTML55",
			pt: "Recolhimento dos principais conceitos e etiquetas de HTML5",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/html5-cheatsheet-2019.pdf",
	},
	{
		title: {
			es: "Cheatsheet de CSS3",
			pt: "Cheatsheet de CSS3",
		},
		description: {
			es: "Documento PDF con los principales conceptos de CSS3",
			pt: "Documento PDF com os principais conceitos de CSS3",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/css3-cheatsheet-2017-emezeta.pdf",
	},
	{
		title: {
			es: "Cheatsheet de JS",
			pt: "Cheatsheet de JS",
		},
		description: {
			es: "Resumen de los principales conceptos de Javascript",
			pt: "Resume dos principais conceitos de Javascript",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/javascript-cheatsheet.pdf",
	},
	{
		title: {
			es: "Cheatsheet de Emmet",
			pt: "Cheatsheet de Emmet",
		},
		description: {
			es: "Agiliza la forma de escribir código HTML",
			pt: "Agiliza a forma de escrever código HTML",
		},
		file: "https://1rqzd6uwpqe1a157.public.blob.vercel-storage.com/emmet-cheat-sheet.pdf",
	},
];
