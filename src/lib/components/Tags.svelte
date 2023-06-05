<script>
   import Tags from './Tags.svelte';
   import { tags } from '$lib/parameters.js'
  // let etapa;
   /**
   * @type {any}
   */
    let tag = [];
  
</script>

	<div class="mainContainer">

		<div class="rowContainer">
			<label>Fracc. Privado
				<input type="checkbox"  value="Fracc. Privado" bind:group={tag}/>
	   	</label>
      <label>Frente a Parque
         <input type="checkbox" value="Frente a Parque"  bind:group={tag}  />
      </label>	
		</div>

		<div class="rowContainer">
      <label>Una Planta
         <input type="checkbox" value="Una Planta"  bind:group={tag} />
      </label>
			<label>Recamara en P.B.
				<input type="checkbox" value="Recamara en PB" bind:group={tag} />
			</label>	
		</div>
			
		<div class="rowContainer">
			<label>Patio Amplio
				<input type="checkbox" value="Patio Amplio" bind:group={tag} />
			</label>			
			<label>Lista para Habitarse
				<input type="checkbox" value="Lista Habitarse" bind:group={tag} />
			</label>
		</div>
			
		<div class="rowContainer">
			<label>Nueva
				<input type="checkbox" value="Nueva" bind:group={tag} />
			</label>
		</div>

	</div>


<style>
	.mainContainer{
		display: flex;
		flex-direction: column;
		width: 22rem;
		border: 2px solid purple;
		border-radius: 10px;
		/* padding: 22px; */
		align-items: center;
		justify-content: center;
		margin: 10px;
	}
	.rowContainer{
		display: flex;
		font-size: .8em;
		font-weight: 500;
		color: purple;
		display: flex;
		padding: 15px;
		gap: 20px;
	}
	
	input, label {
		cursor: pointer;
	}

	input, label:hover {
		font-weight: 900;
	}
</style>

