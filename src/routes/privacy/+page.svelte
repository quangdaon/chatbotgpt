<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	const effectiveDate = new Date(2024, 3, 25);
</script>

<svelte:head>
	<title>EchoVerse - Privacy Policy</title>
</svelte:head>

<Header />

<main class="copy">
	<h1>Privacy Policy</h1>
	<p class="policy-effective"><b>Effective Date:</b> {effectiveDate.toLocaleDateString()}</p>

	<p>
		Although EchoVerse is not a real chatting service, it is still important that you are aware of
		how your information is collected and used.
	</p>

	<h2>Personal Information / Data</h2>

	<p>
		EchoVerse collects your name to optimize the simulated chatting experience. This information is
		stored locally in your browser and is sent to OpenAI. It is not stored on EchoVerse servers.
	</p>

	<h2>Conversations & Messages</h2>

	<p>
		This application stores all chats and their corresponding messages to your browser's local
		storage. These chats are sent to OpenAI to be completed. These conversations are not retained by
		EchoVerse.
	</p>

	<h2>OpenAI</h2>

	<p>
		The chatbots in this application are powered by OpenAI. Any information you send in the chat
		will be sent to and processed by OpenAI. Their privacy policy can be found here: <a
			href="https://openai.com/policies/privacy-policy"
			>https://openai.com/policies/privacy-policy</a
		>.
	</p>

	<h2>Policy Changes</h2>

	<p>
		This privacy policy may be subject to change. Any changes will be posted to this page.
	</p>

	<h2>Contact</h2>

	<p>For any questions regarding this policy, contact me at <a href="mailto:me@quangdao.com">me@quangdao.com</a>.</p>
</main>

<Footer />
