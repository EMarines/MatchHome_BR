<!-- <script>
   export let data;
   console.log(data)
</script>
    <div class="container"> -->

  
  <!-- Datos Personales -->
    <!-- <h1 class="sectionTitle">Alta Contactos{data}</h1> -->

  <!-- Muestro o oculta la fecha para mostrar o editar -->
        <!-- <div class=""> -->
           <!-- <div>
              {#if contStatus = "editing"}
                 <input class=" dataInput" type="date" bind:value={contact.createdAt}  />
              {:else}
                 <h3 class=" dataInput" on:dblclick={mostInput} >{contact.createdAt}</h3>
              {/if}
           </div> -->

<!-- 
           
           <div class="contactInput">
              <input  class="dataInput" type="text" placeholder="Nombre" bind:value={contact.name}  required/>
          
              <input class="dataInput" type="text" placeholder="Apellido" bind:value={contact.lastname} />
           </div>

           <div class="contactInput">
              <input class="dataInput" type="tel" placeholder="teléfono" bind:value={contact.telephon} required/>
              {#if detaAdd}
                 <input class="dataInput" type="email" placeholder="email" bind:value={contact.email} />
              {/if}
           </div> -->

        
  <!-- Propiedad de Contacto -->
        <!-- <div class="col">
           <select class=" dataInput" id="selTP" name="selTP" bind:value={contact.propCont}>
              <option disabled selected value="">Propiedad de Contacto</option>
              {#each allPropertiesName as typeProperty}
              <option class=" dataInput" type="checkbox" value={typeProperty}>{typeProperty}</option>
              {/each}
           </select>
            -->
  <!-- Tope de Presupuesto -->
           <!-- {#if detaAdd}
              <input class=" dataInput" type="number" placeholder="Presupuesto"bind:value={contact.budget}/>
           {/if} -->
        <!-- </div> -->

  <!-- Comentarios del contacto -->
        <!-- <div class="col">
           <textarea class="textareaInput" placeholder="Comentarios" bind:value={contact.comContact}/>
        </div> -->

        

  <!-- Tipo de Contacto -->
        <!-- <select class="othersInput" bind:value={contact.typeContact}>
           <option disabled selected value="">Tipo de Contacto</option>
           {#each typeContacts as typeContact}
           <option type="checkbox" value={typeContact}>{typeContact}</option>
           {/each}
        </select>        -->
        
  <!-- Modo de Contacto -->
        <!-- <select class="othersInput" bind:value={contact.selecMC}>
           <option disabled selected value="">Modo de Contacto</option>
           {#each modeContact as selecMC}
           <option type="checkbox" value={selecMC}>{selecMC}</option>
           {/each}
        </select> -->

  <!-- Tipo de propiedad buscada -->
           <!-- <select class="othersInput" id="selTP" name="selTP" bind:value={contact.selecTP}>
              <option disabled selected value="">Tipo de Propiedad</option>
              {#each typeProperties as selecTP}
                    <option type="checkbox" value={selecTP}>{selecTP}</option>
              {/each}
           </select> -->
  <!-- Rango de busqueda -->
           <!-- <select class="othersInput" id="ranges" name="ranges" bind:value={$contact.rangeProp} >
              <option disabled selected value="">Rango de Busqueda</option>
              {#each ranges as range}
                    <option type="checkbox" value={range} >{range}</option>
              {/each}
           </select> -->
     
  <!-- Modo de Pago -->
        <!-- {#if detaAdd}
        <select class="othersInput" bind:value={$contact.modePay}>
           <option disabled selected value="">Modo de Pago</option>
           {#each modePays as modeP}
           <option type="checkbox" value={modeP}>{modeP}</option>
           {/each}
        </select> -->





  <!-- Características buscadas -->
        <!-- <select class="othersInput" bind:value={$contact.numBeds}>
           <option disabled selected value="" ># Recámaras</option>
           {#each oneTofive as beds}
           <option type="checkbox" value={beds} >{beds} Recámaras</option>
           {/each}
        </select>

        <select class="othersInput" bind:value={$contact.numBaths}>
           <option disabled selected value=""># Baños</option>
           {#each oneToFour as bathroom}
           <option type="checkbox" value={bathroom}>{bathroom} baños</option>
           {/each}
        </select>

        <select class="othersInput" bind:value={$contact.halfBathroom}>
           <option disabled selected value=""># Medios Baños</option>
           {#each oneToFour as numberHalfBath}
           <option type="checkbox" value={numberHalfBath}>{numberHalfBath} Medios baños</option>
           {/each}
        </select>

        <select  class="othersInput"bind:value={$contact.numParks}>
           <option disabled selected value=""># Estacionamientos</option>
           {#each oneToFour as park}
           <option type="checkbox" value={park}>{park} Estacionamientos</option>
           {/each}
        </select> -->
  <!-- Ubicacion y etiquetas -->
        <!-- <div class="ubiTags">
           <Ubication bind:ubication = {$contact.locaProperty} />
           <Tags bind:tag = {$contact.tagsProperty} />
           <Stages bind:stage = {$contact.contactStage} />
        </div>
     {/if} -->

     <!-- <button class="btn__save" on:click={detaAlta}>Alta Detalles</button>

    </div> -->
  <!-- </div> -->