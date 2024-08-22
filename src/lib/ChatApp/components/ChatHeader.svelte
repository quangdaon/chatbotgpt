<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="chat-header">
	<button class="menu" on:click={() => dispatch('toggled')}>◀</button>
	<slot />
</div>

<style lang="scss">
	@use '~/theme';
	@use '~/breakpoints';

	.chat-header {
		display: flex;
		align-items: center;
		padding: 1em;
		box-shadow: 0 1em 2em rgba(#000, 0.2);
		flex: 0 0 auto;
		max-width: 100%;
		@include theme.light {
			background: var(--color-gray);
			box-shadow: none;
		}
	}

	.menu {
		width: 2em;
		height: auto;
		margin-right: 1em;
		aspect-ratio: 1;
		border-radius: 10em;
		display: flex;
		background: none;
		font-size: 0.75em;
		@include breakpoints.large {
			display: none;
		}
	}
</style>
