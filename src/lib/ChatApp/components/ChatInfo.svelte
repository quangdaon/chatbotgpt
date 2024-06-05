<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import ChatHeader from './ChatHeader.svelte';

	export let bot: Bot;
</script>

<ChatHeader>
	<h1 class="chat-info-name">
		<div class="chat-info-avatar">
			<img src={bot.profilePicture} alt="{bot.name} Avatar" />
		</div>
		{bot.name}
	</h1>
</ChatHeader>

<style lang="scss">
	@use '~/theme';

	.chat-info {
		&-avatar {
			display: inline-block;
			vertical-align: middle;
			margin-right: 0.5em;
			img {
				display: block;
				width: 2em;
				border-radius: 50%;
			}
		}
		&-name {
			margin: 0;
		}
	}
</style>
