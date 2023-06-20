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
        <span>{toComaSep(Number(prop.areaTotal))} m²</span>
      {/if}
    </div>

  </div>


<style>

    .img__cont{
      display: flex;
      width: 100%;
      height: 58%;
      align-items: baseline;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 0 0 20px 0;
      /* object-position: center; */
    }
    
    .info__cont{
      width: 100%;
      height: 38%;
      /* align-items: baseline;s */
    }
    
    .card__info {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      font-weight: 300;
      align-items: center;
      justify-content: center;
    }
   
    .card__features {
      display: flex;
      flex-direction: row;
      font-size: 0.8em;
      padding: 4px;
      gap: 8px;
      justify-content: center;
    }

    @media(max-width: 400px){
  
      .img__cont{
        display: flex;
        width: 340px;
        align-items: center;
        height: auto;
        justify-content: center;
    }
    img{
      width: 100%;
      max-height: 195px;
      /* padding: 15px 5px 0 5px; */

    }
    span{
      color: blue;
      font-weight: 800;
      position: relative;
      top: -80px;
    }

    .info__cont {
      height: 0;
    }
    
  }
</style>