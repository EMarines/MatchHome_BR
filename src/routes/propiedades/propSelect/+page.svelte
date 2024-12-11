<script>
	// @ts-nocheck
	// Importaciones y declaraciónes
  	import { sendWhatsApp, closeWindow } from '$lib/functions/sendWhatsApp';
		import { db, dbBinnacle, dbContacts } from '../../../firebase';
		import { property, contact, binnacle, systStatus, currPropList, currContList, currBinnList } from '$lib/stores/store';
		import { toComaSep } from '$lib/functions/format.js';
		import { diaTarde } from '$lib/functions/dateFunctions';
		import BtnWA from '$lib/components/BtnWA.svelte';
		import BtnFollLink from '$lib/components/BtnFollink.svelte';
		import BtnFind from '$lib/components/BtnFind.svelte';
		import BtnCancel from '$lib/components/BtnCancel.svelte';
		import { filtPropContInte } from '$lib/functions/filContacts.js'
		import { goto } from '$app/navigation';
		import { deleteDoc, doc, collection, updateDoc, onSnapshot, addDoc, persistentMultipleTabManager } from '@firebase/firestore';
		import { onDestroy } from 'svelte';
		import CardContact from '$lib/components/CardContact.svelte'
		import { sortBinnacle } from '$lib/functions/sort.js'
		import { formatDate } from '$lib/functions/dateFunctions.js'
		import { capitalize } from '$lib/functions/capitalize.js'
		import { tagToUbicacion, tagToFeatures } from '$lib/functions/tagConverters'
		
			let saludoHora = '';
			let modeAction = '';
			let poroShowTo =["Por_Enviar", "Ya_Se_Envió", "Posobles_Interesados" ];
			let contInterested = "";
			let contInterest = [];
			let contToRender = [];
			$:contCheck = [];
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

			$: contFalt = contIntToSend - sig;
			$: contIntToSend = contCheck.length;
			$: contInitial = contToRender;

			

  
	// Renderiza currBinnList
			const unsubB = onSnapshot(
				collection(db, "binnacles"),
					(querySnapshot) => {
						$currBinnList = querySnapshot.docs.map(doc => {
							return{...doc.data(), id: doc.id}
						})
						return sortBinnacle($currBinnList)
					},
						(err) =>{
							console.log(err);
					}
			);           
			onDestroy(unsubB)

	// Edty Property
		function editProp() {
			$systStatus = 'editing';
			goto('/propiedades/altaPropiedad');
		}

	//  Delete Property
		async function deleProperty() {
			if (confirm('Deseas eleiminar definitivamente la propiedad?')) {
				await deleteDoc(doc(db, 'properties', $property.id));
				goto('/propiedades');
			} else {
				return;
			}
		}

	// Cancel
		function actCancel() {
			$property = [];
			goto('/propiedades');
		}
		
		function cancel(){
			$systStatus = "";
			goto('/propiedades');

		}

	// Separar contactos agrupados
	 	function listToRender(){ 
			contCheck = [];
			showBtn = true
			contInterest = filtPropContInte($property, $currContList)
			if(contInterested === "Posobles_Interesados"){
				msgToShow = "Contactos Les Puede Interesar Esta Propiedad"
					contToRender = contInterest
			} else if(contInterested === "Por_Enviar"){
					toSend=[];
					msgToShow = "Pendiente Para Enviar Esta Propieadad"
					res =  $currBinnList.filter(item =>
					item.comment === $property.public_id)
					const contsT = res.map(doc => doc.to)
					toSend = contInterest.filter(doc => !contsT.includes(doc.id))               
					contToRender = toSend
			} else if(contInterested === "Ya_Se_Envió"){
					sent=[];
					msgToShow = "Ya se les envió esta propiedad"
					res = $currBinnList.filter(item =>
					item.comment === $property.public_id)
					$currContList.filter((cont) =>{
						res.forEach(binn => {
							if(cont.id === binn.to){
								sent.push(cont)
								}
							})
							contToRender = sent
					})
			} 
		};

	// Muestra listado de contactos interesados
		function findCustomers() {

			contInterested = "Por_Enviar"
			listToRender($property, $currContList)
			show__contacts = !show__contacts
			$systStatus = "sendPropToContacts"
		}

	//  Send WhatshApp with Message and Property
		async function sendWA() {
			saludoHora = diaTarde();
			$contact = contToSend
			let contacto = capitalize($contact.name)
			let msg = `${$property.public_url}    ${contacto}. ${saludoHora}  ${mensaje}`;
			let tel = $contact.telephon
			sendWhatsApp(tel, msg)
			$binnacle = {"date": Date.now(), "comment": $property.public_id, "to": $contact.id, "action": "Propiedad enviada: "}
			console.log($binnacle, "binnacle from sendWA propSelect")
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

	// Envía en bucle la propiedad a uno o varios contactos
		function sendProperty() {
			if(mensaje === ""){
				alert("Tienes que escribir un mensaje para enviar las propiedades")
				return
			}
			contToSend = contCheck[sig]
			contFalt = contCheck.length - (sig + 1)
			$systStatus = "sendProps"
			sendWA(contToSend)
			if ( contIntToSend === sig + 1 ) {
				setTimeout ( function(){
					$systStatus = "";
					contCheck = [];
					contIntToSend = 0;
					show__contacts = false;
					sig = 0;
					contFalt = 0;
					return
				}, 2000);
			};
				sig ++
		};

			// Selecciona todos los contactos o los deselecciona
		function selectAll(e){
			contCheck = e.target.checked ? [...contToRender] : [];
		}

</script>

	<!-- Title -->
		<div class="container">

		<div class="mainContainer">
			<h2>Propiedad Seleccionada</h2>

	<!-- Muestra la propieda seleccionada -->
			<div class="prop__ima__info">
				<div class="prop__image">
					<p class="prop__clave">{$property.public_id}</p>
					<img src={$property.images[0].url} alt={$property.location.name} />
				</div>

				<div class="prop__card">
					<div class="prop__info">
						<div class="propTitle">
							<h1 class="title">{$property.property_type} en {$property.location.name.replace("Chihuahua, Chihuahua", "").replace("I,", "")} en {$property.operations[0].type === "sale" ? "Venta" : "Renta"}</h1>
						</div>
						<div class="prop__price">
							<h2>Precio $ {toComaSep(Number($property.operations[0].amount))}.</h2>
							<p class="alta__prop">Alta: {formatDate($property.created_at)}</p>
						</div>
						<div class="prop__cont">
							<div class="prop__features">
								{#if $property.property_type === 'Casa' || $property.property_type === 'Departamento'}
									<span> {Number($property.bedrooms)}  <i class="fa-solid fa-bed to__show"></i></span>
									<span> {Number($property.bathrooms)} <i class="fa-solid fa-bath to__show"></i></span>
									{#if $property.half_bathrooms}
										<span> {Number($property.half_bathrooms)} <i class="fa-solid fa-toilet to__show"></i></span>										
									{/if}
									{#if $property.parking_spaces}
										<span> {Number($property.parking_spaces)} <i class="fa-solid fa-car-rear to__show"></i></span>										
									{/if}
									<!-- <span> {Number($property.halfBathroom)} <i class="fa-solid fa-bath to__show"></i></span> -->

									<span>{Number($property.construction_size)} m² <i class="fa-solid fa-ruler-combined"></i></span>
									<span>{$property.lot_size} m² <i class="fa-solid fa-chart-area"></i></span>
								{:else if $property.property_type === 'Terreno'}
									<span>{$property.lot_size} m² <i class="fa-solid fa-chart-area"></i></span>
								{/if}
							</div>
							<div class="prop__features">
								{#if $property.tags.length > 0}
										<span> <i class="fa-sharp fa-regular fa-compass to__showR"></i> {tagToUbicacion($property?.tags)} </span>              
										<span><i class="fa-solid fa-tags to__showR"></i> {tagToFeatures($property.tags)} </span>              
								{/if}
							</div>
						</div>
					</div>
					<div class="actions">
						<i on:click={() => {editProp($property.public_id)}} on:keydown={() => {}} class="fa-regular fa-pen-to-square" />
						<i on:click={() => {deleProperty($property.public_id)}}	on:keydown={() => {}}	class="fa-regular fa-trash-can"	/>
					</div>
				</div>
			</div>
	<!-- Botones -->
			<div class="btn__options">
				{#if $systStatus !== "sendPropToContacts"} 
					<BtnWA on:click={sendWA} />
					<BtnFind on:click={findCustomers} />
					<BtnCancel on:click={actCancel} />
					<BtnFollLink />
				{:else} 
					<button on:click={cancel}>
						Regresar
						<!--  -->
					</button>
				{/if}
			</div>

	<!-- Muestra opciones para buscar contactos interesados -->
			{#if show__contacts}
				<div class="mainContainer">
					<div class="sel__msg">
							<textarea type="text" bind:value={mensaje} placeholder="Escribe el mensaje a enviar"/>
					</div>
					
					<div class="sect__Title">					
						{#if contToRender.length === 0}
							<h1>No hay contactos para enviar</h1>
						{:else }
							<h1>A {contInitial.length} {msgToShow}</h1>
						{/if}					

						<div class="opti__cont">
							{#each poroShowTo as list}
									<label>
										<input type="radio" bind:group={contInterested} value={list} on:change={listToRender}>
										{list.replaceAll("_", "  ")}
									</label>
							{/each}
						</div>
					</div>
				</div>
				
	<!-- Muestra los contactos a los que le puede interesar la propiedad -->
				<div class="btn__send">
					{#if showBtn}
						<button id="Evio_prop_selec" class="send__Prop" on:click={sendProperty}>{`Total para enviar ${contIntToSend}. faltan ${contFalt}`}</button>
						<label>
							<input type="checkbox" on:change={selectAll}> Seleccionar todos
						</label>
						{/if}
				</div>
				<div class="cards__container">
					{#each contToRender as cont}
					<div class="card__container">
						<input type="checkbox" value={cont} name={cont}  bind:group={contCheck} >
						<CardContact {cont}/>         
					</div>
					{/each}        
				</div>  
			{/if}

		</div>

		</div>

<style>
	.mainContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 25px;
	}

  .prop__ima__info {
		display: flex;
		flex-direction: row;
    width: 100%;
		align-items: center;
		justify-content: center;
    padding: 10px;
		gap: 15px;
	}

  .prop__image {
		position: relative;
		display: flex;
    width: 50%;
  }

	.prop__clave {
		position: absolute;
		top: 13px;
		left: 15px;
		background: black;
		opacity: 50%;
		padding: 0 10px;
	}

  .prop__card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 1px solid white;
		width: 50%;
		height: auto;
		gap: 20px;
		padding: 15px;
		border-radius: 8px;
	}

	img {
		width: 98%;
		height: auto;
		border-radius: 8px;
		object-fit: cover;
	}

	h1,
	h2 {
		margin: 0 auto;
		font-weight: 300;
	}

	.title{
		display: flex;
		width: 100%;
		justify-content: center;
		text-transform: capitalize;
		font-size: .5rem;
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

	.prop__price {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
	}
	.prop__cont {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: space-evenly;
	}

	.prop__features {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
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
		flex-wrap: wrap;
	}

	.sel__msg {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.sel__msg textarea {
		width: 650px;
		height: 50px;
		font-size: 1rem;
		background: transparent;
		color: white;
			}

	.sect__Title {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.opti__cont{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 30px;
	}

	.cards__container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		padding-bottom: 20px;
		gap: 8px;
	}

	.btn__send {
		display: flex;
		justify-content: space-evenly;	
		padding: 10px;
		/* background: yellowgreen;	 */
	}

	.send__Prop {
		background: green;
		padding: 5px 15px;
		border-radius: 5px;
	}

	.card__container { 
      display: flex; 
      flex-direction: column; 
      width: 350px;
      /* height: auto;    */
      justify-content: center;
      align-items: center;  
      color: grey;
      border: 1px solid grey;
      border-radius: 5px;
      padding: 8px;
    }

	@media (max-width: 800px) {
		.prop__ima__info {
			flex-direction: column;
			/* width: auto; */
		}
		.prop__image {
			/* display: flex; */
			/* width: 100%; */
			align-items: center;
			justify-content: center;
		}
		.prop__clave {
			top: 350px;
			left: 230px;
		}
		img {
			width: 100%;
		}
		.prop__card {
			width: 98%;
			height: auto;
			padding: 10px;
		}
	}

	@media (max-width: 400px) {
		.prop__image {
			width:100%;
		}
		img {
			width: 95%;
		}
    .prop__card {
      font-size: .8rem;
    }
    .prop__clave {
			top: 15px;
			left: 15px;
    }
		.sel__msg textarea {	
			width: 100%;
		}
  
	}
</style>
