<script>
    import { goto } from '$app/navigation';

   let tramites = ["Polanco/Perez", "Ramirez/Félix", "Marquez/Márquez"];
   
   function newTram(){
      goto("/tramites/newTramite")
   }

   function config(){
      goto("/tramites/configuracion")
   }
</script>

<section>
   <div>
      <div class="buttons">
         <button on:click={newTram}>Alta de Tramite</button>
         <button on:click={config}>Configuración</button>
      </div>

      <div>
         <h1 class="title">Trámites en Proceso</h1>
         {#each tramites as tramit}
            <h2>{tramit}</h2>
         {/each}

      </div>
   </div>
</section>

