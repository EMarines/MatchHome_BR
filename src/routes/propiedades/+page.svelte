<script>
// @ts-nocheck
  // Importaciones
    import { currPropList, currContList, property } from '$lib/stores/store.js';
    import { onSnapshot, collection, addDoc} from '@firebase/firestore'
    import { db, dbBinnacle } from '../../firebase'
    import { systStatus } from '$lib/stores/store.js';
    import { onDestroy } from 'svelte';
    import { sortList } from '$lib/functions/sort.js'
    import { goto } from '$app/navigation';
    import CardProperty from '$lib/components/CardProperty.svelte';
    import Search from '$lib/components/Search.svelte';
    import propadd from '$lib/jsonProperties.json'


  // Declarations
    $property = {};
    $systStatus = "";
    let searchTerm = "";
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

  // Search property by name
    function searProp() {
      return propToRender = $currPropList.filter((propety) => {
        let contInfo = (propety.nameProperty + " " + propety.colonia + " " + propety.claveEB).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return contInfo.includes(searchTerm.toLowerCase());
      });  
    };

    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function addPropertyS() {
      propadd.forEach(async prop => {       
            const contToAdd = collection(db, "properties")
            await addDoc(contToAdd, prop);
      });
    }

  </script>
    
  <!-- Renderización -->
    <div class="mainContainer">
      
      <div class="title__head">

        <h1 class="title">Propiedadess</h1>
        <div class="title__inter">
          <Search bind:searchTerm on:input={searProp} on:keydown={()=>{}}/>
          <button class="btn__submit" on:click={addProperty}>Alta de Propiedad</button>
          <button class="btn__submit" on:click={addPropertyS}>Descargar Listado de Propieades</button>
        </div>

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
    width: 100%;
    align-items: center;
  }
  
  .title__head{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
  }

  .title__inter {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: baseline;

  }

  .card__container {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
  }

  /* .card__prop { 
      display: flex; 
      flex-direction: column;   
      width: 200px;
      height: 250px;     
      border: 1px solid grey;
      border-radius: 5px;
      justify-content: center;
      padding: 8px;
      gap: 4px;
    } */

    @media(max-width: 400px) {
      .card__container {
      flex-direction: column;
      width: 100%;
      gap: 20px;
    }
    .card__prop {
      border: none;
      padding: 5px;
      width: 100%;
      height: 200px;
      align-items: center;
      }
      .title__head {
        flex-direction: column;
        align-items: center;
        margin-bottom: 5px;
      }
      .title__inter {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: 15px 0;
      }
    }
    


</style>