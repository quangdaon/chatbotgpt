<script>
	import { userName } from '$lib/stores/config';

</script>

<div class="profile">
	<div class="username">
		{$userName}
	</div>
	<div class="avatar">
		<img src="/echoverse/profile/generic.png" alt={$userName} />
	</div>
</div>


<style lang="scss">
  .profile {
    display: inline-flex;
    align-items: center;
    gap: 1em;
    color: var(--color-white);
  }

  .avatar {
    img {
      width: 2em;
      display: block;
      border: 2px solid var(--color-white);
      border-radius: 50%;
    }
  }
</style>