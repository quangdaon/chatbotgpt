<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import ChatInfo from './ChatInfo.svelte';
	import MessageEntry from './MessageEntry.svelte';
	import Messages from './Messages.svelte';
	import { userName } from '$lib/stores/config';
	import ChatSidebar from './ChatSidebar.svelte';
	import { onMount } from 'svelte';
	import ChatWelcome from './ChatWelcome.svelte';
	import { ChatEngine } from '../core/ChatEngine';
	import { readable } from 'svelte/store';

	const engine = new ChatEngine();

	onMount(async () => {
		await engine.init();
	});

	const handleMessage = async ({ detail }: CustomEvent<string>) => {
		$context?.addMessage({
			author: $userName,
			type: 'self',
			content: detail,
			timestamp: new Date()
		});
	};

	$: bots = engine.bots;
	$: context = engine.activeContext;
	$: bot = $context?.bot;
	$: state = engine.state;
	$: messages = $context?.messages || readable([]);

	$: engine.user = $userName;
</script>

<main class="app">
	<Header />

	<div class="body">
		<div class="sidebar">
			<ChatSidebar bots={$bots} on:selected={(evt) => engine.selectBot(evt.detail)} />
		</div>

		<div class="chat-app">
			{#if $state === 'ready' && bot}
				<ChatInfo {bot} />
				<Messages messages={$messages} {bot} />
				<MessageEntry on:submitted={handleMessage} />
			{:else}
				<ChatWelcome state={$state} />
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
