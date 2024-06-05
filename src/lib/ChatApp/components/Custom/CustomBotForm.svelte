<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ChatHeader from '../ChatHeader.svelte';
	import type { BotCustom } from '$lib/models/Bot';
	const dispatch = createEventDispatcher();

	const bot: BotCustom = {
		type: 'custom',
		id: '',
		name: '',
		profilePicture: '',
		prompt: ''
	};

	const submit = () => {
		bot.id = crypto.randomUUID();
		if (!bot.prompt) bot.prompt = tempPrompt;
		dispatch('submitted', bot);
	};

	$: tempPrompt = bot.name ? `You are ${bot.name}.` : '';
</script>

<ChatHeader>
	<h1>Build Your Own Bot</h1>
</ChatHeader>

<form on:submit|preventDefault={submit} class="form">
	<div class="field">
		<label for="bot-name">Name</label>
		<input required id="bot-name" type="text" bind:value={bot.name} />
	</div>

	<div class="field">
		<label for="bot-profile">Profile Picture URL</label>
		<input required id="bot-profile" type="url" bind:value={bot.profilePicture} />
	</div>

	{#if bot.profilePicture}
		<div>
			<p>Image Preview:</p>
			<div class="avatar-preview">
				<img src={bot.profilePicture} alt="Preview of avatar" />
			</div>
		</div>
	{/if}

	<div class="field">
		<label for="bot-prompt">Prompt</label>
		<textarea name="bot-prompt" id="bot-prompt" placeholder={tempPrompt} bind:value={bot.prompt}
		></textarea>
	</div>

	<div>
		<button type="submit">Do the Magic</button>
	</div>
</form>

<style lang="scss">
	h1 {
		margin: 0;
	}

	.form {
		padding: 1em;
		.field {
			margin-bottom: 1em;
			label {
				display: block;
				margin-bottom: 0.5em;
			}
			textarea {
				min-width: 300px;
				min-height: 300px;
				width: 800px;
				max-width: min(800px, 90%);
			}
		}
		.avatar-preview {
			width: 5em;
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;
			margin: 1em 0;
			img {
				width: 100%;
				display: block;
			}
		}
	}
</style>
