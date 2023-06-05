<script>
// @ts-nocheck

  // Importaciones
    import { db, dbProperties } from '../../../firebase';
    import { contact, currPropList, systStatus, property, binnacle } from '$lib/stores/store.js';
    import Search from '$lib/components/Search.svelte'
    import Tags from '$lib/components/Tags.svelte'
    import Ubication from '$lib/components/Ubication.svelte'
    import { mosRange } from '../../../lib/functions/rangValue'
    import { infoToBinnacle } from '$lib/functions/binnSaver'
    import { scale } from 'svelte/transition';
    import { expoInOut } from 'svelte/easing';
    import { toComaSep } from '$lib/functions/format.js' 
    // import { searProp } from '$lib/functions/searchProperty.js'
    import { typeContacts, modeContact, typeProperties, modePays, oneToFive, oneToFour, oneToThree, contactStage } from '$lib/parameters.js';
    import { formatDate } from '$lib/functions/dateFunctions.js';
    import { collection, addDoc, deleteDoc, getDoc, getDocs, doc, updateDoc} from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import CardProperty from '$lib/components/CardProperty.svelte';

  // Declaraciones
      let searchTerm = "";
      let showProp = false;
      let detaAdd = false;
      let propChecked = "";
      let prop;
      let ubication = "";
      let tag = [];
      
      /**
       * @type {never[]}
       */
      let contCheck = [];
      
      $currPropList = dbProperties
      $: propToRender = $currPropList

  // // Add Contact
  //     function addContact() {
  //       console.log($systStatus);
  //       // $systStatus = "addContact"
  //       handleSubmit($systStatus, $contact)
  //     }

  // Handle Submit
      async function handleSubmit() { 
        console.log($systStatus);
          if($systStatus === "editing"){ 
            try {
              await updateDoc(doc(db, "contacts", $contact.id), $contact);
              $binnacle = {"date": Date.now(), "comment": "Se editó", "to": $contact.telephon, "action": "Se editó a: "}
              infoToBinnacle($systStatus, $binnacle);              
            } catch (error) {
              console.log(error);
            } 
          } else {
            try {
              let createdAt = Date.now();
              let selecTP = $property.selectTP
              let propCont = $property.nameProperty;
              let rangeProp = mosRange($property.price)
              let contactStage = "Etapa 1"
                $contact = {         
                  ...$contact, createdAt, propCont, rangeProp, selecTP, contactStage
                } 
                const contToAdd = collection(db, "contacts")
                await addDoc(contToAdd, $contact);
                // $systStatus = "binnAdding"
                // $binnacle = {"date": Date.now(), "to": $contact.telephon, "action": "Se agregó a: ", "comment": (`${$contact.name} ${$contact.lastname}`)}
                // infoToBinnacle($systStatus, $binnacle)
                // console.log($binnacle);
                // $binnacle = {"date": Date.now(), "to": $property.nameProperty, "action": "Propiedad enviada: "}
                // infoToBinnacle($systStatus, $contact)
                // console.log($binnacle);
                $systStatus = "addContact"              
            } catch (error) {
              console.log(error);
            }
          }   
          goto("/contactos/contSelect")
      }

  // Cancel
      function onCancel() {
        goto("/contactos")
      }

  // Search property by name
      function searProp(searchTerm) {
        if(searchTerm.length !== 0){
        showProp = true;
        return propToRender = $currPropList.filter((propety) => {
          let contInfo = (propety.nameProperty + " " + propety.colonia + " " + propety.claveEB).toLowerCase();
          return contInfo.includes(searchTerm.toLowerCase());
        });
      } else {
        showProp = false;
      }
      };

  // Muestra el resto del fromulario
      function detaAlta(){
         detaAdd = !detaAdd;
      }
      
      function propCheck(){
        $property = propChecked[0]
        if(propChecked.length >1){
          alert("Solo puedes escoger una propiead a la vez")
          // console.log(propChecked);
          // return
        }
        // console.log(propChecked);
      }

