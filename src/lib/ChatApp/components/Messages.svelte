<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import type { ChatMessage } from '$lib/models/ChatMessage';
	import { tick } from 'svelte';

	export let messages: ChatMessage[];
	export let bot: Bot;

	let messagesElement: HTMLDivElement;

	export const scrollToBottom = () => {
		messagesElement.scrollTo(0, messagesElement.scrollHeight);
	};

	$: if (messages && messagesElement) {
		tick().then(scrollToBottom);
	}
</script>

<div class="messages" bind:this={messagesElement}>
	{#if !messages.length}
		<div class="message-empty">
			<p>This is the beginning of your conversation with {bot.name}. Say hello!</p>
		</div>
	{/if}
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

    &-empty {
      font-style: italic;
      text-align: center;
      font-size: 1em;
      opacity: 0.75;
    }
	}
</style>
