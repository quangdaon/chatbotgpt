import type { ChatMessage } from '$lib/models/ChatMessage';
import { error, json } from '@sveltejs/kit';
import bots from '$data/bots.json';
import OpenAI from 'openai';
import { OPENAI_SECRET_KEY } from '$env/static/private';
import { getPrompt } from '$lib/helpers/open-ai.js';

const openai = new OpenAI({
	apiKey: OPENAI_SECRET_KEY
});


async function completeChat(request: any, params: any) {
	const messages: ChatMessage[] = await request.json();
	const bot = bots[params.slug as keyof typeof bots];

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

	const chatCompletion = await openai.chat.completions.create({
		messages: gptMessages,
		model: 'gpt-3.5-turbo',
		temperature: 0.2
	});

	const choice = chatCompletion.choices[0];

	const message: ChatMessage = {
		author: bot.displayName,
		timestamp: new Date(),
		content: choice.message.content ?? '',
		type: 'other'
	};
	return message;
}

export async function POST({ params, request }) {
	if (!(params.slug in bots)) {
		return error(404);
	}

	try {
		const message: ChatMessage = await completeChat(request, params);
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

