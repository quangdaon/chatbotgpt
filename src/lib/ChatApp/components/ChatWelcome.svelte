<div class="chat-welcome">
	<div class="chat-welcome-content">
		<h1>
			Welcome to the
			<picture>
				<source media="(prefers-color-scheme: light)" srcset="/echoverse/logo-color.png" />
				<img src="/echoverse/logo-white.png" alt="EchoVerse Logo" />
			</picture>
		</h1>

		<p>Start a chat by selecting a user on the left.</p>
	</div>
</div>

<style lang="scss">
	.chat-welcome {
		flex: 1 1 0;
		display: flex;
		justify-content: center;
		align-items: center;

		&-content {
			text-align: center;

			h1 {
				img {
					display: block;
					margin: auto;
					width: 40%;
				}
			}

      p {
        font-style: italic;
        margin-top: 3em;
      }
		}
	}
</style>
