<script lang="ts">
	import { userName } from '$lib/stores/config';

	let signOut = () => {
		$userName = '';
	};
</script>

<h1>Hello {$userName}</h1>

<button on:click|preventDefault={signOut}>Sign Out</button>
