<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import type { Bot } from '$lib/models/Bot';
	import type { ChatMessage } from '$lib/models/ChatMessage';
	import ChatInfo from './ChatInfo.svelte';
	import MessageEntry from './MessageEntry.svelte';
	import Messages from './Messages.svelte';
	import { userName } from '$lib/stores/config';
	import ChatSidebar from './ChatSidebar.svelte';

	let bots: Bot[] = [
		{
			name: 'Jack Sparrow',
			profilePicture: '/echoverse/profile/generic.png'
		},
		{
			name: 'Oswald Copperpot',
			profilePicture: '/echoverse/profile/generic.png'
		}
	];

	let bot: Bot = bots[0];

	let messages: ChatMessage[] = [
		{
			author: $userName,
			type: 'self',
			content: 'This is a fake message.',
			timestamp: new Date(2024, 2, 24, 16, 24, 17)
		},
		{
			author: 'Jack Sparrow',
			type: 'other',
			content: 'This is a fake message.',
			timestamp: new Date(2024, 2, 24, 16, 25, 18)
		}
	];

	const handleMessage = ({ detail }: CustomEvent<string>) => {
		messages = [
			...messages,
			{
				author: $userName,
				type: 'self',
				content: detail,
				timestamp: new Date()
			}
		];
	};
</script>

<main class="app">
	<Header />

	<div class="body">
		<div class="sidebar">
			<ChatSidebar {bots} />
		</div>

		<div class="chat-app">
			<ChatInfo {bot} />
			<Messages {messages} />
			<MessageEntry on:submitted={handleMessage} />
		</div>
	</div>
</main>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.app :global(.header) {
		flex: 0 0 auto;
	}

	.body {
		display: flex;
		flex: 1 1 0;
	}

	.sidebar {
		flex: 0 0 20%;
	}

	.chat-app {
		flex: 1 1 auto;
		grid-area: content;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}
</style>
