import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { Language } from "../types/types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
	console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstructions = {
	es: `Eres un asistente experto y amigable para estudiantes universitarios que aprenden a programar con React Native y Expo. Tu objetivo es explicar conceptos de forma clara y concisa. Responde siempre en español. No uses markdown en tus respuestas.`,
	pt: `Você é um assistente especialista e amigável para estudantes universitários que estão aprendendo a programar com React Native e Expo. Seu objetivo é explicar conceitos de forma clara e concisa. Responda sempre em português. Não use markdown em suas respostas.`,
};

export const createChatSession = (
	topicContext: string,
	language: Language
): Chat => {
	const model = "gemini-2.5-flash";
	const baseInstruction = systemInstructions[language];

	const chat = ai.chats.create({
		model: model,
		config: {
			systemInstruction: `${baseInstruction} Contexto actual del estudiante: ${topicContext}.`,
		},
	});
	return chat;
};

export const sendMessageToAI = async (
	chat: Chat,
	message: string
): Promise<AsyncGenerator<GenerateContentResponse>> => {
	const result = await chat.sendMessageStream({ message });
	return result;
};
