<script>
	import FooterLinks from './FooterLinks.svelte';
</script>

<footer class="footer">
  <div class="footer-content">
    <FooterLinks />
  </div>
</footer>


<style>
  .footer {
    display: block;
    margin: 2em 0 0;
    width: 100%;
  }
  .footer-content {
    max-width: 1080px;
    padding: 0 1em;
    margin: auto;
  }
</style>