<script lang="ts">
	import { appMode } from '$lib/stores/config';
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
		<slot name="actions" />
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
			min-height: 4em;
			padding: 1em;
			margin: 0;
			&:focus {
				outline: none;
			}
		}
		&-control {
			padding: 0.5em;
			margin-top: 0.25em;
			text-align: right;
		}
		@media print {
			display: none;
		}
	}
</style>
