<script>
    import '$lib/styles.css'

    import Navbar from "$lib/Navbar.svelte";
    import Footer from '$lib/Footer.svelte';
    import '../app.css' 

</script>

<div class="app">
    <Navbar />
        <slot />
    <Footer />
</div>

<style>
    /* .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    } */


</style>