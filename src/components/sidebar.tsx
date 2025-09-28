import React, { useState, useEffect } from "react";
import { ReactNativeIcon, ChevronDownIcon, CloseIcon } from "./icons";
import { useLanguage } from "../hooks/use-language";
import type { CurriculumModule, CurriculumTopic } from "../types/types";
import { NavLink } from "react-router-dom";

interface SidebarProps {
	curriculum: {
		objetivoGeneral: CurriculumTopic;
		modules: CurriculumModule[];
	};
	selectedTopic: CurriculumTopic;
	onTopicSelect: (topic: CurriculumTopic) => void;
	isOpen: boolean;
	onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	curriculum,
	selectedTopic,
	onTopicSelect,
	isOpen,
	onClose,
}) => {
	const [expandedModule, setExpandedModule] = useState<string | null>(null);
	const { t } = useLanguage();

	// Effect to expand the module containing the selected topic
	useEffect(() => {
		const parentModule = curriculum.modules.find(
			(m) =>
				m.overview.id === selectedTopic.id ||
				m.conferences.some((c) => c.id === selectedTopic.id)
		);
		if (parentModule) {
			setExpandedModule(parentModule.id);
		} else {
			setExpandedModule(null); // Collapse all if topic (like 'Objetivo General') has no parent
		}
	}, [selectedTopic, curriculum.modules]);

	const toggleModule = (moduleId: string) => {
		setExpandedModule((prev) => (prev === moduleId ? null : moduleId));
	};

	const isTopicSelected = (topic: CurriculumTopic) =>
		selectedTopic.id === topic.id;

	const baseButtonClass =
		"w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";
	const selectedClass = "bg-primary-500 text-white";
	const unselectedClass =
		"text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800";

	return (
		<aside
			className={`w-64 flex-shrink-0 bg-slate-100 dark:bg-slate-900 p-4 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center space-x-3'>
					<ReactNativeIcon className='w-10 h-10 text-primary-500' />
					<div>
						<h2 className='text-lg font-bold text-slate-900 dark:text-white'>
							{t("sidebarTitle")}
						</h2>
						<p className='text-sm text-slate-500 dark:text-slate-400'>
							{t("sidebarSubtitle")}
						</p>
					</div>
				</div>
				<button
					onClick={onClose}
					className='md:hidden p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
					aria-label='Close menu'
				>
					<CloseIcon className='w-6 h-6' />
				</button>
			</div>
			<nav className='space-y-1 flex-1 overflow-y-auto'>
				<NavLink
					to={`/${curriculum.objetivoGeneral.id}`}
					onClick={() => onTopicSelect(curriculum.objetivoGeneral)}
				>
					<button
						className={`${baseButtonClass} ${
							isTopicSelected(curriculum.objetivoGeneral)
								? selectedClass
								: unselectedClass
						}`}
					>
						{curriculum.objetivoGeneral.title}
					</button>
				</NavLink>

				{curriculum.modules.map((module) => {
					const isExpanded = expandedModule === module.id;
					return (
						<div key={module.id}>
							<button
								onClick={() => toggleModule(module.id)}
								className='w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md'
								aria-expanded={isExpanded}
							>
								<span>{module.title}</span>
								<ChevronDownIcon
									className={`w-4 h-4 transform transition-transform duration-200 ${
										isExpanded ? "rotate-0" : "-rotate-90"
									}`}
								/>
							</button>

							{isExpanded && (
								<ul className='pl-3 mt-1 space-y-1 border-l border-slate-200 dark:border-slate-700 ml-3'>
									<li>
										<NavLink to={`/${module.overview.id}`}>
											<button
												onClick={() => onTopicSelect(module.overview)}
												className={`${baseButtonClass} ${
													isTopicSelected(module.overview)
														? selectedClass
														: unselectedClass
												}`}
											>
												{t("moduleOverview")}
											</button>
										</NavLink>
									</li>
									{module.conferences.map((topic) => (
										<NavLink to={`/${topic.id}`} key={topic.id}>
											<button
												onClick={() => onTopicSelect(topic)}
												className={`${baseButtonClass} ${
													isTopicSelected(topic)
														? selectedClass
														: unselectedClass
												}`}
											>
												{topic.title}
											</button>
										</NavLink>
									))}
								</ul>
							)}
						</div>
					);
				})}
			</nav>
		</aside>
	);
};
