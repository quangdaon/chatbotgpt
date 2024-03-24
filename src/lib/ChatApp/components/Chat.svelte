<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import ChatInfo from './ChatInfo.svelte';
	import Messages from './Messages.svelte';
</script>

<Header />

<div class="chat-app">
	<ChatInfo />
	<Messages />
</div>