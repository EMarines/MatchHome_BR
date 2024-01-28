<script>
// @ts-nocheck

// Importaciones
  import { sendWhatsApp } from '$lib/functions/sendWhatsApp';
  import { contact, systStatus, currPropList, binnacle, property } from '$lib/stores/store';
  import { formatDate } from '$lib/functions/dateFunctions';
  import { toComaSep, toTele } from '$lib/functions/format.js'
  import { infoToBinnacle } from '$lib/functions/binnSaver';
  import { db, dbBinnacle } from '../../../firebase';
  import Search from '$lib/components/Search.svelte';
  import AddToSchedule from '$lib/components/AddToSchedule.svelte'
  import { filtContPropInte } from '$lib/functions/filProperties';
  import { goto } from '$app/navigation';
  import { deleteDoc, doc, collection, onSnapshot, updateDoc } from '@firebase/firestore';
  import { onDestroy } from 'svelte';
  import CardProperty from '$lib/components/CardProperty.svelte';
  import CardBinnacle from '$lib/components/CardBinnacle.svelte';
  import { sortBinnacle } from '$lib/functions/sort.js';

// Declaraciones
  let searchTerm = "";
  let propCheck = []
  let mostBusq = false;
  let showProp = false;
  let isActivated = false;
  let commInpuyBinnacle = "";
  let propToRender = []; 
  let sortedBinn = [];
  let toRenBinn = [];
  let contacto = {};
  let propFalt = 0;
  let sig = 0;
  let msg = "";

  $: tel = $contact.telephon;
  $: faltanProp = propFalt;


// Agendar
  // Cerrar Shedule                       
    function close(){
          isActivated = false;
        };

  // Mostrar Schedule
    function addSchedule(){
      isActivated = true;
    };

// Search and filter
  // Muestra las propiedades que le podrían intesar
    function fitProp() {
      contacto = $contact
      propToRender = filtContPropInte(contacto) 
      showProp = true;
      $systStatus = "sendProp"
        };

  // Search property by name
    function searProp() {
      showProp = true;
      return propToRender = $currPropList.filter((propety) => {
        let contInfo = (propety.nameProperty + " " + propety.colonia + " " + propety.claveEB).toLowerCase();
        return contInfo.includes(searchTerm.toLowerCase());
      });  
    };

  // Muestra search Properties
      function mostSearch () {
          mostBusq = !mostBusq;
        };

// CRUD edit and delete
  // Edit contact
      function editContact(){
        $systStatus = "editing"
        goto("/contactos/altaContacto")
      }

  // Delete contact
      async function deleContact() {
        if(confirm("Deseas eleiminar definitivamente al contacto?")){
          await deleteDoc(doc(db, "contacts", $contact.id))
          // @ts-ignore
          // $contact = {};
          goto("/contactos")
        } else {
          return;
        }
      };

