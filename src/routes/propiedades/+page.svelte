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
    <div class="mainContainer">
      <div class="title__head">
        <h1 class="title">Propiedades</h1>
      
        <button class="btn__submit" on:click={addProperty}>Alta de Propiedad</button>
      </div>
    
      <div class="card__container">

        {#each propToRender as prop}
          <div class="card__prop"on:click={seleProperty(prop)} on:keydown={()=>{}}>
            <CardProperty {prop} />
          </div>
        {/each}  

      </div>
      
    </div>
  
  
<style>

  .mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title__head{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: auto;
  }

  .card__container {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
  }

  .card__prop { 
      display: flex; 
      flex-direction: column;   
      width: 200px;
      height: 250px;     
      color: grey;
      border: 1px solid grey;
      border-radius: 5px;
      justify-content: center;
      padding: 8px;
      gap: 4px;
    }

    @media(max-width: 400px) {
      .card__prop {
      border: none;
      padding: 5px;
      }
      .title__head {
        flex-direction: column;
        align-items: center;
        margin-bottom: 25px;
      }
    }
    


</style>