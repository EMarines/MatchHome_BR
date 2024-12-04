<script>
// @ts-nocheck

   import { currContList, currPropList, currBinnList, contact, property, systStatus, binnacle } from '$lib/stores/store.js';
   import { onSnapshot, collection } from '@firebase/firestore';
   import { onDestroy } from 'svelte';
   import { db } from '../../firebase';
   import CardContact  from '$lib/components/CardContact.svelte';
   import { formatDate} from '$lib/functions/dateFunctions';
   import { sendWhatsApp } from '$lib/functions/sendWhatsApp';
   import { diaTarde } from '$lib/functions/dateFunctions';
   import { capitalize } from '$lib/functions/capitalize.js';
   import { contStage, typeContacts, actions } from '$lib/parameters.js'
   import InputOptions from '$lib/components/InputOptions.svelte';
   import InputText from '$lib/components/InputText.svelte';
   import InputDate from '$lib/components/InputDate.svelte';
	import { object } from 'yup';


   const values = [
      { label: 'Etapa', value: "con.contactStage" },
      { label: 'Fecha Creación', value: "con.createdAt" },
		{ label: 'Telefono', value: "con.telephon" },
      { label: 'Bitácora', value: "con.binnacles" }
	];

   $: binnToRender = $currBinnList
   $: contToRender = $currContList
   $: foundTo = found
   $: dateFrom = new Date(date1).getTime()+(1000*3600*18);
   $: dateTo = new Date(date2).getTime()+(1000*3600*18);
   $: selecValue = selected.value;
   $: contFalt = contIntToSend - sig;
   $: contIntToSend = contCheck.length;
   $: contInitial = contToRender;

   let saludoHora = '';
   let modeAction = '';
   let poroShowTo =["Por_Enviar", "Ya_Se_Envió", "Posobles_Interesados" ];
   let contInterested = "";
   let contInterest = [];
   let contToRender = [];
   let contCheck = [];
   let contToSend = {};
   let sent =[];
   let toSend = [];
   let tosend =[];
   let res = [];
   let msgToShow = "Contactos les puede interesar esta propiedad";
   let show__contacts = false;
   let showBtn = false;
   let sig = 0;
   let mensaje ="";
   let typeContact = "";
   let contactStage = "";
   let action
   let found = [];
   let founBinn = [];
   let buscar = "";
   let date1 = 0;
   let date2 = 0;
   let selected = values[0];
   let nextItem = 0;

	// $: console.log(binnToRender, "binnToRender");	
   // Renderiza currPropList
   const unsubC = onSnapshot(
      collection(db, "contacts"),
      (querySnapshot) => {
         $currContList = querySnapshot.docs.map(doc => {
            return{...doc.data(), id: doc.id}
         })
         return $currContList
      },
         (err) =>{
            console.log(err);
      }
   );           
   onDestroy(unsubC)

      // Renderiza currPropList
      const unsubB = onSnapshot(
      collection(db, "binnacles"),
      (querySnapshot) => {
         $currBinnList = querySnapshot.docs.map(doc => {
            return{...doc.data(), id: doc.id}
         })
         return $currContList
      },
         (err) =>{
            console.log(err);
      }
   );           
   onDestroy(unsubB)
   
   function findItems(){
      found = contToRender
      if(dateFrom > 64800000 || dateTo > 64800000) {
         if(dateFrom > dateTo){
            found = contToRender.filter((con) => con.createdAt <= dateFrom && con.createdAt >= dateTo); 
         }else{
            found = contToRender.filter((con) => con.createdAt >= dateFrom && con.createdAt <= dateTo); 
         }
      }
      
      if(action){
         console.log(binnToRender, "bin to render");
         founBinn = binnToRender.filter((bin) => bin.action === action);
         console.log(founBinn, "object");
         return found;
      }

      if (typeContact){
         found = found.filter((con) => con.typeContact === typeContact);
         return found;
      }
      
      if (contactStage){
         console.log(found, contactStage, "found");
         
         if(contactStage === "Etapa 1"){
            found = found.filter((con) => con.contactStage === "" || con.contactStage === "Etapa 1");
            return found;            
         }else{
            found = found.filter((con) => con.contactStage === contactStage);
            return found;            
         }
      }

      if(buscar){
         found = found.filter((con) => (con.name + " " + con.lastname + con.telephon).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(buscar.toLowerCase())
         );
         return found;
      }
      // function searCont() {
      //   return contToRender = $currContList.filter((contact) => {
      //     let contInfo = (contact.name + " " + contact.lastname + contact.telephon).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      //     return contInfo.includes(searchTerm.toLowerCase());
      //   });  
      // };
   }
 
   function cleanFind(){
      date1 = new Date(Date.now());
      date2 = 0;
      found = [];
      buscar = "";
      contactStage = "";
      typeContact = "";
      action = "";
   }

   // Selecciona todos los contactos o los deselecciona
		/**
	 * @param {{ target: { checked: any; }; }} e
	 */
		function selectAll(e){
			contCheck = e.target.checked ? [...found] : [];
		}

   // Envía en bucle la propiedad a uno o varios contactos
		function sendMsg() {
			if(mensaje === ""){
				alert("Tienes que escribir un mensaje para enviar las propiedades")
				return
			}
         if(date1 > date2){
            
         }
			contToSend = contCheck[nextItem]
			contFalt = contCheck.length - nextItem + 1
			$systStatus = "sendProps"
			sendWA(contToSend)
			if ( contIntToSend === nextItem + 1 ) {
				setTimeout ( function(){
					$systStatus = "";
					contCheck = [];
					contIntToSend = 0;
					show__contacts = false;
					nextItem = 0;
					contFalt = 0;
					return
				}, 2000);
			};
				nextItem ++
		};

      async function sendWA() {
			$contact = contToSend
			let msg = `${diaTarde()} ${capitalize($contact.name)}. ${mensaje}`;
			sendWhatsApp($contact.telephon, msg)
            $binnacle = {"date": Date.now(), "comment": mensaje, "to": $contact.telephon, "action": action}
			try {
				const binnacleToAdd = collection(db, "binnacles")
				await addDoc(binnacleToAdd, $binnacle);					
			} catch (error) {
				console.log(error);
			};

			if($systStatus === "sendPropToContacts"){
				$contact = "";
				listToRender($property, $currContList)
			}
		}
  