// Buttons actions
  // Selecciona Mensaje para WA
    async function selMsgWA() {
      if($systStatus === "addContact"){
        // Envía la propiedad seleccionada del listado (propCheck) Alta de Contacto
          $binnacle = {"date": Date.now(), "comment": (`${$contact.name} ${$contact.lastname}`), "to": $contact.telephon, "action": "Se agregó a: "}
          infoToBinnacle($systStatus, $binnacle)
          msg = $property.urlProp;
          sendWhatsApp(tel, msg)
          $systStatus = "msgGratitude";
      } else if($systStatus === "msgGratitude") {
        // Envía en mensaje de agradecimiento
          $binnacle = {"date": Date.now(), "comment": $property.nameProperty, "to": $contact.telephon, "action": "Propiedad enviada: "}
          infoToBinnacle($systStatus, $binnacle)
          msg = "Gracias por contactarnos. Enrique Marines, asesor de ventas en Match Home, tel. 614 540 4003, email matchhome@hotmail.com ✔ Visita matchhome.net ✔ ¡Seguro encuentras algo de interés!"
          sendWhatsApp(tel, msg)
      } else if($systStatus === "sendComm"){
        // Envía por WA lo que está en TextArea y guarda la bitácora
          msg = commInpuyBinnacle;
          sendWhatsApp(tel, msg)
          $systStatus = "sendWA"
          $binnacle = {"date": Date.now(), "comment": commInpuyBinnacle, "to": $contact.telephon, "action": "WhatsApp enviado: "}
          infoToBinnacle($systStatus, $binnacle)
      } else if($systStatus === "sendProp"){
        // Envía por WA lo que está en TextArea y guarda la bitácora
          $property = propCheck[0]
          msg = $property.urlProp;
          sendWhatsApp(tel, msg)
          $binnacle = {"date": Date.now(), "comment": $property.nameProperty, "to": $contact.telephon, "action": "Propiedad enviada: "}
          infoToBinnacle($systStatus, $binnacle)
      };
        
      if($systStatus !== "msgGratitude") {
        msg = "";
        propCheck = [];
        commInpuyBinnacle = "";
        searchTerm = "";
        $systStatus = "";
        contBinn($contact);
      }
    };
    
  // Cambia systStatus al escribir en Text Area
    function textAreaComm() {
      $systStatus = "sendComm"
      propCheck = [];
    }

  // Cambia el systStatus as escojer una propiedad
    function sendProp() {
      $systStatus = "sendProp"
      commInpuyBinnacle = "";
    };    
 
  // Envios masivos por WA ya dados de alta
    function sendProperties() {
        $systStatus = "sendProps"
        propFalt = propCheck.length - (sig + 1)
        let msg = propCheck[sig].urlProp
        sendWhatsApp(tel, msg)
        if ( propCheck.length === sig + 1 ) {
          setTimeout ( function(){
            $systStatus = "";
            propCheck = [];
            showProp = false;
            sig = 0;
            propFalt = 0;
            return
          }, 2500);
        };
          sig ++        
    };    

  // Cancel Button ""start""
    function onCancel() {
          goto("/contactos")
      };
  //  Save notes
    function saveNote(){
      $systStatus = "binnAdding"
      $binnacle = {"date": Date.now(), "comment": commInpuyBinnacle, "to": $contact.telephon, "action": "Nota agregada: "}
      infoToBinnacle($systStatus, $binnacle)
      contBinn($contact);
      $binnacle = {};
      commInpuyBinnacle = "";
    }

  // Renderizar Binaccle
    const unsubs = onSnapshot(
      collection(db, "binnacles"),
      (querySnapshot) => {
          toRenBinn = querySnapshot.docs.map(doc => {
              return{...doc.data(), id: doc.id}
          })
          sortBinnacle(toRenBinn)
          toRenBinn.filter(item => item.to === $contact.telephon)
          contBinn(toRenBinn)
      },
      (err) =>{
          console.log(err);
      }
      );
            
    onDestroy(unsubs)
    
  // Busca la bitácora del contacto
      function contBinn(){
        let bitacora = toRenBinn.filter(item => item.to === $contact.telephon)
        return sortedBinn = sortBinnacle(bitacora)
      };
   
