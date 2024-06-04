import { error, json } from '@sveltejs/kit';
import bots from '$data/bots.json';
import { getPrompt } from '$lib/helpers/open-ai.js';

export function GET({ params, url }) {
	if (!(params.slug in bots)) {
		return error(404);
	}

	const bot = bots[params.slug as keyof typeof bots];
	const username = url.searchParams.get('username') ?? '';

	return json({ prompt: getPrompt(bot, username) });
}
