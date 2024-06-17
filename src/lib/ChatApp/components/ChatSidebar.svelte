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
			{#if $appMode === 'dev'}
				<li class="btn">
					<button on:click={() => dispatch('added')}>
						<div class="btn-icon">
							<span>+</span>
						</div>
						<div class="btn-label">
							<span>Create Bot</span>
						</div>
					</button>
				</li>
				<li class="btn">
					<button on:click={() => dispatch('resetted')}>
						<div class="btn-icon">
							<span>&#x21bb;</span>
						</div>
						<div class="btn-label">
							<span>Reset Bots</span>
						</div>
					</button>
				</li>
			{/if}
		</ul>
	</details>
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

	.btn {
		button {
			padding: 1em;
			background: none;
			border: none;
			display: flex;
			width: 100%;
			max-width: 20vw;
			text-align: left;
			gap: 0.5em;
			align-items: center;
			&:hover {
				background: rgba(#000, 0.2);
			}
		}
		&-icon {
			flex: 0 0 auto;
			background: rgba(#000, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2em;
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
			}
		}
		&-label {
      color: var(--color-foreground);
		}
	}
</style>
