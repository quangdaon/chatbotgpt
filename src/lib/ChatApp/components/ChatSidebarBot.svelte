<script lang="ts">
	import { clickOutside } from '$lib/directives/clickOutside';
	import type { Bot } from '$lib/models/Bot';
	import { appMode } from '$lib/stores/config';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let bot: Bot;

	let menuOpen = false;

	const emitEdit = () => {
		dispatch('editted', bot);
		menuOpen = false;
	};

	const emitDelete = () => {
		dispatch('deleted', bot);
		menuOpen = false;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bot" class:bot-dev={$appMode === 'dev'} on:mouseleave={() => (menuOpen = false)}>
	<button class="bot-button" on:click={() => dispatch('selected', bot)}>
		<div class="bot-avatar">
			<img src={bot.profilePicture} alt={bot.name} />
		</div>
		<div class="bot-name">
			<span>
				{bot.name}
			</span>
		</div>
	</button>
	{#if $appMode === 'dev'}
		<div class="bot-toggle">
			<button
				on:click|preventDefault={() => {
					menuOpen = true;
				}}>&vellip;</button
			>
		</div>
		{#if menuOpen}
			<div class="bot-menu" use:clickOutside on:click_outside={() => (menuOpen = false)}>
				<ul>
					<li><button on:click={emitEdit}>Edit</button></li>
					<li><button on:click={emitDelete}>Delete</button></li>
				</ul>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.bot {
		position: relative;
		&-dev {
			.bot-button {
				padding-right: 3em;
			}
		}
		&-button {
			padding: 1em;
			background: none;
			border: none;
			display: flex;
			width: 100%;
			max-width: 20vw;
			text-align: left;
			gap: 0.5em;
			align-items: center;
		}
		&:hover {
			background: rgba(#000, 0.2);
		}
		&-avatar {
			flex: 0 0 auto;
			background: rgba(#000, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2em;
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
			}
		}
		&-name {
			flex: 1 1 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
      color: var(--color-foreground);
		}
		&-toggle {
			position: absolute;
			right: 0.5em;
			top: 50%;
			transform: translateY(-50%);
			button {
				aspect-ratio: 1;
				width: 2em;
				background: none;
				border-radius: 50%;
        color: var(--color-foreground);
				&:hover {
					background: rgba(#000, 0.5);
				}
			}
		}
		&-menu {
			position: absolute;
			z-index: 2;
			right: 0.5em;
			top: calc(100% - 0.5em);
			ul {
				list-style-type: none;
				background: var(--color-primary);
				padding: 0;
				border-radius: 0.5em;
				overflow: hidden;
				li {
					margin: 0;
					button {
						border-radius: 0;
						text-align: left;
						width: 100%;
						padding: 0.5em;
						&:hover {
							background: rgba(#000, 0.1);
						}
					}
				}
			}
		}
	}
</style>
