<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import type { Bot } from '$lib/models/Bot';
	import type { ChatMessage } from '$lib/models/ChatMessage';
	import ChatInfo from './ChatInfo.svelte';
	import MessageEntry from './MessageEntry.svelte';
	import Messages from './Messages.svelte';
	import { userName } from '$lib/stores/config';
	import ChatSidebar from './ChatSidebar.svelte';
	import { onMount } from 'svelte';
	import ChatWelcome from './ChatWelcome.svelte';

	let bots: Bot[] = [];
	let bot: Bot;

	let messages: ChatMessage[] = [];

	onMount(async () => {
		const botsCall = await fetch('/echoverse/api/bots');
		bots = await botsCall.json();
	});

	const selectBot = (selectedBot: Bot) => {
		bot = selectedBot;
		messages = [];
	};

	const handleMessage = async ({ detail }: CustomEvent<string>) => {
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
			<ChatSidebar {bots} on:selected={(evt) => selectBot(evt.detail)} />
		</div>

		<div class="chat-app">
			{#if bot}
				<ChatInfo {bot} />
				<Messages {messages} {bot} />
				<MessageEntry on:submitted={handleMessage} />
			{:else}
				<ChatWelcome />
			{/if}
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
