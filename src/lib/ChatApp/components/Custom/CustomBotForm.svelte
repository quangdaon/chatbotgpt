<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import ChatHeader from '../ChatHeader.svelte';
	import type { Bot } from '$lib/models/Bot';
	import { base } from '$app/paths';
	import { openAiKey } from '$lib/stores/config';
	import { PUBLIC_OPENAI_SECRET_KEY_HEADER } from '$env/static/public';
	const dispatch = createEventDispatcher();

	const defaultBotModel = 'gpt-3.5-turbo';

	let imgPreview: HTMLImageElement;
	let upload: HTMLInputElement;
	let imgUrl: HTMLInputElement;

	let botId: string = crypto.randomUUID();
	let botName: string;
	let botAvatarUrl: string;
	let botPrompt: string;
	let botModels: string[];
	let botModel: string;
	let botTemp: number = 0.2;
	let useUpload = false;
	let loading = true;

	onMount(async () => {
		const resp = await fetch(`${base}/api/models`, {
			headers: {
				[PUBLIC_OPENAI_SECRET_KEY_HEADER]: $openAiKey
			}
		});
		botModels = await resp.json();
		botModel = botModel || defaultBotModel;
		loading = false;
	});

	const handleTextAreaKeypress = (e: KeyboardEvent) => {
		console.log(e.key);
		if (tempPrompt && e.key === 'Tab') {
			e.preventDefault();
			botPrompt = tempPrompt;
		}
	};

	const submit = () => {
		const bot: Bot = {
			id: botId,
			name: botName,
			profilePicture: getBase64Image(),
			model: botModel,
			temperature: botTemp,
			prompt: botPrompt
		};

		if (!bot.prompt) bot.prompt = tempPrompt;
		bot.profilePicture = getBase64Image();
		dispatch('submitted', bot);
	};

	function getBase64Image() {
		var canvas = document.createElement('canvas');
		const ratio = imgPreview.width / imgPreview.height;
		canvas.width = 128;
		canvas.height = 128;
		const imageWidth = ratio < 1 ? 128 : imgPreview.width * (128 / imgPreview.height);
		const imageHeight = ratio > 1 ? 128 : imgPreview.height * (128 / imgPreview.width);

		var ctx = canvas.getContext('2d');
		ctx?.drawImage(imgPreview, 0, 0, imageWidth, imageHeight);

		var dataURL = canvas.toDataURL('image/png');

		return dataURL;
	}

	function onFileChange() {
		const file = upload.files ? upload.files[0] : null;

		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				botAvatarUrl = reader.result?.toString() ?? '';
			});
			reader.readAsDataURL(file);

			return;
		}
	}

	export const resetBotData = (botIn: Bot | null = null) => {
		botId = botIn?.id ?? crypto.randomUUID();
		botName = botIn?.name ?? '';
		botAvatarUrl = botIn?.profilePicture ?? '';
		botPrompt = botIn?.prompt ?? '';
		botModel = botIn?.model || defaultBotModel;
		botTemp = botIn?.temperature ?? 0.2;

		useUpload = !botIn;
	};

	$: tempPrompt = botName ? `You are ${botName}.` : '';
</script>

<ChatHeader on:toggled>
	<h1>Build Your Own Bot</h1>
</ChatHeader>

<form on:submit|preventDefault={submit} class="form">
	<div class="field">
		<label for="bot-name">Name</label>
		<input required id="bot-name" type="text" bind:value={botName} />
	</div>

	{#if useUpload}
		<div class="field">
			<label for="bot-upload">Upload</label>
			<input
				id="bot-upload"
				type="file"
				bind:this={upload}
				on:change={onFileChange}
				accept="image/*"
			/>
			<div class="avatar-toggle">
				<button on:click={() => (useUpload = false)}>Enter URL Instead</button>
			</div>
		</div>
	{:else}
		<div class="field">
			<label for="bot-profile">Profile Picture URL</label>
			<input required id="bot-profile" type="text" bind:this={imgUrl} bind:value={botAvatarUrl} />
			<div class="avatar-toggle">
				<button on:click={() => (useUpload = true)}>Upload Image Instead</button>
			</div>
		</div>
	{/if}

	{#if botAvatarUrl}
		<div>
			<p>Image Preview:</p>
			<div class="avatar-preview">
				<img
					bind:this={imgPreview}
					src={botAvatarUrl}
					alt="Preview of avatar"
					crossOrigin="anonymous"
					on:error={() => imgUrl?.setCustomValidity('Unable to load image.')}
					on:load={() => imgUrl?.setCustomValidity('')}
				/>
			</div>
		</div>
	{/if}

	{#if botModels?.length}
		<div class="field">
			<label for="bot-model">Model</label>
			<select name="bot-model" id="bot-model" bind:value={botModel}>
				{#each botModels as model}
					<option>{model}</option>
				{/each}
			</select>
		</div>
	{/if}

	<div class="field">
		<label for="bot-temperature">Temperature</label>
		<div class="field-range">
			<input type="range" bind:value={botTemp} min="0" max="2" step="0.1" />
			<span>
				{botTemp}
			</span>
		</div>
	</div>

	<div class="field">
		<label for="bot-prompt">Prompt</label>
		<textarea
			name="bot-prompt"
			id="bot-prompt"
			placeholder={tempPrompt}
			on:keydown={(e) => handleTextAreaKeypress(e)}
			bind:value={botPrompt}
		/>
	</div>

	<div>
		<button type="submit" disabled={loading}>Do the Magic</button>
	</div>
</form>

<style lang="scss">
	@use '~/breakpoints';
	h1 {
		font-size: 1.5em;
		margin: 0;

		@include breakpoints.large {
			font-size: 2em;
		}
	}

	.form {
		padding: 1em;
		.avatar-toggle {
			margin-top: 1em;
		}
		.avatar-preview {
			width: 5em;
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;
			margin: 1em 0;
			img {
				width: 100%;
				aspect-ratio: 1;
				// object-fit: cover;
				display: block;
			}
		}
	}
</style>
