<script>
// @ts-nocheck
  import { toComaSep } from '$lib/functions/format'

  export let prop={};
</script>

  <div class="card__prop">
  
    <div class="img__cont">
      <img src="{prop.title_image_thumb}" alt="casa">
    </div>

    <div class="info__cont">

      <div class="card__info">
        <span class="capitalize">
          {prop?.location?.replace("Chihuahua, Chihuahua", "").replaceAll(",", "").
          replace("I, ", "").replace("II", "").replace("III", "").replace("IV", "").replace("V ", "")
          .replaceAll("Y ", "") || 'Sin dirección'}
        </span>
          <span>$ {toComaSep(Number(prop?.operations[0].amount))}.</span>
      </div>

      <div class="card__features">
        {#if prop?.property_type?.toLowerCase() === "casa" ||
          prop?.property_type?.toLowerCase() === "departamento"}
          <span>Recámaras {prop?.bedrooms}</span>
          <span>Baños {Number(prop?.bathrooms)}</span> 
        {:else if prop?.property_type?.toLowerCase() === "terreno" ||
         prop?.property_type?.toLowerCase() === "local comercial"}  
          <span>{toComaSep(Number(prop?.construction_size))} m²</span>
        {:else if prop?.property_type?.toLowerCase() === "edificio" ||
         prop?.property_type?.toLowerCase().startsWith("bodega")}
          <span>{toComaSep(Number(prop?.construction_size))} m²</span>
          <span>{toComaSep(Number(prop?.lot_size))} m²</span>
        {/if}
      </div>

    </div>

  </div> 

<style>

    .card__prop { 
      display: flex; 
      flex-direction: column;   
      width: 200px;
      height: 250px;     
      border: 1px solid grey;
      border-radius: 5px;
      justify-content: center;
      padding: 8px;
      gap: 4px;
    }

    .img__cont{
      display: flex;
      width: 100%;
      height: 50%;
      align-items: baseline;
      justify-content: center;
      margin-bottom: 20px;
    }    
    
    img{
      width: 100%;
      height:100%;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 0 0 20px 0;
      /* object-position: center; */
    }
    
    .info__cont{
      width: 100%;
      /* height: 50%; */
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