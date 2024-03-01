<script>
	/**
	 * @type {any}
	 */
	 export let identifier;
	/**
	 * @type {any}
	 */
	 export let name
	/**
	 * @type {any}
	 */
	 export let value;
</script>

    <label class="label__title" for={identifier} >
      <p class={value  ? ' above' : ' center'}>{name}</p>
      <input id={identifier} class="in__sel" type="email" bind:value placeholder={name} />
    </label>



  <style>



  </style>

