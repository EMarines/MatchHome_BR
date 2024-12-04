<script>
 
	export let identificador ="";
 
export let name = "" ;
 
	
export let choices = "{}";
  
	export let value = "";
	
</script>
<div class="cont">

  <label class="label__title" for={identificador}>

    <p class={value ? ' above' : ' center'}>{name}</p>
    
    <select class="in__sel" id={identificador} bind:value >
      <option disabled selected value="">{name}</option>
      {#each choices as choice}
        <option  value={choice}>{choice}</option>
      {/each}
    </select>	

  </label>

</div>

<style>

  .cont {
    position: relative;
  }

  </style>