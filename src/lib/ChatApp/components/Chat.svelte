<script lang="ts">
	import Footer from '$lib/layout/Footer.svelte';
import Header from '$lib/layout/Header.svelte';
	import { userName } from '$lib/stores/config';

	let signOut = () => {
		$userName = '';
	};
</script>

<Header />

<h1>Hello {$userName}</h1>

<button on:click|preventDefault={signOut}>Sign Out</button>
