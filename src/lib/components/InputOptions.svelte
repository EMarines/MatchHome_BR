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


/* 
  .label__title {
      position: relative; 
      border: 1px solid navy;
      padding: 5px 3px 7px 3px; 
    } */

  /* .in__sel {  
    padding: 3px 0 3px 5px;
    width: 250px;
    border-radius: 8px;
    border-color: 2px solid blue;
    font-size: .8em;
    font-weight: 600;
    color: darkblue;  
    } */

  </style>