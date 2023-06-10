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
		<label for="Norte_Oeste">/Noroeste
			<input value="Norte_Oeste" id="Norte_Oeste" type="checkbox" bind:group={ubication} />
		</label>

		<label for="Norte_Este">
			<input value="Norte_Este" id="Norte_Este" type="checkbox" bind:group={ubication} />NorEste\
		</label>
	</div>  

	<div class="filterLocationOne">
		<label for="Oeste">/Oeste
			<input value="Oeste" id="Oeste" type="checkbox" bind:group={ubication} />
		</label>

		<label for="Centro_Norte"
					 >Centro Norte
			<input value="Centro_Norte" id="Centro_Norte" type="checkbox" bind:group={ubication} />
		</label>

		<label for="Este">
					 
			<input value="Este" id="Este" type="checkbox" bind:group={ubication} />Este\
		</label>
	</div>

	<div class="filterLocationOne"> 
		<label for="Centro_Sur"
					 >Centro Sur
			<input value="Centro_Sur" id="Centro_Sur" type="checkbox" bind:group={ubication} />
		</label>
	</div>

	<div class="filterLocationOne">
		<label for="Sur_Oeste"
					 >/SurOeste
			<input value="Sur_Oeste" id="Sur_Oeste" type="checkbox" bind:group={ubication} />
		</label>

		<label for="Sur_Este"
					 >
			<input value="Sur_Este" id="Sur_Este" type="checkbox" bind:group={ubication} />SurEste\
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
