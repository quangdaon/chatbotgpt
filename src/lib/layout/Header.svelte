<script>
	import { base } from '$app/paths';
	import { userName } from '$lib/stores/config';
	import HeaderProfile from './HeaderProfile.svelte';
</script>

<header class="header">
	<div class="home">
		<a href="{base || '/'}">
			<img src="{base}/logo-white.png" alt="EchoVerse Logo" />
		</a>
	</div>

	{#if $userName}
		<HeaderProfile />
	{/if}
</header>

<style lang="scss">
  @use '~/breakpoints';

	.header {
		display: flex;
		padding: 1em;
		background: var(--color-primary);
		justify-content: space-between;
		align-items: center;
	}

	.home {
		img {
			display: block;
			height: 1.5em;
			width: auto;
			@include breakpoints.large {
				height: 2.2em;
			}
		}
	}
</style>
