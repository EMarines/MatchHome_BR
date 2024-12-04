<script>
// @ts-nocheck


  // importaciones
    import { property, systStatus, currPropList } from '$lib/stores/store.js'
    import { collection, addDoc, deleteDoc, getDoc, getDocs, doc, updateDoc, onSnapshot} from 'firebase/firestore';
    import { db } from '../../../firebase'
    import{ goto } from '$app/navigation'
    import { operTypes, typeProperties, ubications, oneToFour, oneToFive } from '$lib/parameters';
    import Tags from '$lib/components/Tags.svelte'
    import { onDestroy } from 'svelte';
    import { sortList } from '$lib/functions/sort.js'
    import InputOptions from '$lib/components/InputOptions.svelte';
    import InputText from '$lib/components/InputText.svelte';
    import InputDate from '$lib/components/InputDate.svelte';
    import { cleanNumber } from '$lib/functions/format.js'
    // import { formatDate } from '$lib/functions/dateFunctions.js'
    // import { onSnapshot } from '@firebase/firestore'

  // HandeleSubmit
      async function handleSubmit() { 
        // $property.price = parseInt($property.price) 
        if($property.price){$property.price = cleanNumber($property.price)};

        try { 
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
        } catch (error) {
          console.log(error)
        }
      }

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

<div class="prop__alta">
  <h1>Alta Propiedad</h1>

    <div class="features">
      <div>
        {#if $systStatus === "editing"}
          <InputDate identifier="createdAt" name="* Alta en " bind:value={$property.createdAt} />
        {/if}
      </div>

      <InputOptions identificador="selecTO" name="Tipo de Operación" choices={operTypes} bind:value ={$property.selecTO}/>
    
      <InputOptions identificador="selectTP" name="Tipo de Propiedad" choices={typeProperties} bind:value ={$property.selectTP}/>

    </div>
  
    <div class="features">
      
      <InputOptions  identificador="bedrooms" name="* Número de Recámaras" choices={oneToFive} bind:value ={$property.beds}/>
      
      <InputOptions identificador="bathroom" name="* Número de Baños" choices={oneToFour} bind:value ={$property.bathroom}/>
      
      <InputOptions identificador="halfBathroom" name="* Medios Baños" choices={oneToFour} bind:value ={$property.halfBathroom}/>
      
      <InputOptions identificador="parks" name="* Estacionamientos" choices={oneToFour} bind:value ={$property.park}/>

    </div>

    <div class="features">

      <InputText identifier="areaBuilding" name="* Construcción" bind:value={$property.areaBuilding} />  

      <InputText identifier="areaTotal" name="* Terreno" bind:value={$property.areaTotal} /> 
      
      <InputText identifier="colonia" name="* Colonia" bind:value={$property.colonia} /> 
    
      <InputText identifier="price" name="* Precio" bind:value={$property.price} /> 
        
    </div>
    
    <div class="features">
      
      <InputText identifier="nameProperty" name="* Nombre de la Propiedad" bind:value={$property.nameProperty} /> 
      
      <InputText identifier="claveEB" name="* Clave" bind:value={$property.claveEB} /> 
      
      <InputText identifier="urlImage" name="* Link Imagen" bind:value={$property.urlImage} /> 
      
      <InputText identifier="urlProp" name="* Link Propiedad" bind:value={$property.urlProp} /> 
      
    </div>

    <div class="prop__tags">

      <InputOptions identificador="locaProperty" name="Ubicación" choices={ubications} bind:value ={$property.locaProperty}/>

      <Tags bind:tags = {$property.tagsProperty}/>

    </div>

    <div class="features">
    
      <button class=" btn bt__saveEdit" on:click={handleSubmit}>{#if $systStatus === "addProperty"}Guardar{:else}Guardar Cambios{/if}</button>

      <button class="btn btn__cancel" on:click={onCancel}>Cancel</button>

    </div>
</div>

<style>

  .prop__alta{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
    flex: 1;
  }

  .features {
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 5px;
    flex-wrap: wrap;
  }

  .prop__tags {
    display: flex;
    flex-direction: column;  
    align-items: center;
    justify-content: center;
    gap: 8px;
  } 

  .btn{
    width: 300px;
    margin: 15px;
    padding: 5px;
    border-radius: 8px;
    color: gray;
  }

  .bt__saveEdit {    
    background: blue;
  }

  .btn__cancel {    
    background: yellow;
  }
</style>