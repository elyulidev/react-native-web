import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./components/sidebar";
import { ContentDisplay } from "./components/content-display";
import { Header } from "./components/header";
import { ChatPanel } from "./components/chat-panel";
import { MoonIcon, SunIcon } from "./components/icons";
import { Auth } from "./components/auth";
//import { AdminPanel } from "./components/AdminPanel";
import { Spinner } from "./components/spinner";
import { useLanguage } from "./hooks/use-language";
import { useAuth } from "./hooks/use-auth";
import type { CurriculumTopic } from "./types/types";
//import { EnhancedAdminPanel } from "./components/enhanced-admin-panel";
import { Navigate, Route, Routes } from "react-router-dom";
import BibliographyPage from "./pages/bibliography-page";

const App: React.FC = () => {
	const { curriculum, selectedTopic, handleTopicSelect } = useLanguage();
	const { session, isAdmin, loading } = useAuth();

	const [isChatPanelOpen, setChatPanelOpen] = useState<boolean>(false);
	const [isAdminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);
	const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const storedTheme = window.localStorage.getItem("theme");
			if (storedTheme === "dark" || storedTheme === "light") {
				return storedTheme;
			}
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				return "dark";
			}
		}
		return "light";
	});

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	}, []);

	const handleTopicSelection = (topic: CurriculumTopic) => {
		handleTopicSelect(topic);
		setSidebarOpen(false); // Close sidebar on topic selection
	};

	if (loading || !curriculum || !selectedTopic) {
		return (
			<div className='flex items-center justify-center h-screen bg-white dark:bg-slate-950'>
				<Spinner />
			</div>
		);
	}

	if (isAdminPanelOpen && session && isAdmin) {
		//return <EnhancedAdminPanel onClose={() => setAdminPanelOpen(false)} />;
	}

	return (
		<>
			<div className='flex h-screen font-sans text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950'>
				<Sidebar
					curriculum={curriculum}
					selectedTopic={selectedTopic}
					onTopicSelect={handleTopicSelection}
					isOpen={isSidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>
				<div className='flex flex-col flex-1 overflow-hidden'>
					<Header
						topicTitle={selectedTopic.title}
						onChatToggle={() => setChatPanelOpen(!isChatPanelOpen)}
						isChatOpen={isChatPanelOpen}
						onAdminToggle={() => setAdminPanelOpen(true)}
						onLoginClick={() => setAuthModalOpen(true)}
						onMenuToggle={() => setSidebarOpen(true)}
					>
						<button
							onClick={toggleTheme}
							className='p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900'
							aria-label='Toggle dark mode'
						>
							{theme === "light" ? (
								<MoonIcon className='w-6 h-6' />
							) : (
								<SunIcon className='w-6 h-6' />
							)}
						</button>
					</Header>
					<main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
						<Routes>
							<Route
								path='/'
								element={
									<ContentDisplay
										topic={selectedTopic}
										onLoginRequest={() => setAuthModalOpen(true)}
									/>
								}
							/>
							<Route
								path='/:id'
								element={
									<ContentDisplay
										topic={selectedTopic}
										onLoginRequest={() => setAuthModalOpen(true)}
									/>
								}
							/>
							<Route path='/bibliografia' element={<BibliographyPage />} />
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</main>
				</div>
				<ChatPanel
					isOpen={isChatPanelOpen}
					onClose={() => setChatPanelOpen(false)}
					topicContext={selectedTopic.title}
				/>
			</div>

			{/* Mobile Sidebar Overlay */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden'
					onClick={() => setSidebarOpen(false)}
					aria-hidden='true'
				></div>
			)}

			{isAuthModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
					<Auth
						onAuthSuccess={() => setAuthModalOpen(false)}
						onClose={() => setAuthModalOpen(false)}
					/>
				</div>
			)}
		</>
	);
};

export default App;
