import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { PUBLIC_OPENAI_SECRET_KEY_HEADER } from '$env/static/public';

export async function GET({ request }) {
	const headers = request.headers;
	const openAiKey = headers.get(PUBLIC_OPENAI_SECRET_KEY_HEADER);

	if (!openAiKey) return json([]);

	const openai = new OpenAI({
		apiKey: headers.get(PUBLIC_OPENAI_SECRET_KEY_HEADER) ?? ''
	});

	const response = await openai.models.list();
	const models = response.data
		.filter(
			(e) => e.owned_by === 'openai' || e.owned_by === 'system' || e.owned_by.startsWith('user-')
		)
		.sort((a, b) => a.created - b.created)
		.map((e) => e.id);

	return json(models);
}
