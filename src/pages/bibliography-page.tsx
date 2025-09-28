import { useLanguage } from "@/hooks/use-language";
import { bibliographyContent } from "@/lib/bibliography-content";
import { DownloadIcon } from "lucide-react";

export default function BibliographyPage() {
	const { language, t } = useLanguage();

	return (
		<div className='max-w-5xl mx-auto'>
			<h1 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8'>
				{t("bibliography.title")}
			</h1>
			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{bibliographyContent.map((item, index) => (
					<div
						key={index}
						className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300'
					>
						<div className='p-6 flex-grow flex flex-col'>
							<h2 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>
								{item.title[language]}
							</h2>
							<p className='text-gray-600 dark:text-gray-400 text-sm flex-grow'>
								{item.description[language]}
							</p>
						</div>
						<div className='p-4 bg-gray-50 dark:bg-gray-800/50 mt-auto'>
							<a
								href={item.file}
								target='_blank'
								rel='noopener noreferrer'
								download
								className='inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md transition-colors text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900'
							>
								<DownloadIcon className='w-5 h-5 mr-2' />
								<span>{t("bibliography.downloadButton")}</span>
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
