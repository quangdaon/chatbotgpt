<script lang="ts">
	import type { Bot } from '$lib/models/Bot';

	let bot: Bot = {
		name: 'Jack Sparrow',
		profilePicture: '/echoverse/profile/generic.png'
	};
</script>

<div class="chat-info">
	<h1 class="chat-info-name">
		<div class="chat-info-avatar">
			<img src={bot.profilePicture} alt="{bot.name} Avatar" />
		</div>
		{bot.name}
	</h1>
</div>

<style lang="scss">
  @use '~/theme';

	.chat-info {
		padding: 1em;
    box-shadow: 0 1em 2em rgba(#000, 0.2);
		&-avatar {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5em;
			img {
        display: block;
				width: 2em;
			}
		}
		&-name {
			margin: 0;
		}
    @include theme.light {
      background: var(--color-gray);
      box-shadow: none;
    }
	}
</style>
