<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import ChatHeader from './ChatHeader.svelte';

	export let bot: Bot;
</script>

<ChatHeader on:toggled>
	<h1 class="chat-info-name">
		<div class="chat-info-avatar">
			<img src={bot.profilePicture} alt="{bot.name} Avatar" />
		</div>
		{bot.name}
	</h1>
</ChatHeader>

<style lang="scss">
	@use '~/theme';
	@use '~/breakpoints';

	.chat-info {
		&-avatar {
			display: inline-block;
			vertical-align: middle;
			margin-right: 0.5em;
			img {
				display: block;
				width: 1.5em;
				border-radius: 50%;
				@include breakpoints.large {
					width: 2em;
				}
			}
		}
		&-name {
			flex: 1 1 0;
			margin: 0;
			font-size: 1em;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			@media print {
				font-size: 1.5em;
			}
			@include breakpoints.large {
				font-size: 2em;
			}
		}
	}
</style>
