<script>
// @ts-nocheck
  // Importaciones
    import { onSnapshot, collection } from '@firebase/firestore'
    import { db } from '../../firebase'
    import { currContList, currPropList, contact, property } from '$lib/stores/store.js';
    import { onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { sortList } from '$lib/functions/sort.js'
    import { toComaSep, toTele } from '$lib/functions/format.js'
    import { formatDate } from '$lib/functions/dateFunctions.js'
    import { systStatus } from '$lib/stores/store.js';
    import Search from '$lib/components/Search.svelte';
  

  // Declaraciones
    let searchTerm = "";

    $contact ={};
    $systStatus = "";
    $property = {};
  
  // Añadir propiedad
      function addContact() {
        $systStatus = "addContact"
        goto("/contactos/altaContacto")
      }

  // Renderiza currPropList
         const unsubC = onSnapshot(
           collection(db, "contacts"),
           (querySnapshot) => {
              $currContList = querySnapshot.docs.map(doc => {
                 return{...doc.data(), id: doc.id}
              })
              return sortList($currContList)
           },
              (err) =>{
                 console.log(err);
           }
        );
           
        onDestroy(unsubC)
      $: contToRender = $currContList

  //  Redirige a propSelect
      function seleContact(cont) {
        $contact = cont
        goto("/contactos/contSelect")
      }

  // Search Contact by name, lastname and telephon
      function searCont() {
        return contToRender = $currContList.filter((contact) => {
          let contInfo = (contact.name + " " + contact.lastname + contact.telephon).toLowerCase();
          return contInfo.includes(searchTerm.toLowerCase());
        });  
      };

    
</script>

    <div class="container">

      <div class="mainContainer">
        <div class="title__container">
          <h1 class="title">Contactos</h1>
        </div>
        <div class="headContainer">
          <button class="btn__submit" on:click={addContact}>Alta de Contacto</button>
          <Search bind:searchTerm on:input={searCont} on:keydown={()=>{}}/>
        </div>
      
        <div class="cards__container">
          {#each contToRender as cont}
            <div class="card__container" on:click={seleContact(cont)} on:keydown={()=>{}}>
              <div class="info__cont">
                <div class="card__info">
                  <div class="card__infoHead">
                    <span>{cont.name} {cont.lastname}</span>
                    <span class="date">{formatDate(cont.createdAt)}</span>
                  </div>
                    {#if cont.telephon}
                      <span>{toTele(cont.telephon)} </span>
                    {/if}
                    {#if cont.email }
                      <span>{cont.email}</span>
                    {/if}

                    {#if cont.budget}
                      <span>$ {toComaSep(Number(cont.budget))}.</span>
                    {:else}
                      <span>{cont.rangeProp}</span>
                    {/if}
                </div>
                </div>
                <div class="prop__clave">
                </div>
              </div>
            <!-- </div> -->
          {/each}        
        </div>
        
      </div>
    
  </div> 
    <style>

    .headContainer {
      display: flex;
      flex-direction: row;
      /* width: 100%; */
      align-items: center;
      justify-content: space-around;
      /* background: yellow; */
    }

    .mainContainer {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 10px;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    .cards__container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      padding: 4px 0;
      gap: 4px;
      /* background: blue; */
    }

    .card__container { 
      display: flex; 
      flex-direction: column; 
      width: 300px;
      height: 130px;     
      font-family: cursive;
      color: grey;
      border: 1px solid grey;
      border-radius: 5px;
      padding: 8px;
      cursor: pointer;
    }

    .card__info {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      font-weight: 300;
      align-items: center;
      padding: 10px;
      /* background: #fff; */
    }

    .card__infoHead {
      display: flex;
      /* justify-content: space-between; */
      font-weight: 600;
      padding-top: 8px;
      gap: 15px;
      /* background: rgb(249, 236, 181); */
    }

    span.date {
      /* position: absolute; */
      left: 50px;
      font-size: .7rem;
      font-weight: 500;
      /* justify-content: space-between; */
    }

    .info__cont{
      width: 100%;
      height: 38%;
      align-items: center;
    }
  
    /* .card__features {
      display: flex;
      flex-direction: row;
      font-size: 0.8em;
      padding: 4px;
      gap: 8px;
      justify-content: center;
    } */

    .prop__clave {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    @media (max-width:400px){
      .headContainer {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    }
    </style>