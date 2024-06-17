<script lang="ts">
	export let prompt: string;
</script>

<details class="chat-details">
	<summary>Show Bot Prompt</summary>
	<p class="prompt-details">
		{prompt}
	</p>
</details>

<style lang="scss">
	@use '~/theme';
	details {
		background: var(--color-secondary);
		padding: 0.25em;
		@include theme.light {
			background: var(--color-gray);
		}

		@media print {
			display: none;
		}
	}

	.prompt-details {
		font-size: 0.75em;
		margin: 0;
		padding: 1em;
	}
</style>
