<script>
// @ts-nocheck
  // Importaciones
    import { currPropList, currContList, property } from '$lib/stores/store.js';
    import { onSnapshot, collection } from '@firebase/firestore'
    import { db } from '../../firebase'
    import { systStatus } from '$lib/stores/store.js';
    import { onDestroy } from 'svelte';
    import { sortList } from '$lib/functions/sort.js'
    import { goto } from '$app/navigation';
    import CardProperty from '$lib/components/CardProperty.svelte';

  // Declarations
    $property = {};
    $systStatus = "";
    let prop = {};

  // Añadir propiedad
    function addProperty() {
      $systStatus = "addProperty"
      goto("/propiedades/altaPropiedad")
    }
  // Renderiza currPropList y lo convierte en propToRender
       const unsubC = onSnapshot(
         collection(db, "properties"),
         (querySnapshot) => {
            $currPropList = querySnapshot.docs.map(doc => {
               return{...doc.data(), id: doc.id}
            })
            return sortList($currPropList)
         },
            (err) =>{
               console.log(err);
         }
      );
         
      onDestroy(unsubC)
    $: propToRender = $currPropList

  //  Le da el valor de prop a $property y Redirige a propSelect
    function seleProperty(prop) {
      $property = prop
      goto("/propiedades/propSelect")
    }
  
  </script>
    
  <!-- Renderización -->
    <div class="container">
    
      <h1 class="title">Propiedades</h1>
    
      <button class="btn__submit" on:click={addProperty}>Alta de Propiedad</button>
    
      <div class="card__container">

        {#each propToRender as prop}
          <div class="card__prop"on:click={seleProperty(prop)} on:keydown={()=>{}}>
            <CardProperty {prop} />
          </div>
        {/each}  

      </div>
      
    </div>
  
  
<style>

  .card__prop { 
      display: flex; 
      flex-direction: column;   
      width: 200px;
      height: 250px;     
      font-family: cursive;
      color: grey;
      border: 1px solid grey;
      border-radius: 5px;
      justify-content: center;
      padding: 8px;
      gap: 4px;
  }

  .card__container {
    width: 90%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

</style>