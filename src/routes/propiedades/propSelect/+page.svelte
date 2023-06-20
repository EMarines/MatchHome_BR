<!-- propSelect +page -->
<script>
	// @ts-nocheck
	// Importaciones
		import { db, dbBinnacle, dbContacts } from '../../../firebase';
		import { property, contact, systStatus, currPropList, currContList } from '$lib/stores/store';
		import { toComaSep } from '$lib/functions/format.js';
		import { diaTarde } from '$lib/functions/dateFunctions';
		import BtnWA from '$lib/components/BtnWA.svelte';
		import BtnFollLink from '$lib/components/BtnFollink.svelte';
		import BtnFind from '$lib/components/BtnFind.svelte';
		import BtnCancel from '$lib/components/BtnCancel.svelte';
		import { filtPropContInte } from '$lib/functions/filContacts.js'
		import { goto } from '$app/navigation';
		import { deleteDoc, doc, collection, updateDoc } from '@firebase/firestore';
		import CardContact from '$lib/components/CardContact.svelte'

	// declaraciones
		let saludoHora = '';
		let modeAction = '';
		let poroShowTo =["Posobles_Interesados", "Por_Enviar", "Ya_Se_Envió" ];
    let contInterested = "";
		let contInterest = [];
		let contToRender = [];
		let cont = {};

    let sent =[];
    let toSend = [];
    let tosend =[];
    let res = [];
    let msg = "Contactos les puede interesar esta propiedad";
    let seeCont = true;
    let bitacora = dbBinnacle;
		let show__contacts = false;
		// $: contInterest = filtPropContInte($property, $currContList)

			// console.log($currContList);
		// console.log(contInterest);

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
			console.log($property, " y ", $currContList);
			contInterest = filtPropContInte($property, $currContList)
			console.log(contInterest);
			console.log("entraste de nuevo en la funcion listToRender", bitacora.length);
			if(contInterested === "Posobles_Interesados"){
					msg = "Contactos Les Puede Interesar Esta Propiedad"
					return contToRender = contInterest
			} else if(contInterested === "Por_Enviar"){
					toSend=[];
					msg = "No Se Les Ha Enviado Esta Propieadad"
					res =  bitacora.filter(item =>
					item.comment === $property.nameProperty)
					const contsT = res.map(doc => doc.to)
					toSend = contInterest.filter(doc => !contsT.includes(doc.telephon))               
					return contToRender = toSend
			} else if(contInterested === "Ya_Se_Envió"){
					sent=[];
					msg = "Ya se les envió esta propiedad"
					res = dbBinnacle.filter(item =>
					item.comment === $property.nameProperty)
					dbContacts.filter((cont) =>{
						res.forEach(binn => {
							if(cont.telephon === binn.to){
								sent.push(cont)
								}
							})
							return contToRender = sent
					})
			} 
		};

	// Muestra listado de contactos interesados
		function findCustomers() {
			show__contacts = !show__contacts
			listToRender($property, $currContList)
		}

	//  Send WhatshApp with Message and Property
		function sendWA() {
			saludoHora = diaTarde();
			let msg = `${$contact.name}. ${saludoHora}  Te envío esta casa que creo te va a interesar. ¡Saludos!`;
			let link = `https://api.whatsapp.com/send?phone=52${$contact.telephon}&text=${$property.urlProp}         🏠 ${msg} 👍 `;
			window.open(link, 'ventana1', 'width=350,height=350,scrollbars=NO');
			modeAction = 'sendProperties';
			// let claveProp = $property.claveEB;
		}

	// Le da el valor del contacto seleccionado para envar prop por WA a $contact
			function contSelected(cont) {
				$contact = cont
				// console.log($contact);
			}


</script>

<!-- Title -->
<div class="container">

<div class="mainContainer">
	<h2>Propiedad Seleccionada</h2>

	<div class="prop__ima__info">
		<!-- Image and clave -->
		<div class="prop__image">
			<p class="prop__clave">{$property.claveEB}</p>
			<img src={$property.urlImage} alt={$property.nameProperty} />
		</div>

		<div class="prop__card">
			<div class="prop__info">
				<h1>Colonia {$property.colonia} {$property.selectTP} en {$property.selecTO}</h1>
				<div class="prop__price">
					<h2>Precio $ {toComaSep(Number($property.price))}.</h2>
				</div>
				<div class="prop__features">
					{#if $property.selectTP === 'Casa' || $property.selectTP === 'Departamento'}
						<span>Recámaras {Number($property.beds)}</span>
						<span>Baños {Number($property.bathroom)}</span>
					{:else if $property.typeProperty === 'Terreno'}
						<span>{$property.areaTotal} m²</span>
					{/if}
				</div>
			</div>
			<div class="actions">
				<i on:click={() => {editProp($property.id)}} on:keydown={() => {}} class="fa-regular fa-pen-to-square" />
				<i on:click={() => {deleProperty($property.id)}}	on:keydown={() => {}}	class="fa-regular fa-trash-can"	/>
			</div>
		</div>
	</div>

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
		
		<div class="cards__container">
			{#each contToRender as cont}
			<div class="card__container">
				<input type="checkbox" on:change={contSelected(cont)}  value={cont}>
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
		display: flex;
    width: 50%;
  }

	.prop__clave {
		position: absolute;
		top: 130px;
		left: 150px;
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
			top: 350px;
			left: 30px;
    }
  
	}
</style>
