<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import { appMode } from '$lib/stores/config';
	import { createEventDispatcher } from 'svelte';
	import ChatSidebarBot from './ChatSidebarBot.svelte';

	const dispatch = createEventDispatcher();

	export let bots: Bot[];
</script>

<div class="chat-sidebar">
	<details open>
		<summary>Chats</summary>
		<ul class="bots">
			{#each bots as bot}
				<li class="bot">
					<ChatSidebarBot {bot} on:selected on:editted on:deleted />
				</li>
			{/each}
		</ul>
	</details>
	{#if $appMode === 'dev'}
		<ul class="controls">
			<li class="control">
				<button on:click={() => dispatch('added')}>Create Bot</button>
			</li>
			<li class="control">
				<button on:click={() => dispatch('resetted')}>Restore Defaults Bots</button>
			</li>
		</ul>
	{/if}
</div>

<style lang="scss">
	@use '~/theme';
	.chat-sidebar {
		height: 100%;
		background-color: var(--color-mid);
		@include theme.light {
			background-color: var(--color-white);
			border-right: 0.25em solid var(--color-mid);
		}
	}

	details {
		font-size: 1.2em;
	}

	summary {
		padding: 0.5em;
		cursor: pointer;
		font-size: 1.2em;
	}

	.bots {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.controls {
		list-style-type: none;
		padding: 0;
		font-size: 1.2em;
	}

	.control {
		button {
			padding: 0.5em 1em;
			background: none;
			border: none;
			display: flex;
			width: 100%;
			max-width: 20vw;
			text-align: left;
			gap: 0.5em;
			align-items: center;
			color: var(--color-foreground);
			&:hover {
				background: rgba(#000, 0.2);
			}
		}
	}
</style>
