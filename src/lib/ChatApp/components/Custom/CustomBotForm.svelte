<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ChatHeader from '../ChatHeader.svelte';
	import type { Bot } from '$lib/models/Bot';
	const dispatch = createEventDispatcher();

	const bot: Bot = {
		type: 'custom',
		id: '',
		name: '',
		profilePicture: '',
		prompt: ''
	};

	const submit = () => {
		bot.id = crypto.randomUUID();
		dispatch('submitted', bot);
	};
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
		<input required id="bot-profile" type="text" bind:value={bot.profilePicture} />
	</div>

	<div class="field">
		<label for="bot-prompt">Prompt</label>
		<textarea required name="bot-prompt" id="bot-prompt" bind:value={bot.prompt}></textarea>
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
		}
	}
</style>
