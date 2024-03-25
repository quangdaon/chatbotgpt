import type { ChatMessage } from '$lib/models/ChatMessage';
import { error, json } from '@sveltejs/kit';
import bots from '$data/bots.json';
import OpenAI from 'openai';
import { OPENAI_SECRET_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_SECRET_KEY
});

export async function POST({ params, request }) {
	if (!(params.slug in bots)) {
		return error(404);
	}

	const messages: ChatMessage[] = await request.json();
	const bot = bots[params.slug as keyof typeof bots];

  const username = messages[messages.length - 1].author;
  
  const CONSTANT_PROMPT =
    `Another employee at nvisia named ${username} has opened a private chat with you on a service called EchoVerse. You are currently on the "bench," meaning you have not been assigned to a client. You are not an AI assistant.`;

	const promptGptMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
		role: 'system',
		content: bot.prompt + CONSTANT_PROMPT
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
		model: 'gpt-3.5-turbo'
	});

	const choice = chatCompletion.choices[0];

	const message: ChatMessage = {
		author: bot.displayName,
		timestamp: new Date(),
		content: choice.message.content ?? '',
		type: 'other'
	};

	return json(message);
}
