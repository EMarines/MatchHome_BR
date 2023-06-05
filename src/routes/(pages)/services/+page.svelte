<script>
    import Seo from '$lib/Seo.svelte'
</script>



    <div class="container grid">
        <div class="what">
            <h3>Services</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, quos dolores quae sequi ipsum eaque numquam. Fuga quae praesentium illo, quis illum et recusandae asperiores, doloribus, ad ab perspiciatis. Id voluptatum eos possimus maiores facilis. Eligendi a ipsam atque mollitia necessitatibus, maxime repellat at corrupti eaque inventore doloribus sed nobis accusantium, dolore deserunt, reprehenderit praesentium quia. Odio error explicabo dolorem quaerat ipsa aspernatur. Reprehenderit quae esse perspiciatis aliquid distinctio iste suscipit. Magnam, mollitia. Quod nemo accusamus quis quas eum vero nesciunt. Aliquid eveniet recusandae voluptas esse quibusdam dignissimos omnis accusantium tempore fugiat, tempora dolorum cum?
            </p>
            <h3>Venta de Propiedades</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus asperiores voluptas omnis tempora corrupti assumenda illo. Sint temporibus repellat, doloremque veritatis fugiat, natus vero omnis est reiciendis quidem corporis ratione
            </p>
            <h3>Inversionistas</h3>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita odio reprehenderit ipsum, natus, quasi necessitatibus ab voluptate dolor repellendus fuga, praesentium unde incidunt illo dolorum assumenda? Cum adipisci id amet sunt ipsa minus eius laudantium aliquid distinctio, officiis totam neque, rem repudiandae sequi alias at!
            </p>
      
        </div>
     
    </div>

   <style>
    .grid {
        display: grid;
        text-align: justify;
        /* grid-template-columns: repeat(12,1fr); */
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

    <Seo title="Services | Business Frontpage" description="Services" type="WebPage"/>