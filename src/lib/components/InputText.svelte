<script>
	 export let identifier = "";
	 export let name = "";  
	 export let value ="";
</script>

    <label class="label__title" for={identifier} >
      <p class={value  ? ' above' : ' center'}>{name}</p>
      <input id={identifier} class="in__sel capitalize" type="text" bind:value placeholder={name} />
    </label>
