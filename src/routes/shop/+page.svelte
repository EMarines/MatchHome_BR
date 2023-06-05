<script>
  // import { contactos } from './+page'
  export let data;
  const { products } = data
  // console.log(contactos);
</script>
<div class="container">
  <h1>Shop</h1>
  {#each products as product}
  <h2>
    <a href="/shop/{product.id}" data-svelte-prefetch>
      {product.title}
    </a>
  </h2>
    <p>{product.description}</p>
    <br><br>
  {/each}
</div>