</script> 

  <!-- Contact Data -->
    <div class="container">

      <div class="mainContainer">

        <div class="leftContainer">

          <div class="data__container">
            <div class="headTitle">
              <div class="titleIcons">
                  <i on:click={()=>{editContact($contact.id)}} on:keydown={()=>{}} class="fa-regular fa-pen-to-square" />
                  <i on:click={()=>{deleContact($contact.id)}} on:keydown={()=>{}} class="fa-regular fa-trash-can" />
                </div>
                <div class="titleRight">
                  <h1 class="name">{$contact.name} {$contact.lastname}</h1>
                  <span class="date">Fecha Alta: {formatDate($contact.createdAt)}</span>  
              </div>
            </div>
          </div>

        <div>
          <div class="stage">
            <span>{$contact.contactStage}</span>
          </div>

          {#if $contact.comContact}
            <span>Notas: {$contact.comContact}</span>              
          {/if}
  
          <div class="cont__contact">
            <span>Contactar en:</span>
            {#if $contact.telephon}
              <span>Tel: {toTele($contact.telephon)}</span>
            {/if}
            {#if $contact.email}
              <span>Email: {$contact.email}</span>              
            {/if}

          </div>
  
          <div class="cont__requires">          
            {#if $contact.budget}
              <span>Presupuesto $ {toComaSep(Number($contact.budget))}.</span>
            {:else}
              <span>{$contact.rangeProp}</span>
            {/if}
            
            <div class="features__search">

              {#if $contact.numBeds}
                <span>{$contact.numBeds} <i class="fa-solid fa-bed to__show"></i></span>              
              {/if}
              {#if $contact.numBeds}
                <span>{$contact.numBaths} <i class="fa-solid fa-bath to__show"></i></span>              
              {/if}
              {#if $contact.halfBathroom}
                <span>{$contact.halfBathroom} <i class="fa-solid fa-toilet to__show"></i></span>              
              {/if}
              {#if $contact.numParks}
                <span>{$contact.numParks} <i class="fa-solid fa-car-rear to__show"></i></span>              
              {/if}
              <div>
                {#if $contact.locaProperty}
                  <span> <i class="fa-sharp fa-regular fa-compass to__showR"></i> {$contact.locaProperty.toString().replaceAll(",", ", ")} </span>              
                {/if}
                {#if $contact.tagsProperty}
                  <span><i class="fa-solid fa-tags to__showR"></i> {$contact.tagsProperty.toString().replaceAll("_", " ").replaceAll(",", ", ")} </span>              
                {/if}
              </div>
            </div>

          </div>

          
        </div>
        
        
  <!-- Botones and search-->
        <div class="btn__actions">
          <!-- Iconos edit, delete -->
                  <div class="icon__actions">
                    <button class="btn__common" on:click = {addSchedule($contact)} ><i class="fa-solid fa-calendar-days"></i>Agendar</button>
                    <button class="btn__common" on:click = { fitProp($contact)}> <i class="fa-solid fa-house-laptop"></i>Propiedades</button>
                    <button class="btn__common" on:click = {mostSearch}> <i class="fa-solid fa-house-user"></i>Propiedad</button>
                    <button class="btn__common" on:click={onCancel}><i class="fa-solid fa-rotate-left"></i>Regresar</button>                      
                  </div>

                  {#if mostBusq}
                    <div class="search">
                      <Search bind:searchTerm on:input={searProp} on:keydown={()=>{}}/>
                    </div>
                  {/if} 

                  {#if isActivated}
                    <AddToSchedule {...$contact} on:closeIt = {close} />
                  {/if}
              
  <!-- Botonies enviar WA o guardar nota para bitácora -->
              
              <div class="textAreaCont">
                  <textarea on:change={textAreaComm} class="texArea" bind:value = {commInpuyBinnacle} placeholder ="Ingresa un comentario"/> 
                  <div class="waSave">
                    {#if !!commInpuyBinnacle || $systStatus === "addContact" || $systStatus === "msgGratitude" }
                      <button  class="btn__common" on:click={selMsgWA}><i class="fa-brands fa-square-whatsapp"></i>WhatsApp</button>
                      <button class="btn__common" on:click={saveNote($systStatus, commInpuyBinnacle)}><i class="fa-solid fa-floppy-disk"></i>Guardar Info</button>
                    {/if}
                </div>
              </div>
                
        </div>

      </div>
      
      <!-- Bitácora del contacto -->
        {#if $systStatus != "sendProp"}
          <div class="rigthContainer">
            <h1 class="title">Bitácora</h1>
            <div>
              <div class="schedule">
                <div class="binnacleHome">
                  {#each sortedBinn as binn}
                    <CardBinnacle {binn} />
                  {/each}
                </div>              
              </div>
            </div>
          </div>
        {/if}


      
      </div>
    </div>

  <!-- Tarjeta para propiedad -->
    {#if showProp} 

      <div class="container">

        <div class="title__props">
          <h2 class="title sub">{propToRender.length} Propiedades encontradas</h2>
        </div>
        <div class="buttonSend">
          <button class="buttSendProps" on:click={sendProperties}>
            {$systStatus !== "sendProps" ? "Enviar propiedades seleccionadas" : `Total para enviar ${propCheck.length}. faltan ${faltanProp}`}
            </button>
        </div>
        <div class="card__container">
          {#each propToRender as prop}
            <div class="card__prop">
              <input type="checkbox" value={prop} class="form__propCheck" bind:group={propCheck} on:input={sendProp}/>	
              <CardProperty {prop} />
            </div>
          {/each}
        </div>
        
      </div>
  
    {/if}

<style>
  /* General */
    .mainContainer {
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex: 1;
    }
  
    .leftContainer {
      display: flex;
      flex-direction: column;
      width: 60%;
      margin-top: 10px;
      border: 1px solid rgb(56, 56, 56);
      border-radius: 8px;
      box-shadow: 1px 2px rgba(255,255,255, 0.5);
      background: rgb(56, 56, 56);
      padding: 0 15px 0 15px;
    }
    
    .rigthContainer {
      display: flex;
      flex-direction: column;
      font-size: .8rem;
      font-weight: 300;
      line-height: 2rem;
      max-height: 550px;
      width: 40%;
      margin-top: 10px;
      border: 1px solid rgb(56, 56, 56);
      border-radius: 8px;
      box-shadow: 1px 2px rgba(255,255,255, 0.5);
      background: rgb(56, 56, 56);
      padding: 5px;
      overflow-y: scroll;
      border-radius: 8px;
      gap: 10px;
    }

    .title{
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .data__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .buttonSend {
      display: flex;
      width: 100%;
      padding: 8px;
      justify-content: center;
      align-items: center;
      background: wheat;
    }

    .buttSendProps{
      padding: 8px 15px;
    }


    .card__container {
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 1200px;
      padding: 10px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(56, 56, 56);
      border-radius: 8px;
      box-shadow: 1px 2px rgba(255,255,255, 0.5);
      background: rgb(56, 56, 56);
      gap: 4px;
      padding: 15px;
    }

    .card__prop { 
        display: flex; 
        flex-direction: column;   
        /* width: 150px; */
        /* height: 250px;      */
        /* font-family: cursive; */
        color: grey;
        border: 1px solid grey;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        padding: 8px;
        gap: 4px;
        /* background: yellow; */
    }
   
    .btn__actions {
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      width: 100%;
      padding: 20px 0;
      /* gap: 20px; */
      /* background: lightskyblue; */
    }

    .icon__actions {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
    }

    .search {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
    
    .textAreaCont {
      display: flex;
      flex-direction: column;
      padding: 20px;
      align-items: center;
      justify-content: center;
      width: 100%;
      /* background: coral; */
    }

    textarea {
      border-radius: 8px;
      width: 60%;
      height: 100px;
      padding: 8px;
      margin-bottom: 12px;
    }
    
    .headTitle {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 20px 0 10px 0;
      justify-content: space-around;
    }
    
    .stage {
      display: flex;
      padding: 5px;
      justify-content: center;
      align-items: center;
    }

    .features__search {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .cont__contact {
      display: flex;
      padding: 15px;
      /* height:550px; */
      justify-content: center;
      gap: 15px;
    }

    .title__props {
      display: flex;
      justify-content: center;
    }
    
    .cont__requires {
      display: flex;
      flex-direction: column;
      padding: 0 0 0 15px;
      align-items: center;
      gap: 15px;
    }

    .waSave {
      display: flex;
      justify-content: space-evenly;
    }

    .card__prop {
      width: 200px;
      /* justify-content: center; */
    }

      .schedule{
        display: flex;
        align-items: left;
        justify-content: left;
      }
      .binnacleHome {
        display: flex;
        flex-direction: column;
        /* align-items: right;         */
      }

      .form__propCheck {
        padding: 0;
      }

      i {
        font-size: 1.8rem;
        padding: 5px 15px 5px 0;
      }

      .to__show {
        font-size: 1rem;
        padding: 5px 20px 5px 5px;
      }

      .to__showR {
        font-size: 1rem;
        padding: 5px 5px 5px 20px;
      }

      .fa-square-whatsapp {
        color: rgb(2, 255, 2);
      }

      .titleIcons{
        display: flex;
        width: 100%;
        height: 10px;
        position: relative;
        top: -15px;
        justify-content: right;
        gap: 50px;
      }

      .titleRight {
        display: flex;
        justify-content: space-between;
      }

      .date {
        position: relative;
        top: 20px;
      }

      .fa-pen-to-square, .fa-trash-can {
        display: flex;
        align-items:baseline;
        font-size: 1.2rem;

      }

      .btn__common {
        width: 150px;
        background: rgb(255, 247, 238);
        border-radius: 15px;
        cursor: pointer;
      }

      .btn__common:hover {
        color: rgb(153, 153, 0);
      }


      @media (max-width:1200px){
      .mainContainer{
        flex-direction: column;
        margin: 0 auto;
      }
      .rigthContainer{
        width: 100%;
        height: auto;
      }
      .leftContainer {
          width: 100%;
        }
      .date, .titleIcons {
        position: static;
      }
    
    }

    @media (max-width:400px){
      
      textarea{
        width: 100%;
      }
      i {
        padding-right: 25px;
      }
      .waSave{
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 5px;
      }
      .btn__common{
        width: 90%;
      }
   
      .cont__contact{
        flex-direction: column;
      }

      .date {
        position: relative;
        top: 30px;
      }

      .card__prop {
        width: auto;
      }
      .title__props {
        font-size: .6rem;
        padding: 20px;
      }
         
    }

  
      
</style>