<script>
	// @ts-nocheck
	// Importaciones
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

	// declaraciones
		let saludoHora = '';
		let modeAction = '';
		let poroShowTo =["Por_Enviar", "Ya_Se_Envió", "Posobles_Interesados" ];
    let contInterested = "";
		let contInterest = [];
		let contToRender = [];
		let conts = [];
    let sent =[];
    let toSend = [];
    let tosend =[];
    let res = [];
    let msg = "Contactos les puede interesar esta propiedad";
		let show__contacts = false;
    // let seeCont = true;
    // let bitacora = dbBinnacle;


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
				// $systStatus = "propDeleting"
				await deleteDoc(doc(db, 'properties', $property.id));
				$property = [];
			} else {
				return;
			}
			goto('/propiedades');
		}

	// Cancel
		function actCancel() {
			$property = [];
			goto('/propiedades');
		}

	// Separar contactos agrupados
	 	function listToRender(){ 
			contInterest = filtPropContInte($property, $currContList)
			if(contInterested === "Posobles_Interesados"){
					msg = "Contactos Les Puede Interesar Esta Propiedad"
					contToRender = contInterest
			} else if(contInterested === "Por_Enviar"){
					toSend=[];
					msg = "No Se Les Ha Enviado Esta Propieadad"
					res =  $currBinnList.filter(item =>
					item.comment === $property.nameProperty)
					const contsT = res.map(doc => doc.to)
					toSend = contInterest.filter(doc => !contsT.includes(doc.telephon))               
					contToRender = toSend
			} else if(contInterested === "Ya_Se_Envió"){
					sent=[];
					msg = "Ya se les envió esta propiedad"
					res = $currBinnList.filter(item =>
					item.comment === $property.nameProperty)
					$currContList.filter((cont) =>{
						res.forEach(binn => {
							if(cont.telephon === binn.to){
								sent.push(cont)
								}
							})
							contToRender = sent
					})
			} 
		};

	// Muestra listado de contactos interesados
		function findCustomers() {
			listToRender($property, $currContList)
			show__contacts = !show__contacts
			$systStatus = "sendPropToContacts"
		}

	//  Send WhatshApp with Message and Property
		async function sendWA() {
			saludoHora = diaTarde();
			let msg = `${$contact.name}. ${saludoHora}  Te envío esta casa que creo te va a interesar. ¡Saludos!`;
			let link = `https://api.whatsapp.com/send?phone=52${$contact.telephon}&text=${$property.urlProp}         🏠 ${msg} 👍 `;
			window.open(link, 'ventana1', 'width=350,height=350,scrollbars=NO');
			 	$binnacle = {"date": Date.now(), "comment": $property.nameProperty, "to": $contact.telephon, "action": "Propiedad enviada: "}
				try {
					const binnacleToAdd = collection(db, "binnacles")
					await addDoc(binnacleToAdd, $binnacle);					
				} catch (error) {
				}

				if($systStatus === "sendPropToContacts"){
					$contact = "";
					conts = "";
					// $systStatus = "";
				
					listToRender($property, $currContList)
				}
		}

	// Le da el valor del contacto seleccionado para envar prop por WA a $contact
			function contSelected(cont) {
				$contact = conts[0];
				if(conts.length > 1){
					alert("no puedesseleccionar más de uno, borra la segunda selección")
				}
			}


</script>

	<!-- Title -->
		<div class="container">

		<div class="mainContainer">
			<h2>Propiedad Seleccionada</h2>

	<!-- Muestra la propieda seleccionada -->
			<div class="prop__ima__info">
				<div class="prop__image">
					<p class="prop__clave">{$property.claveEB}</p>
					<img src={$property.urlImage} alt={$property.nameProperty} />
				</div>

				<div class="prop__card">
					<div class="prop__info">
						<h1 class="title">Colonia {$property.colonia} {$property.selectTP} en {$property.selecTO}</h1>
						<div class="prop__price">
							<h2>Precio $ {toComaSep(Number($property.price))}.</h2>
						</div>
						<div class="prop__cont">
							<div class="prop__features">
								{#if $property.selectTP === 'Casa' || $property.selectTP === 'Departamento'}
									<span> {Number($property.beds)}  <i class="fa-solid fa-bed to__show"></i></span>
									<span> {Number($property.bathroom)} <i class="fa-solid fa-bath to__show"></i></span>
									{#if $property.halfBathroom}
										<span> {Number($property.halfBathroom)} <i class="fa-solid fa-toilet to__show"></i></span>										
									{/if}
									{#if $property.park}
										<span> {Number($property.park)} <i class="fa-solid fa-car-rear to__show"></i></span>										
									{/if}
									<!-- <span> {Number($property.halfBathroom)} <i class="fa-solid fa-bath to__show"></i></span> -->

									<span>{Number($property.areaBuilding)} m² <i class="fa-solid fa-ruler-combined"></i></span>
									<span>{$property.areaTotal} m² <i class="fa-solid fa-chart-area"></i></span>
								{:else if $property.typeProperty === 'Terreno'}
									<span>{$property.areaTotal} m² <i class="fa-solid fa-chart-area"></i></span>
								{/if}
							</div>
							<div class="prop__features">
								<!-- {#if $property.locaProperty.length > 0} -->
										<span> <i class="fa-sharp fa-regular fa-compass to__showR"></i> {$property.locaProperty.toString().replaceAll(",", ", ")} </span>              
								<!-- {/if} -->
								{#if $property.tagsProperty.length > 0}
										<span><i class="fa-solid fa-tags to__showR"></i> {$property.tagsProperty.toString().replaceAll("_", " ").replaceAll(",", ", ")} </span>              
								{/if}
							</div>
						</div>
					</div>
					<div class="actions">
						<i on:click={() => {editProp($property.id)}} on:keydown={() => {}} class="fa-regular fa-pen-to-square" />
						<i on:click={() => {deleProperty($property.id)}}	on:keydown={() => {}}	class="fa-regular fa-trash-can"	/>
					</div>
				</div>
			</div>
	<!-- Botones -->
			<div class="btn__options">
				<BtnWA on:click={sendWA} />
				<BtnFind on:click={findCustomers} />
				<BtnCancel on:click={actCancel} />
				<BtnFollLink />
			</div>

	<!-- Muestra opciones para buscar contactos interesados -->
			{#if show__contacts}
				<div class="mainContainer">
					<div class="sect__Title">
						<h1>A {contInterest.length} {msg}</h1>
						<div class="opti__cont">
							{#each poroShowTo as list}
									<label>
										<input type=radio bind:group={contInterested} value={list} on:change={listToRender}>
										{list.replaceAll("_", "  ")}
									</label>
							{/each}
						</div>
					</div>
				</div>
				
	<!-- Muestra los contactos a los que le puede interesar la propiedad -->
				<div class="cards__container">
					{#each contToRender as cont}
					<div class="card__container">
						<input type="checkbox" value={cont} name={cont}  bind:group={conts} on:change={contSelected}>
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

	.card__container { 
      display: flex; 
      flex-direction: column; 
      width: 350px;
      height: 130px;   
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
  
	}
</style>
