import React, { useState, useRef, useEffect, useCallback } from "react";
import { Chat } from "@google/genai";
import { createChatSession, sendMessageToAI } from "../services/geminiService";
import type { ChatMessage } from "../types/types";
import { SendIcon, CloseIcon, BotIcon } from "./icons";
import { useLanguage } from "../hooks/use-language";

interface ChatPanelProps {
	isOpen: boolean;
	onClose: () => void;
	topicContext: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
	isOpen,
	onClose,
	topicContext,
}) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [chatSession, setChatSession] = useState<Chat | null>(null);
	const { language, t } = useLanguage();

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			setMessages([
				{
					sender: "ai",
					text: t("chatGreeting", { topicContext }),
				},
			]);
			setChatSession(createChatSession(topicContext, language));
		}
	}, [isOpen, topicContext, language, t]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = useCallback(async () => {
		if (input.trim() === "" || isLoading || !chatSession) return;

		const userMessage: ChatMessage = { sender: "user", text: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const stream = await sendMessageToAI(chatSession, input);
			let aiResponseText = "";
			setMessages((prev) => [...prev, { sender: "ai", text: "" }]);

			for await (const chunk of stream) {
				aiResponseText += chunk.text;
				setMessages((prev) => {
					const newMessages = [...prev];
					newMessages[newMessages.length - 1] = {
						sender: "ai",
						text: aiResponseText,
					};
					return newMessages;
				});
			}
		} catch (error) {
			console.error("Error sending message to AI:", error);
			setMessages((prev) => [...prev, { sender: "ai", text: t("chatError") }]);
		} finally {
			setIsLoading(false);
		}
	}, [input, isLoading, chatSession, t]);

	if (!isOpen) return null;

	return (
		<aside
			className={`w-full sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className='flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800'>
				<h3 className='text-lg font-bold text-slate-900 dark:text-white'>
					{t("chatTitle")}
				</h3>
				<button
					onClick={onClose}
					className='p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
				>
					<CloseIcon className='w-6 h-6' />
				</button>
			</div>

			<div className='flex-1 p-4 overflow-y-auto space-y-4'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`flex items-start gap-3 ${
							msg.sender === "user" ? "justify-end" : ""
						}`}
					>
						{msg.sender === "ai" && (
							<div className='w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0'>
								<BotIcon className='w-5 h-5 text-white' />
							</div>
						)}
						<div
							className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${
								msg.sender === "user"
									? "bg-primary-500 text-white rounded-br-none"
									: "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none"
							}`}
						>
							<p className='text-sm break-words'>{msg.text}</p>
						</div>
					</div>
				))}
				{isLoading && messages[messages.length - 1]?.sender === "user" && (
					<div className='flex items-start gap-3'>
						<div className='w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0'>
							<BotIcon className='w-5 h-5 text-white' />
						</div>
						<div className='bg-slate-200 dark:bg-slate-800 rounded-lg px-4 py-3'>
							<div className='flex items-center space-x-1'>
								<span className='w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse delay-75'></span>
								<span className='w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse delay-150'></span>
								<span className='w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse delay-300'></span>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className='p-4 border-t border-slate-200 dark:border-slate-800'>
				<div className='flex items-center space-x-2'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSend()}
						placeholder={t("chatPlaceholder")}
						className='flex-1 w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm'
						disabled={isLoading}
					/>
					<button
						onClick={handleSend}
						disabled={isLoading || input.trim() === ""}
						className='p-2.5 bg-primary-500 text-white rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900'
					>
						<SendIcon className='w-5 h-5' />
					</button>
				</div>
			</div>
		</aside>
	);
};
