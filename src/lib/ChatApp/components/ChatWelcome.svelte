<script lang="ts">
	import { base } from '$app/paths';
	import type { AppState } from '$lib/stores/appState';

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
			<p>Start a chat by selecting a user on the left.</p>
		{/if}
	</div>
</div>

<style lang="scss">
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
					width: 40%;
				}
			}

			p {
				font-style: italic;
				margin-top: 3em;
			}
		}
	}
</style>
