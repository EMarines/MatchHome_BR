<script>
// @ts-nocheck
  import { toComaSep, toTele } from '$lib/functions/format'
  import { formatDate } from '$lib/functions/dateFunctions.js'

  export let cont = {};
</script>


  <div class="card__info">
    <div class="card__infoHead">
      <span>{cont.name} {cont.lastname}</span>
      <span class="date">{formatDate(cont.createdAt)}</span>
    </div>
    <div class="info__cont">
      {#if cont.telephon}
        <span>Telefono: {toTele(cont.telephon)} </span>
      {/if}
      {#if cont.email }
        <span>Email: {cont.email}</span>
      {/if}

      {#if cont.budget}
        <span>Presupuesto: $ {toComaSep(Number(cont.budget))}.</span>
      {:else}
        <span>Rango: {cont.rangeProp}</span>
      {/if}
      <span>Tags: {cont.tagsProperty}</span>

    </div>
  </div>
 

<style>

    
  .card__info {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* font-size: 0.9rem; */
    font-weight: 400;
    align-items: center;
    padding: 10px;
  }

  .card__infoHead {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    /* align-items: ; */
    font-size: 1rem;
    font-weight:400;
    padding-top: 8px;
    gap: 15px;
  }

  .info__cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    font-weight: 500;
  }



</style>