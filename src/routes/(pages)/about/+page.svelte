   <script>
    import Seo from "$lib/Seo.svelte";
    import Contact from '$lib/Contact.svelte';

   </script>

    <div class="container grid">
        <div class="what">
            <h3>About Us</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus asperiores voluptas omnis tempora corrupti assumenda illo. Sint temporibus repellat, doloremque veritatis fugiat, natus vero omnis est reiciendis quidem corporis ratione
            </p>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita odio reprehenderit ipsum, natus, quasi necessitatibus ab voluptate dolor repellendus fuga, praesentium unde incidunt illo dolorum assumenda? Cum adipisci id amet sunt ipsa minus eius laudantium aliquid distinctio, officiis totam neque, rem repudiandae sequi alias at!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ab beatae labore et quaerat facilis reiciendis ducimus quasi, vel earum odio, mollitia quod. Expedita facilis ipsam, laudantium porro nulla optio. Quaerat, placeat nihil rem reprehenderit itaque amet, quos explicabo, mollitia iure vel sint illum libero doloremque voluptatibus laborum! Et temporibus culpa neque delectus maxime beatae architecto amet, fugiat enim odit!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus eos accusamus ea dolore perspiciatis, placeat maiores itaque neque, necessitatibus, odit aut unde beatae illum sequi.
            </p>
        </div>
        <Contact />
    </div>

   <style>
    .grid {
        display: grid;
        grid-template-columns: repeat(12,1fr);
        gap: 2em;
    }
    .what {
        grid-column: span 8;
    }
    h3 {
        padding-bottom: 0.5em;
        margin-bottom: 0.5em;
        font-size: 2em;
        font-weight: 500;
        border-bottom: 1px solid #ddd;
    }
   </style>
   About

    <Seo title="About | Business Frontpage" description="sample" type="WebPage"/>
  