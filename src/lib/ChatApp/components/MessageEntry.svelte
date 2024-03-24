<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let message = '';

	const dispatch = createEventDispatcher();

	const submit = () => {
		dispatch('submitted', message);
		message = '';
	};

	const handleKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Enter' && evt.ctrlKey) {
			evt.preventDefault();
			submit();
		}
	};
</script>

<form class="message-entry" on:submit={submit}>
	<textarea name="entry" id="entry" bind:value={message} on:keydown={handleKeydown}></textarea>
	<div class="message-entry-control">
		<button>Send</button>
	</div>
</form>

<style lang="scss">
	.message-entry {
		flex: 0 0 auto;
		textarea {
			display: block;
			width: 100%;
			resize: none;
			background: var(--color-gray);
			border: none;
			min-height: 200px;
			padding: 1em;
			margin: 0;
			&:focus {
				outline: none;
			}
		}
		&-control {
			background: var(--color-gray);
			padding: 0.5em;
			text-align: right;
			button {
				background: var(--color-primary);
				border: none;
				border-radius: 0.25em;
				padding: 0.25em;
			}
		}
	}
</style>
