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

	$: firstName = bot.name.split(' ')[0];
</script>

<div class="messages" bind:this={messagesElement}>
	{#if !messages.length}
		<div class="message-empty">
			<p>This is the beginning of your conversation with {firstName}. Say hello!</p>
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

		@media only screen {
			overflow-y: scroll;
		}
	}

	.message {
		background: black;
		border-radius: 1em;
		padding: 1em;
		width: fit-content;
		max-width: 95%;

		@media print {
			width: 90%;
			background-color: transparent;
			padding: 0;
		}

		@include breakpoints.large {
			max-width: 66%;
		}

		&-row {
			width: 100%;
			margin: 2em 0;

			@media print {
				margin: 1em 0;
			}
		}

		&-other {
			background: var(--color-gray);
			border-bottom-left-radius: 0;
			@media print {
				background-color: transparent;
			}
		}

		&-self {
			margin-left: auto;
			background: var(--color-primary);
			color: var(--color-white);
			border-bottom-right-radius: 0;
			text-align: right;

			@media print {
				text-align: right;
				background-color: transparent;
			}

			@include breakpoints.large {
				text-align: left;
			}
		}

		&-info {
			display: none;
			font-size: 0.875em;
			margin-bottom: 1em;

			@include breakpoints.large {
				display: block;
			}
		}

		&-author {
			display: inline-block;
		}

		&-time {
			font-size: 0.875em;
			display: block;

			@include breakpoints.large {
				display: inline-block;
				margin-left: 0.5em;
			}
		}

		&-content {
			white-space: pre-wrap;

			@media print {
				margin-top: 0;
			}
		}

		&-empty {
			font-style: italic;
			text-align: center;
			font-size: 1em;
			opacity: 0.75;
		}
	}
</style>
