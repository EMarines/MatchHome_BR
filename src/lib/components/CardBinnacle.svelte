<script>
// @ts-nocheck

    import { formatDate } from "$lib/functions/dateFunctions";

    export let binn = {};
</script>

<div class="in__binnacle">
  <tr>
      <div class="date__binnacle">
          <td>
              {formatDate(binn.date)} 
          </td>

          <td class="icon__binnacle">
              {#if binn.action === "WhatsApp enviado: "}
                  <i class="fa-brands fa-square-whatsapp"/>
              {:else if binn.action === "Se editó a: "}
                  <i class="fa-solid fa-file-pen"/>
              {:else if binn.action === "Nota agregada: "}
                  <i class="fa-solid fa-square-poll-horizontal"/>
              {:else if binn.action === "Se agregó a: "}
                  <i class="fa-solid fa-user-check"/>
              {:else if binn.action === "Propiedad enviada: "}
                  <i class="fa-solid fa-house-circle-check" />
              {:else}
                  {binn.action}          

              {/if}
          </td>
      </div>
      <td>
          {binn.comment}
      </td>
  </tr>
      </div>


      <style>
        .date__binnacle {
            display: flex;
            flex-direction: row;
            width: 100%;    
        }
    
       td {
        font-size: .8em;
        font-weight: 300;
        color: rgb(137, 136, 136);
        padding: 8px;
        align-items: center;
        border: 1px solid rgb(42, 41, 41, .3);
       }
        
       i {
        font-size: 2rem;
        align-items: center;
        color: rgb(137, 136, 136);
       }
    
        .icon__binnacle {
        display: flex;
        width: 50px;
        color: rgb(137, 136, 136);
        padding: 8px;
        align-items: center;
        /* border: 1px solid rgb(42, 41, 41, .3) */
       }
    </style>