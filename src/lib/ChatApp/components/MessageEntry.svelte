<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let message = '';

	const dispatch = createEventDispatcher();

	const submit = () => {
		if (!message) return;
		dispatch('submitted', message);
		message = '';
	};

	const handleKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Enter' && !evt.shiftKey) {
			evt.preventDefault();
			submit();
		}
	};
</script>

<form class="message-entry" on:submit={submit}>
	<textarea
		name="entry"
		id="entry"
		bind:value={message}
		on:keydown={handleKeydown}
		placeholder="Enter your message"
	></textarea>
	<div class="message-entry-control">
		<button disabled={!message.trim()}>Send</button>
	</div>
</form>

<style lang="scss">
	.message-entry {
		flex: 0 0 auto;
		background: var(--color-background);
		padding: 1em;
		textarea {
			display: block;
			width: 100%;
			resize: none;
			background: var(--color-gray);
			border: none;
			min-height: 4em;
			padding: 1em;
			margin: 0;
			border-radius: 1em;
			border: 0.25em solid var(--color-primary);
			&:focus {
				outline: none;
			}
		}
		&-control {
			padding: 0.5em;
			margin-top: 0.25em;
			text-align: right;
			button {
				background: var(--color-primary);
				border: none;
				border-radius: 0.25em;
				padding: 0.25em;
				&:disabled {
					opacity: 0.5;
					cursor: default;
				}
			}
		}
	}
</style>
