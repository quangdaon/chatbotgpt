<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import { appMode } from '$lib/stores/config';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let bots: Bot[];
</script>

<div class="chat-sidebar">
	<details open>
		<summary>Chats</summary>
		<ul class="bots">
			{#each bots as bot}
				<li class="bot">
					<button on:click={() => dispatch('selected', bot)}>
						<div class="bot-avatar">
							<img src={bot.profilePicture} alt={bot.name} />
						</div>
						<div class="bot-name">
							<span>
								{bot.name}
							</span>
						</div>
					</button>
				</li>
			{/each}
			{#if $appMode === 'dev'}
				<li class="bot">
					<button on:click={() => dispatch('added')}>
						<div class="bot-avatar">
							<span>+</span>
						</div>
						<div class="bot-name">
							<span>Create Bot</span>
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

	.bot {
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
		&-avatar {
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
		&-name {
			flex: 1 1 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
