<script lang="ts">
	import { base } from '$app/paths';
	import FooterLinks from '$lib/layout/FooterLinks.svelte';
	import { userName } from '$lib/stores/config';

	let inputName: string;

	let saveName = () => {
		$userName = inputName;
	};
</script>

<main class="splash">
	<div class="splash-content">
		<h1>Welcome!</h1>

		<form on:submit|preventDefault={() => saveName()}>
			<div class="field" class:focused={!!inputName}>
				<label for="name">What is your name?</label>
				<input id="name" type="text" bind:value={inputName} required />
			</div>
			<button>
				<span>Enter the</span> <img src="{base}/logo-white.png" alt="EchoVerse" />
			</button>
		</form>

		<footer class="footer">
			<FooterLinks />
		</footer>
	</div>
</main>

<style lang="scss">
	@use '~/breakpoints';

	.splash {
		background: var(--color-dark);
		color: var(--color-white);
		text-align: center;
		display: flex;
		height: 100vh;
		justify-content: center;
		&-content {
			margin-top: 5em;
		}
	}

	h1 {
		font-size: 2em;
		margin-bottom: 0.25em;
		text-transform: uppercase;
		@include breakpoints.large {
			font-size: 4em;
		}
	}

	.field {
		font-size: 1.5em;
		width: fit-content;
		margin: 1em auto;
		position: relative;
		@include breakpoints.large {
			font-size: 2em;
		}

		label {
			display: block;
			background: transparent;
			bottom: 0.25em;
			left: 0.125em;
			padding: 0 0.5em;
			position: absolute;
			transition: 200ms;
			pointer-events: none;
		}

		input {
			display: block;
			padding: 0.25em 0.5em;
			background: none;
			border: 0.125em solid var(--color-primary);
			border-radius: 0.25em;
			&:focus {
				outline: none;
			}
		}

		&.focused,
		&:focus-within {
			label {
				font-size: 0.5em;
				background: var(--color-dark);
				bottom: calc(100% - 0.5em);
				left: 0.75em;
			}
		}
	}

	button {
		background: var(--color-primary);
		padding: 0.25em 0.5em;
		border: none;
		font-size: 1.2em;
		color: #fff;
		font-family: var(--font-heading);
		border-radius: 0.25em;
		margin-bottom: 1em;
		@include breakpoints.large {
			font-size: 2em;
		}
		span,
		img {
			display: inline-block;
			vertical-align: middle;
		}
		img {
			height: 1em;
			margin-left: 0.25em;
		}
	}
</style>