</script>

<section class="container">

   <div class="pageContainer">

      <div class="paramsToFind">

         <div class="inputsData">
            <!-- Busqueda por fechas -->  
            <div class="forDate">
                  <label for="fecha_inicial"> Inicial
                     <InputDate identifier="fecha_inicial" name="De " bind:value={date1} />                     
                  </label>
                  <label for="fecha_final"> Hasta
                     <InputDate identifier="fecha_final" name="Hasta" bind:value={date2} />
                  </label>
                  <!-- {#if  date2.toString() === "0"}
                  <br/> 
                     <h3>Busqueda de {formatDate(date1)} <br/> hasta el {formatDate(date2)}</h3>
                  {/if} -->
            </div>
      
            <!-- Busqueda por tipo de contacto -->
            <div class="forType">
               <InputOptions  identificador="typeContact" name="Tipo de Contacto" choices={typeContacts} bind:value ={typeContact}/>
               <InputOptions  identificador="contactStage" name="Etapa" choices={contStage} bind:value ={contactStage}/>
            </div>

               <!-- Busqueda por palabra a buscar -->
               <div class="forType">
                  <!-- <label for="find"> -->
                     <!-- <input id="find" bind:value={buscar} type="text" placeholder="Palabras a buscar"> -->
                     <InputOptions  identificador="action" name="Acción" choices={actions} bind:value ={action}/>
                     <InputText identifier="buscar" name="Buscar Palabras" bind:value={buscar} /> 
                  <!-- </label> -->
               </div>
            </div>
         <!-- </div> -->
          
         <!-- Busqueda por mensaje -->
         <div class="sel__msg">

            
            <!-- Botones -->
            <div class="buttons">
               <button type = "sumbit" on:click={findItems}>Buscar</button>    
               <button on:click={cleanFind}>Limpiar</button>
            </div>

         </div>

      </div>
      
      <div class="msgToSend">

         <textarea type="text" bind:value={mensaje} placeholder="Escribe el mensaje a enviar"/>
         <div class="buttonSend">
            <button id="Evio_prop_selec" class="send__Prop" on:click={sendMsg}>{`Total para enviar ${contIntToSend}. faltan ${contFalt}`}</button>
         </div>

      </div>

      <div class="retroInfo">

         {#if found.length > 0}
            <h3 class="title" >Contactos encotrados {found.length}</h3>
         {:else}
            <h3 class="title">No hay contactos a mostrar</h3>
         {/if}


         <label>
            <input class="contMesage" type="checkbox" on:change={selectAll}> Seleccionar todos
         </label>

      </div>

         <div class="cardContainer">
            {#each found as cont}
               <div class="card__container">
						<input type="checkbox" value={cont} name={cont}  bind:group={contCheck} >
                  <CardContact {cont} />              
               </div>
            {/each}
         </div>
         
   </div>
</section>

<style>

   .card__container { 
      display: flex; 
      flex-direction: column; 
      width: 350px;
      height: 130px;   
      justify-content: center;
      align-items: center;  
      border: 1px solid grey;
      border-radius: 5px;
      padding: 8px;
      cursor: pointer;
    }

    .cardContainer{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }

   .paramsToFind{
      gap: 8px;
   }

   .inputsData{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 25px;
   }

   .forDate, .forType{
      display: flex;
      height: auto;
      align-items: center;
      padding: 0;
      gap: 8px;
   }

   .sel__msg{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 25px;
      margin-top: 25px;
   }

   textarea{
      width: 60%;
      height: 60px;
      border-radius: 8px;
      padding: 8px;
      color: navy;
      font-weight: 800;
   }

   button {
      width: 190px;
      height: 30px;
      border-radius: 8px;
      background-color: blue;
      color: antiquewhite;
      font-weight: 800;
      cursor: pointer;
   }

   .buttons :hover{
      background-color: navy;
   }

   .buttons{
      display: flex;
      gap: 8px;
   }

   .msgToSend{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      gap: 8px;
   }

   .retroInfo{
      display: flex;
      justify-content: space-evenly;
      margin-top: 35px;
   }

   .send__Prop {
      width: auto;
      padding: 0 15px;
   }

   .buttonSend :hover {
      background-color: navy;
   }
</style>

