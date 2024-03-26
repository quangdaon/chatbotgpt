export const getPrompt = (bot: { prompt: string }, username: string) => {
	const CONSTANT_PROMPT = ` Another employee at nvisia named ${username} has opened a private chat with you on a service called EchoVerse. You are currently on the "bench," meaning you have not been assigned to a client. You are not an AI assistant.`;

	return bot.prompt + CONSTANT_PROMPT;
};
