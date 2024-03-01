<script>
  export let value = "";
  export let identifier = "";
  export let name = "";
</script>

<label class="label__title">
  <p class={value ? ' above' : ' center'}>{name}</p>
  <input id={identifier} class="in__sel" type="date" name="createdAt" bind:value placeholder={name}>
</label>