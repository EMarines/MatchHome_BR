<!-- propSelect +page -->
<script>
// @ts-nocheck
  // Importaciones
    import { db } from '../../../firebase'
    import { property, contact, systStatus } from '$lib/stores/store'
    import { toComaSep } from '$lib/functions/format.js'
    import { diaTarde } from '$lib/functions/dateFunctions'
    import BtnWA from '$lib/components/BtnWA.svelte'
    import BtnFollLink from '$lib/components/BtnFollink.svelte';
    import BtnFind from '$lib/components/BtnFind.svelte';
    import BtnCancel from '$lib/components/BtnCancel.svelte';
    // import CardProperty from '$lib/components/CardProperty.svelte'
    import { goto } from '$app/navigation';
    import { deleteDoc, doc, collection, updateDoc } from '@firebase/firestore';

  // declaraciones
    let saludoHora = "";
    let modeAction  = "";

  // funciones
    // Edty Property
      function editProp(){
        $systStatus = "editing"
        goto("/propiedades/altaPropiedad")
      }

    //  Delete Property
      async function deleProperty() {
        if(confirm("Deseas eleiminar definitivamente la propiedad?")){
          // $systStatus = "propDeleting"
          await deleteDoc(doc(db, "properties", $property.id))
          $property = [];
        } else {
          return;
        }
        goto("/propiedades")
      };

    // Find Contacts
      function findCustomers(){
      }

    //  Send WhatshApp with Message and Property
      function sendWA(){   
          // $contact = contChecked[0]
          saludoHora = diaTarde()
          let msg = (`${$contact.name}. ${saludoHora}  Te envío esta casa que creo te va a interesar. ¡Saludos!`)
          let link = (`https://api.whatsapp.com/send?phone=52${$contact.telephon}&text=${$property.urlProp}         🏠 ${msg} 👍 `)
          window.open(link, "ventana1","width=350,height=350,scrollbars=NO"); 
          modeAction = "sendProperties"
          let claveProp = $property.claveEB
          // sendProperty($contact)
        };

    // Cancel
      function actCancel(){ 
        $property = [];
        goto("/propiedades") 
      }

</script>
    <!-- Title -->
      <div class="container">
        <h2>Propiedad Seleccionada</h2>

        <div class="mainContainer">

          <div class="prop__ima__info">
    <!-- Image and clave -->
            <div class="prop__image">
              <p class="prop__clave">{$property.claveEB}</p>
              <img src={$property.urlImage} alt={$property.nameProperty}>
            </div>
        
            <div class="prop__card">

              <div class="prop__info">
                <h1>Colonia {$property.colonia} {$property.selectTP} en {$property.selecTO}</h1>
                <div class="prop__price">
                  <h2>Precio $ {toComaSep(Number($property.price))}.</h2>
                </div>
                <div class="prop__features">
                  {#if  $property.selectTP === "Casa" || $property.selectTP === "Departamento"}
                    <span>Recámaras {Number($property.beds)}</span>
                    <span>Baños {Number($property.bathroom)}</span> 
                  {:else if $property.typeProperty === "Terreno"}  
                    <span>{$property.areaTotal} m²</span>
                  {/if}
                </div>
              </div>
              <div class="actions">
                <i on:click={()=>{editProp($property.id)}} on:keydown={()=>{}} class="fa-regular fa-pen-to-square" />
                <i on:click={()=>{deleProperty($property.id)}} on:keydown={()=>{}} class="fa-regular fa-trash-can" />
              </div>

            </div>
            
          </div>

            <div class="btn__options" >
              <BtnWA on:click={sendWA} />
              <BtnFind on:click={findCustomers} />
              <BtnCancel on:click={actCancel}/>
              <BtnFollLink />
            </div>

        
        

        </div>

      </div>

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .prop__clave {
    position: absolute;
    transform: translateY(50%) translateX(360%);
    background: black;
    opacity: 50%;
    padding: 0 10px;
    border-radius: 3px;
  }

  img {
    width: 500px;
    min-width: 500px;
    height: 450px;
    border-radius: 8px;
    object-fit: cover;
  }

  h1, h2 {
    font-weight: 300;
  }

 
  .prop__ima__info {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
  
  .prop__card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid white;
    width: 500px;
    height: 450px;
    gap: 20px;
    padding: 15px;
    border-radius: 8px;
  }

  .prop__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85%;
  }

  .prop__card h1 {
    font-size: 1.5rem;
    font-weight: 100;
  }

  .prop__price{
    display: flex;
    justify-content: center;
  }
  .prop__features {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
  }

  .actions {
    display: flex;    
    width: 100%;
    height: 10%;
    justify-content: space-around;
    font-size: 1.5rem;
  }
    
  .btn__options {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

  }



</style>


