<div class="chat-header">
	<slot />
</div>

<style lang="scss">
	@use '~/theme';

	.chat-header {
		padding: 1em;
		box-shadow: 0 1em 2em rgba(#000, 0.2);
		flex: 0 0 auto;
		@include theme.light {
			background: var(--color-gray);
			box-shadow: none;
		}
	}
</style>
