<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import ChatInfo from './ChatInfo.svelte';
	import MessageEntry from './MessageEntry.svelte';
	import Messages from './Messages.svelte';
	import { appMode, userName } from '$lib/stores/config';
	import ChatSidebar from './ChatSidebar.svelte';
	import { onMount, tick } from 'svelte';
	import ChatWelcome from './ChatWelcome.svelte';
	import { ChatEngine } from '../core/ChatEngine';
	import { readable } from 'svelte/store';
	import ChatPrompt from './ChatPrompt.svelte';
	import { appState } from '$lib/stores/appState';
	import CustomBotForm from './Custom/CustomBotForm.svelte';
	import type { Bot } from '$lib/models/Bot';

	const engine = new ChatEngine();
	let customBotForm: CustomBotForm;
	let botToEdit: Bot | null = null;

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

	const resetContext = () => {
		if (!confirm('Are you sure? This resets the bot and cannot be undone.')) return;
		$context?.clear();
	};

	const addBot = async (bot: Bot) => {
		await engine.addBot(bot);
		$appState = 'chatting';
	};

	const editBot = async (bot: Bot | null = null) => {
		botToEdit = bot;
		$appState = 'custom';
		await tick();
		customBotForm.resetBotData(bot);
	};

	$: bots = engine.bots;
	$: context = engine.activeContext;
	$: bot = $context?.bot;
	$: prompt = $context?.prompt;
	$: messages = $context?.messages || readable([]);
	$: downloadHref =
		'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify($messages));

	$: engine.user = $userName;

	$: if ($appMode === 'immersive' && $appState === 'custom') {
		$appState = 'chatting';
	}
</script>

<main class="app">
	<Header />

	<div class="body">
		<div class="sidebar">
			<ChatSidebar
				bots={$bots}
				on:selected={(evt) => engine.selectBot(evt.detail)}
				on:deleted={(evt) => engine.deleteBot(evt.detail)}
				on:editted={(evt) => editBot(evt.detail)}
				on:resetted={() => engine.resetBots()}
				on:added={() => editBot()}
			/>
		</div>

		<div class="chat-app">
			{#if $appState === 'custom'}
				<CustomBotForm bind:this={customBotForm} on:submitted={({ detail }) => addBot(detail)} />
			{:else if $appState === 'chatting' && bot}
				<ChatInfo {bot} />
				{#if $appMode === 'dev'}
					<ChatPrompt prompt={$prompt || ''} />
				{/if}
				<Messages messages={$messages} {bot} />
				<MessageEntry on:submitted={handleMessage} on:reset={resetContext}>
					<svelte:fragment slot="actions">
						{#if $appMode === 'dev'}
							<a
								class="button"
								href={downloadHref}
								type="application/json"
								download={`${bot.id}.json`}>Export JSON</a
							>
							<button type="button" on:click={resetContext}>Reset Bot</button>
						{/if}
					</svelte:fragment>
				</MessageEntry>
			{:else}
				<ChatWelcome state={$appState} />
			{/if}
		</div>
	</div>
</main>

<style lang="scss">
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

		@media print {
			display: none;
			flex: 0;
		}
	}

	.chat-app {
		flex: 1 1 auto;
		grid-area: content;
		display: flex;
		flex-direction: column;
		justify-content: stretch;

		@media print {
			width: 100%;
		}
	}
</style>
