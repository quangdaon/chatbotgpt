<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { openAiKey } from '$lib/stores/config';
</script>


<svelte:head>
	<title>Settings</title>
</svelte:head>

<Header />

<main class="copy">
  <h1>Settings</h1>

  <h3>Custom Open AI Secret Key</h3>

  <p>
    <b>Warning:</b> This is an experimental feature that was created because Quangdao was too cheap to allow free access to all models for custom bots. A key entered here will be stored in plaintext in local storage and sent unencrypted as a header to the EchoVerse API. While it isn't stored on EchoVerse servers, user discretion is still advised.
  </p>

  
  <div class="field">
    <label for="open-ai-key">Open AI Key</label>
    <input required id="open-ai-key" type="password" bind:value={$openAiKey} />
  </div>
</main>

<Footer />