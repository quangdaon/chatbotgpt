<script lang="ts">
	import { base } from '$app/paths';
	import type { AppState } from '$lib/stores/appState';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let state: AppState;
</script>

<div class="chat-welcome">
	<div class="chat-welcome-content">
		<h1>
			Welcome to the
			<picture>
				<source media="(prefers-color-scheme: light)" srcset="{base}/logo-color.png" />
				<img src="{base}/logo-white.png" alt="EchoVerse Logo" />
			</picture>
		</h1>

		{#if state == 'loading'}
			<h3>Loading...</h3>
		{:else}
			<div class="message-desktop">
				<p>Start a chat by selecting a user on the left.</p>
			</div>
			<div class="message-mobile">
				<button on:click={() => dispatch('toggled')}>Open a Chat</button>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '~/breakpoints';
	.chat-welcome {
		flex: 1 1 0;
		display: flex;
		justify-content: center;
		align-items: center;

		&-content {
			text-align: center;

			h1 {
				img {
					display: block;
					margin: auto;
					width: 90%;
					@include breakpoints.large {
						width: 40%;
					}
				}
			}

			p {
				font-style: italic;
				margin-top: 3em;
			}
		}

		.message-desktop {
			display: none;
		}

		.message-mobile {
			font-size: 2em;
			@include breakpoints.large {
				display: none;
			}
		}
	}
</style>
