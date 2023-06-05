<script>
// @ts-nocheck
  import { toComaSep } from '../functions/format'

  export let prop={};
</script>


  <div class="img__cont">
    <img src="{prop.urlImage}" alt="casa">
  </div>
  <div class="info__cont">
    <div class="card__info">
        <span>{prop.colonia}</span>
        <span>$ {toComaSep(Number(prop.price))}.</span>
    </div>
    <div class="card__features">
      {#if  prop.selectTP === "casa" || prop.selectTP === "departamento"}
        <span>Recámaras {Number(prop.beds)}</span>
        <span>Baños {Number(prop.bathroom)}</span> 
      {:else if prop.selectTP === "terreno"}  
        <span>{prop.areaTotal} m²</span>
      {/if}
    </div>
    <div class="prop__clave">
    </div>
  </div>


<style>

      .card__info {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        font-weight: 300;
        align-items: center;
    }

    .img__cont{
      width: 100%;
      height: 58%;
    }

    .info__cont{
      width: 100%;
      height: 38%;
      align-items: center;
    }
  
    img{
        width: 180px;
        height: 120px;
        object-fit: cover;
        object-position: center;
        border-radius: 4px;
    }
   
  
    .card__features {
      display: flex;
      flex-direction: row;
      font-size: 0.8em;
      padding: 4px;
      gap: 8px;
      justify-content: center;
    }

    .prop__clave {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    @media(max-width: 400px){
      .img__cont{
        display: flex;
        justify-content: center;
        /* width: 100%; */
        /* height: 80%; */
    }
    img{
      width: 280px;
      height: 200px;
    }

    span{
      color: blue;
      font-weight: 800;
    }
  }
</style>