export const getPrompt = (bot: { prompt: string }, username: string) => {
	const CONSTANT_PROMPT = ` A user named ${username} has opened a private chat with you on a service called EchoVerse.`;

	return bot.prompt + CONSTANT_PROMPT;
};
