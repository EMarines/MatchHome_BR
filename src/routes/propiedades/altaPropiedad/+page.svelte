<script>
  // importaciones
    import { property, systStatus, currPropList } from '$lib/stores/store.js'
    import { collection, addDoc, deleteDoc, getDoc, getDocs, doc, updateDoc, onSnapshot} from 'firebase/firestore';
    import { db } from '../../../firebase'
    import{ goto } from '$app/navigation'
    import { operTypes, typeProperties, ubications, oneToFour, oneToFive } from '$lib/parameters';
    import Tags from '$lib/components/Tags.svelte'
    // import { onSnapshot } from '@firebase/firestore'
    import { onDestroy } from 'svelte';
    import { sortList } from '$lib/functions/sort.js'



    

  // HandeleSubmit
      async function handleSubmit() { 
         if($systStatus === "editing"){      
            // @ts-ignore
            await updateDoc(doc(db, "properties", $property.id), $property)
          goto("/propiedades/propSelect")

         } else {
          let createdAt = Date.now()
            $property = {         
              // @ts-ignore
              ...$property, createdAt
            } 
            const contToAdd = collection(db, "properties")
            await addDoc(contToAdd, $property);

          let result = window.confirm("Deseas compartir esta propiead?")
        if(result){
            console.log("no borrar y continuar")
          } else {
            // @ts-ignore
            $property = {}
          }
          goto("/propiedades")
        }
            $systStatus = ""
      };

  // Cancel Button
    function onCancel() {
      goto("/propiedades")
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
      // $: propToRender = $currPropList


    
</script>

<div class="cont__alta">
  <h1>Alta Propiedad</h1>

  <div class="features">

    <label class="label__title">
      <p class={$property.selecTO ? ' above' : ' center'}>Tipo de Operación</p>
      <select class="in__sel" name="selecTO" bind:value={$property.selecTO} placeholder="Tipo de Operación">
        <option value="" disabled selected>* Tipo de Operación</option>
        {#each operTypes as operType}
          <option value={operType.toLocaleLowerCase()}>{operType}</option>
        {/each}
      </select>
    </label>

    <label class="label__title">
      <p class={$property.selectTP ? ' above' : ' center'}>Tipo de Propiedad</p>
      <select class="in__sel" name="selectTP" bind:value={$property.selectTP}>
        <option value="" disabled selected>* Tipo de Propiedad</option>
        {#each typeProperties as propType}
          <option value={propType} >{propType}</option>
        {/each}
      </select>
    </label>

    <label class="label__title">
      <p class={$property.beds ? ' above' : ' center'}>Número de Recámaras</p>
      <select class="in__sel" name="bedrooms" bind:value={$property.beds} >
        <option value="" disabled selected>* Número de Recámaras</option>
        {#each oneToFive as bedrooms}
          <option value={bedrooms} >{bedrooms}</option>
        {/each}
      </select>
    </label>
    
    <label class="label__title">
      <p class={$property.bathroom ? ' above' : ' center'}>Numero de Baños</p>
      <select class="in__sel" name="bathrooms" bind:value={$property.bathroom} placeholder="Baños">
        <option value="" disabled selected>* Número de Baños</option>
        {#each oneToFour as baths}
          <option value={baths} >{baths}</option>
        {/each}
      </select>
    </label>

    <label class="label__title">
      <p class={$property.halfBathroom ? ' above' : ' center'}>Medios Baños</p>
      <select class="in__sel" name="halfBathroom" bind:value={$property.halfBathroom} placeholder="Medios Baños">
        <option value="" disabled selected>* Medios Baños</option>
        {#each oneToFour as hbaths}
          <option value={hbaths} >{hbaths}</option>
        {/each}
      </select>
    </label>

    <label class="label__title">
      <p class={$property.park ? ' above' : ' center'}>Estacionamientos</p>
      <select class="in__sel" name="park" bind:value={$property.park} placeholder="Estacionamientos">
        <option value="" disabled selected>* Estacionamientos</option>
        {#each oneToFour as parks}
          <option value={parks} >{parks}</option>
        {/each}
      </select>
    </label>

    <label class="label__title">
      <p class={$property.areaBuilding ? ' above' : ' center'}>Construcción</p>
      <input class="in__sel" name="areaBulding" bind:value={$property.areaBuilding} placeholder="* Construcción">
    </label>

    <label class="label__title">
      <p class={$property.areaTotal ? ' above' : ' center'}>Terreno</p>
      <input class="in__sel" name="areaTotal" bind:value={$property.areaTotal} placeholder="* Terreno">
    </label>

    <label class="label__title">
      <p class={$property.nameProperty ? ' above' : ' center'}>Nombre de la Propiead</p>
      <input class="in__sel" name="nameProperty" bind:value={$property.nameProperty} placeholder="* Nombre de la Propiead">
    </label>

    <label class="label__title">
      <p class={$property.colonia ? ' above' : ' center'}>Colonia</p>
      <input class="in__sel" name="colonia" bind:value={$property.colonia} placeholder="* Colonia">
    </label>

    <label class="label__title">
      <p class={$property.price ? ' above' : ' center'}>Precio</p>
      <input class="in__sel" name="Price" bind:value={$property.price} placeholder="* Precio">
    </label>  
    
    <label class="label__title">
      <p class={$property.claveEB ? ' above' : ' center'}>Clave</p>
      <input class="in__sel" name="claveEB" bind:value={$property.claveEB} placeholder="* Clave">
    </label>

    <label class="label__title">
      <p class={$property.urlImage ? ' above' : ' center'}>Link Imagen</p>
      <input class="in__sel" name="urlImage" bind:value={$property.urlImage} placeholder="* Link Image">
    </label>

    <label class="label__title">
      <p class={$property.urlProp ? ' above' : ' center'}>Link Propiedad</p>
      <input class="in__sel" name="urlProp" bind:value={$property.urlProp} placeholder="* Link Propiedd">
    </label>

    <label class="label__title">
      <p class={$property.locaProperty ? ' above' : ' center'}>Ubicación</p>
      <select class="in__sel" name="locaProperty" bind:value={$property.locaProperty}>
        <option value="" disabled selected>* Ubicación</option>
        {#each ubications as ubication}
          <option value={ubication} >{ubication}</option>
        {/each}
      </select>
    </label>

    <Tags bind:tags = {$property.tagsProperty}/>

  </div>
  
    <button class="bt__SaveEdit" on:click={handleSubmit}>{#if $systStatus === "addProperty"}Guardar{:else}Editar{/if}</button>

    <button class="btn-cancel" on:click={onCancel}>Cancel</button>
</div>



<style>

  .bt__SaveEdit {
    width: 300px;
    margin: 15px;
    padding: 5px;
    border-radius: 8px;
    color: white;
    background: blue;
  }

  .cont__alta{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .in__sel {    
    padding: 13px 0 10px 8px;
    width: 550px;
    border-radius: 4px;
    border-color: 2px solid blue;
    font-family: cursive;
    font-size: 1em;
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

  .label__title {
    position: relative;
    /* border: 1px solid navy; */
    /* padding: 3px; */
  }

  input::placeholder{
    color: navy;
  }
</style>