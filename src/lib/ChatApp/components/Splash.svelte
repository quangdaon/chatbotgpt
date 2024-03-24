<script lang="ts">
	import Footer from '$lib/layout/Footer.svelte';
	import { userName } from '$lib/stores/config';

	let inputName: string;

	let saveName = () => {
		$userName = inputName;
	};
</script>

<h1>Welcome!</h1>

<form on:submit|preventDefault={() => saveName()}>
	<div class="field">
		<label for="name">What is your name?</label>
		<input id="name" type="text" bind:value={inputName} required />
	</div>
	<button>Enter the EchoVerse</button>
</form>

<Footer />
