<script>
	/**
   * @type {any}
   */
	 export let ubication = [];
</script>

<div class="mainContainer">
	

	<div class="filterLocationOne">                        
		<label for="north">/Norte\
			<input value="Norte" id="north" type="checkbox" bind:group={ubication} />
		</label>    
	</div>

	<div class="filterLocationOne">
		<label for="northwest">/Noroeste
			<input value="Noroeste" id="northwest" type="checkbox" bind:group={ubication} />
		</label>

		<label for="northeast">
			<input value="Noreste" id="northeast" type="checkbox" bind:group={ubication} />NorEste\
		</label>
	</div>  

	<div class="filterLocationOne">
		<label for="west">/Oeste
			<input value="Oeste" id="west" type="checkbox" bind:group={ubication} />
		</label>

		<label for="townNorth"
					 >Centro Norte
			<input value="Centronorte" id="townNorth" type="checkbox" bind:group={ubication} />
		</label>

		<label for="east">
					 
			<input value="Este" id="east" type="checkbox" bind:group={ubication} />Este\
		</label>
	</div>

	<div class="filterLocationOne"> 
		<label for="townsouth"
					 >Centro Sur
			<input value="CentroSur" id="townsouth" type="checkbox" bind:group={ubication} />
		</label>
	</div>

	<div class="filterLocationOne">
		<label for="southwest"
					 >/SurOeste
			<input value="SurOeste" id="southwest" type="checkbox" bind:group={ubication} />
		</label>

		<label for="southeast"
					 >
			<input value="SurEste" id="southeast" type="checkbox" bind:group={ubication} />SurEste\
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
		padding: 20px;
		align-items: center;
		justify-content: center;
		margin: 10px;
	}
	.filterLocationOne{

		display: flex;
		font-size: .8em;
		font-weight: 500;
		color: purple;
		display: flex;
		padding: 15px;
		gap: 30px;
	}

	input, label {
		cursor: pointer;
	}

	input, label:hover {
		font-weight: 800;
	}

</style>
