<script>
    // import '$lib/styles.css'
    import Navbar from "$lib/Navbar.svelte";
    import Footer from '$lib/Footer.svelte';
    import '../app.css' 

</script>

<div class="app">
    <Navbar />
        <slot />
    <Footer />
</div>
