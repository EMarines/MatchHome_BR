<script>
// @ts-nocheck

  import { dbContacts, dbProperties } from "../../../firebase";
  import Search from '$lib/components/Search.svelte'
  import { modePays } from "$lib/parameters.js";

  let contToRender = [];
  let propToRender = [];
  let tramit = [];
  let searchTerm = "";
  let modeP = "";
  let addOwner = false;
  let ownerName = "";
  let typPay = "";
  let searchTermC = "";
  let searchTermP = "";
  let cont, prop = "";

  console.log(addOwner);

  function findContact(){
      return contToRender = dbContacts.filter((contact) => {
        let contInfo = (contact.name + " " + contact.lastname).toLowerCase();
        return contInfo.includes(searchTermC.toLowerCase());
      });  
    };

    function findProperty(){
      return propToRender = dbProperties.filter((property) => {
        let propInfo = (property.nameProperty + " " + property.claveEB).toLowerCase();
        return propInfo.includes(searchTermP.toLowerCase());
      });  
    };

    function contSelec(cont){
      contToRender = [];
      tramit.buyer = (`${cont.name} ${cont.lastname}`)
      console.log(searchTermC);
      searchTermC = tramit.buyer
      console.log(searchTermC);
      tramit.push(tramit.buyer);
    }
    
    function propSelec(prop){
      propToRender = [];
      tramit.property = prop.id
      tramit.nameTramit = prop.nameProperty
      tramit.push(tramit.property)
      tramit.push(tramit.nameTramit)
      searchTermP = tramit.nameTramit
      if(!tramit.ownerName){
        addOwner = true
      }
      searchTerm = "";
    }
    
    function modePay(){
      tramit.modePay = modePay
      tramit.owner = ownerName
      tramit.push(tramit.modePay)
      tramit.push(tramit.owner)
      
      console.log(tramit, addOwner);
    }

    // function addOwner(){
      
    // }
  
</script>

<section class = "container">
  <div>
    <h1 class="title">Agregar Nuevo Trámite</h1>
  </div>

  <div class="form">

    <label for="contact">Comprador</label>
    <input bind:value = {searchTermC} on:input={findContact(searchTermC)} on:keydown={()=>{}} id="contact" placeHolder="Contacto" />
      <div class="contSelect">
        {#each contToRender as cont}
          <div class="contSelec" on:dblclick={contSelec(cont)}>
            <h3>{cont.name} {cont.lastname}</h3>
          </div>
        {/each}
      </div>

      <label for="property">Propiedad</label>
        <input bind:value = {searchTermP} on:input={findProperty(searchTermP)} on:keydown={()=>{}} id="property" placeHolder="Propiedades"/>
          <div>
            {#each propToRender as prop}
              <div class="contSelec" on:dblclick={propSelec(prop)}>
                <h3>{prop.nameProperty} {prop.claveEB}</h3>
              </div>
            {/each}
          </div>
          <div>
            {#if addOwner}
            <label for="ownerName">Nombre del Propietario</label>
            <input type="text" bind:value={ownerName} id="ownerName">
            {/if}
          </div>
 
        <label class="label__title"> Modo de Pago
          <p class={tramit.modePay ? ' above' : ' center'} >Modo de Pago</p> 
            <select class="in__sel" bind:value={modeP} on:change={modePay}>
              <option placeholder="Modo de Pago">Modo de Pago</option>
              {#each modePays as modeP}
                  <option  value={modeP}>{modeP}</option>
              {/each}            
            </select>
        </label>
    
      </div>

</section>

<style>
  .in__sel{

  }
</style>