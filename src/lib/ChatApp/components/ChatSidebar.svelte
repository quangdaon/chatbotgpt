<script lang="ts">
	import type { Bot } from '$lib/models/Bot';
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

	export let bots: Bot[];
</script>

<div class="chat-sidebar">
	<details open>
		<summary>Chats</summary>
		<ul class="bots">
			{#each bots as bot}
				<li class="bot">
					<button on:click={() => dispatch('selected', bot)}>
						<div class="bot-avatar">
							<img src={bot.profilePicture} alt={bot.name} />
						</div>
						<div class="bot-name">
							{bot.name}
						</div>
					</button>
				</li>
			{/each}
		</ul>
	</details>
</div>

<style lang="scss">
  @use '~/theme';
	.chat-sidebar {
		height: 100%;
		background-color: var(--color-mid);
    @include theme.light {
      background-color: var(--color-white);
      border-right: 0.25em solid var(--color-mid);
    }
	}

	details {
		font-size: 1.2em;
	}

	summary {
		padding: 0.5em;
		cursor: pointer;
    font-size: 1.2em;
	}

	.bots {
		list-style-type: none;
		padding: 0;
    margin: 0;
	}

	.bot {
		button {
			padding: 1em;
			background: none;
			border: none;
			display: block;
			width: 100%;
			text-align: left;
			&:hover {
				background: rgba(#000, 0.2);
			}
		}
    &-avatar {
      margin-right: 0.5em;
      img {
        width: 2em;
        display: block;
        border-radius: 50%;
      }
    }
    &-avatar, &-name {
      display: inline-block;
      vertical-align: middle;
    }
	}
</style>
