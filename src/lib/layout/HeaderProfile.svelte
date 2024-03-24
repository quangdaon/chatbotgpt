<script>
	import { userName } from '$lib/stores/config';

	let menuOpen = false;

	let signOut = () => {
		$userName = '';
	};

	let toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="profile">
	<button class="badge" on:click={toggleMenu}>
		<div class="username">
			{$userName}
		</div>
		<div class="avatar">
			<img src="/echoverse/profile/generic.png" alt={$userName} />
		</div>
	</button>

	{#if menuOpen}
		<div class="menu">
			<ul>
				<li>
					<button on:click|preventDefault={signOut}>Sign Out</button>
				</li>
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.profile {
		position: relative;
		color: var(--color-white);
	}

	.badge {
		background: transparent;
		border: none;
		display: inline-flex;
		align-items: center;
		gap: 1em;
	}

	.avatar {
		img {
			width: 2em;
			display: block;
			border: 2px solid var(--color-white);
			border-radius: 50%;
		}
	}

	.menu {
		position: absolute;
		right: 0;
		top: 100%;
		margin-top: 1em;
		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			width: 200px;
			background: var(--color-white);
			li {
				width: 100%;
			}
			a,
			button {
				width: 100%;
				color: var(--color-black);
				border: none;
				text-align: left;
				padding: 0.5em;
				&:hover {
					background: rgba(#000, 0.1);
				}
			}
		}
	}
</style>
