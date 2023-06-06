<script>
    import { page } from '$app/stores'

    /**
	 * @type {any}
	 */
     export let title;
    /**
	 * @type {any}
	 */
     export let description;
    /**
	 * @type {any}
	 */
     export let type;

    $: url = $page.url.href;
</script>
    <svelte:head>
        <title>{title}</title>
        <meta name="description" content={description}>
        {@html `<script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "${type}",
            "name": "${title}",
            "description": "${description}",
            "url": "${url}"
        }</script>`}
    </svelte:head>