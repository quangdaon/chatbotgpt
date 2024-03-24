<script lang="ts">
	import type { ChatMessage } from '$lib/models/ChatMessage';

	export let messages: ChatMessage[];
</script>

<div class="messages">
	{#each messages as message}
		<div class="message-row">
			<div class="message message-{message.type}">
				<div class="message-info">
					<b class="message-author">{message.author}</b>
					<span class="message-time">{message.timestamp.toLocaleString()}</span>
				</div>
				<div class="message-content">{message.content}</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '~/breakpoints';

	.messages {
		padding: 1em;
		flex: 1 1 0;
		overflow-y: scroll;
	}

	.message {
		background: black;
		flex: 0 0 66%;
		padding: 1em;
		border-radius: 1em;
		&-row {
			width: 100%;
			display: flex;
			margin: 2em 0;
		}

		&-other {
			background: var(--color-gray);
		}

		&-self {
			margin-left: auto;
			background: var(--color-primary);
			color: var(--color-white);
		}

		&-info {
			font-size: 0.875em;
		}

		&-author {
			display: inline-block;
		}

		&-time {
			font-size: 0.875em;
			display: inline-block;
			margin-left: 0.5em;
		}

		&-content {
			margin-top: 1em;
			white-space: pre-wrap;
		}
	}
</style>