</script>

  <!-- Muestro o oculta la fecha para mostrar o editar -->

    <div class="cont__alta">
      <h1 class="title">Alta de Contacto</h1>

      <div class="features">
      <div>
        {#if $systStatus === "editing"}
          <label class="label__title">
            <p class={$contact.createdAt ? ' above' : ' center'}>Alta en </p>
            <input class="in__sel" type="date" name="createdAt" bind:value={$contact.createdAt} placeholder="* Alta el: " required>
            <!-- <input class=" dataInput" type="date" bind:value={$contact.createdAt}  placeholder="* Alta el "/> -->
          </label>
        {/if}
      </div>

  <!-- Nombre y apellido -->
      <div class="inp__lat">
        <label class="label__title">
          <p class={$contact.name ? ' above' : ' center'}>Nombre</p>
          <input class="in__sel" name="hbathrooms" bind:value={$contact.name} placeholder="* Nombre" required>
        </label>

        <label class="label__title">
          <p class={$contact.lastname ? ' above' : ' center'}>Apellido</p>
          <input class="in__sel" name="lastname" bind:value={$contact.lastname} placeholder="* Apellido " >
        </label>
      </div>

  <!-- Modo de contacto -->
    <div class="inp__lat">
      <label class="label__title">
        <p class={$contact.telephon ? ' above' : ' center'}>Teléfono</p>
        <input type="telephon" class="in__sel" name="telephon" bind:value={$contact.telephon} placeholder="* Teléfono " required>
      </label>
      
      <label class="label__title">
        <p class={$contact.email ? ' above' : ' center'}>Email</p>
        <input class="in__sel" name="email" bind:value={$contact.email} placeholder="* Email " required>
      </label>
    </div>

  <!-- Tipo de contacto -->
    <div class="featContact">

      <select class="in__sel feat" bind:value={$contact.typeContact}>
        <option class={$contact.typeContact ? ' above' : ' center'} value="">Tipo de Contacto</option>
        <!-- <p class={$contact.typeContact ? ' above' : ' center'}>Tipo de Contacto</p> -->

        {#each typeContacts as typeContac}
          <option  value={typeContac}>{typeContac}</option>
        {/each}
      </select>       
      
    <!-- Fuente del Contacto -->
      <select class="in__sel feat" bind:value={$contact.selecMC}>
        <option disabled selected value="">Modo de Contacto</option>
        {#each modeContact as selecMC}
        <option  value={selecMC}>{selecMC}</option>
        {/each}
      </select>
      
    <!-- Tipo de propiedad buscada -->
      {#if detaAdd}
        <select class="in__sel feat" id="selTP" name="selTP" bind:value={$contact.selecTP}>
          <option disabled selected value="">Tipo de Propiedad</option>
          {#each typeProperties as selecTP}
          <option value={selecTP}>{selecTP}</option>
          {/each}
        </select>
      {/if}  
    </div>


  <!-- Nota de inicio -->
      <label class="label__title">
        <p class={$contact.comContact ? ' above' : ' center'}>Comentarios</p>
        <textarea class="in__sel notes" name="comContact" bind:value={$contact.comContact} placeholder="* Comentarios" />
      </label>

  <!-- Search -->
      <Search bind:searchTerm on:input={searProp(searchTerm)}/>

  <!-- Presupuesto -->
      {#if detaAdd}
      <div>
        <label class="label__title">
          <p class={$contact.budget ? ' above' : ' center'}>Presupuesto</p>
          <input class="in__sel" name="budget" bind:value={$contact.budget} placeholder="* Presupuesto " required>
        </label>
      </div>

  <!-- Metodo de Pago -->
       <select class="in__sel" bind:value={$contact.modePay}>
          <option disabled selected value="">Modo de Pago</option>
          {#each modePays as modeP}
            <option  value={modeP}>{modeP}</option>
          {/each}
       </select>

  <!-- Características buscadas -->
       <select class="in__sel" bind:value={$contact.numBeds}>
          <option disabled selected value="" ># Recámaras</option>
          {#each oneToFive as beds}
            <option value={beds} >{beds} Recámaras</option>
          {/each}
       </select>

       <select class="in__sel" bind:value={$contact.numBaths}>
          <option disabled selected value=""># Baños</option>
          {#each oneToFour as bathroom}
            <option value={bathroom}>{bathroom} baños</option>
          {/each}
       </select>

       <select class="in__sel" bind:value={$contact.halfBathroom}>
          <option disabled selected value=""># Medios Baños</option>
          {#each oneToFour as numberHalfBath}
          <option value={numberHalfBath}>{numberHalfBath} Medios baños</option>
          {/each}
       </select>

       <select  class="in__sel"bind:value={$contact.numParks}>
          <option disabled selected value=""># Estacionamientos</option>
          {#each oneToFour as park}
          <option value={park}>{park} Estacionamientos</option>
          {/each}
       </select>

  <!-- Stages -->
        <label class="label__title">
          <p class={$contact.contactStage ? ' above' : ' center'}>Etapa</p>
          <select class="in__sel" name="typeOperation" bind:value={$contact.contactStage} placeholder="">
            <option value="" disabled selected>* Etapa</option>
            {#each contactStage as stage}
              <option value={stage}>{stage}</option>
            {/each}
          </select>
        </label>

  <!-- Ubicacion y etiquetas -->
       <div class="ubi__Tags">
          <Ubication bind:ubication = {$contact.locaProperty} />
          <Tags bind:tag = {$contact.tagsProperty} />
       </div>
    {/if}

    <button class="btn__save" on:click={detaAlta}>Alta Detalles</button>

  <!-- Botones Guardar Eiditar y Regresar-->
        <button class="bt__SaveEdit" on:click={handleSubmit}>{#if $systStatus === "addContact"}Guardar{:else}Editar{/if}</button>
        <button class="btn-cancel" on:click={onCancel}>Regresar</button>

      </div>
      
      
      
  <!-- Renderiza las Tarjetas para Propiedad -->
      {#if showProp} 

      <h2 class="title sub">{propToRender.length} Propiedades encontradas</h2>
      <div class="card__container">

        {#each propToRender as prop}
          <div class="card__prop">
            <input type="checkbox" name={prop.claveEB} value={prop} bind:group={propChecked} on:change={propCheck}>
            <CardProperty {prop} />
          </div>
        {/each}

        {#if propToRender.length === 0}
        <h3>"No hay Propiedades para este contacto"</h3>
        {/if}
      </div>
      {/if}
      
    </div>  



<style>

  .cont__alta{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .inp__lat {
    display: flex;
    flex-direction: row;
  }

  .in__sel {    
    padding: 5px 0 5px 8px;
    width: 250px;
    border-radius: 8px;
    border-color: 2px solid blue;
    font-family: cursive;
    font-size: .8em;
    font-weight: 550;
    color: darkblue;  
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* width: 550px; */
    /* max-width: 550px; */
    margin: 0 auto;
  }

  .featContact {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .feat{
    width: 160px;
    margin: 5px;
  }

  .label__title {
    position: relative; 
    border: 1px solid navy;
    padding: 3px; 
  }

  input::placeholder{
    color: navy;
  }

  .notes {
    width: 510px;
    max-height: 500px;
  }

  .ubi__Tags {
    display: flex;
    flex-direction: row;
  }

  .card__container {
    width: 90%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: center;
    gap: 10px;
  }

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

  @media(max-width:400px){
    .inp__lat{
      flex-direction: column;
    }
    .in__sel {
      width: 100%;
    }
  }
</style>

