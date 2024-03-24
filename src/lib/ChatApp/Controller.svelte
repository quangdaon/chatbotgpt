<script>
	import { userName } from '$lib/stores/config';
	import Chat from './components/Chat.svelte';
	import Splash from './components/Splash.svelte';
</script>

{#if $userName}
	<Chat />
{:else}
	<Splash />
{/if}
