import type { ChatMessage } from '$lib/models/ChatMessage';
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_SECRET_KEY } from '$env/static/private';
import { getPrompt } from '$lib/helpers/open-ai.js';
import type { ChatCompletionRequest } from '$lib/models/ChatCompletionRequest.js';
import { PUBLIC_OPENAI_SECRET_KEY_HEADER } from '$env/static/public';

async function completeChat(request: any) {
	const headers = request.headers;
	const openAiKey = headers.get(PUBLIC_OPENAI_SECRET_KEY_HEADER);

	const openai = new OpenAI({
		apiKey: openAiKey || OPENAI_SECRET_KEY
	});

	const { messages, bot }: ChatCompletionRequest = await request.json();

	const username = messages[messages.length - 1].author;

	const promptGptMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
		role: 'system',
		content: getPrompt(bot, username)
	};

	const userGptMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = messages.map(
		(e) => ({
			role: e.type === 'other' ? 'assistant' : 'user',
			content: e.content
		})
	);

	const gptMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		promptGptMessage,
		...userGptMessages
	];

	const defaultModel = 'gpt-3.5-turbo';
	const chatCompletion = await openai.chat.completions.create({
		messages: gptMessages,
		model: (openAiKey && bot.model) || defaultModel,
		temperature: bot.temperature ?? 0.2
	});

	const choice = chatCompletion.choices[0];

	const message: ChatMessage = {
		author: bot.name,
		timestamp: new Date(),
		content: choice.message.content ?? '',
		type: 'other'
	};
	return message;
}

export async function POST({ request }) {
	try {
		const message: ChatMessage = await completeChat(request);
		return json(message);
	} catch (e) {
		const message: ChatMessage = {
			author: 'SYSTEM',
			timestamp: new Date(),
			content: 'This service is currently unavailable. Sorry for the inconvenience!',
			type: 'other'
		};

		return json(message);
	}
}
