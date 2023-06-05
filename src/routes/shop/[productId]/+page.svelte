<script>
  export let data;
  const { product } = data  
</script>


<div class="container">
  <h2>{product.title}</h2>
  <p>{product.description}</p>
  <p>Precio: $ {product.price.toFixed(2)}</p>
</div>
