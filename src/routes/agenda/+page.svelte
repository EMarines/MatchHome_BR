<script>
// @ts-nocheck


  // Importaciones
     import { collection, addDoc, deleteDoc, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore'
     import { db, dbTodos} from '../../firebase';
     import schedule from '$lib/images/schedule.png';
     import { todo, systStatus, currTodoList, contact } from '$lib/stores/store.js'
     import { formatDate } from '$lib/functions/dateFunctions.js'
     import AddToSchedule from '$lib/components/AddToSchedule.svelte';
     import { sortTodos } from '$lib/functions/sort.js'
     import { goto } from '$app/navigation';
     import { onDestroy } from 'svelte';


     import { toComaSep, toTele } from '$lib/functions/format.js';
     import { fly, fade } from 'svelte/transition';
     //  import { formatDate } from '$lib/functions/dateFunctions'
      // import { useNavigate } from "svelte-navigator";
      // import { sortTodos } from '../assets/funcions/sort'
      // import edit from '../assets/images/edit.svg'
      // import calendar_check from '../assets/images/calendar_check.svg'

  // Declaraciones
      $todo = {};
      let editStatus = false;
      let inActivated = false;
      let mostActions = false;
      let endTask = "";
      $systStatus = "";
  
  // Renderiza currPropList
    const unsubT = onSnapshot(
        collection(db, "todos"),
        (querySnapshot) => {
          $currTodoList = querySnapshot.docs.map(doc => {
              return{...doc.data(), id: doc.id}
          })
          return sortTodos($currTodoList)
        },
          (err) =>{
              console.log(err);
        }
    );
        
    onDestroy(unsubT)
    $: todoToRender = $currTodoList
  
  // CRUD
      // Edita la tarea
        async function editTodo(item) {
          $todo = item
          $systStatus = "editing" ;
          // handTodo($todo);                
        };

      // Elimina la tarea
        async function deleteTodo(item) { 
          $todo = item
          $systStatus = "deleting"
          handTodo($todo);            
        };

  // Close
     function close() {
      //  $todo=[]; 
       inActivated = false;
        // goto("/contactos")
      };

  // Mostrar Schedule
      function addSchedule(){
          inActivated = true;
        };

  // 

  // Manejo de Agregar o Editar
      async function handTodo() {
        endTask = new Date($todo.endTask).getTime()
        $todo = {...$todo, endTask}
        if($systStatus === "deleting"){
            let confDelete = confirm("Quieres borrarlo definitivmente?");
            if(confDelete === true){
              await deleteDoc(doc(db, "todos", $todo.id));
            };
          } else if($systStatus === "editing") {
            await updateDoc(doc(db, "todos", $todo.id), $todo)
        } else {
            await addDoc(collection(db, "todos"), $todo);
        };
        editStatus = false;
        $todo = {}; 
      };

      function mostIcons() {
        mostActions = !mostActions;
      }

    // Close
        function cancel() {
          $todo={}; 
          goto("/agenda")
        };




</script>

<!-- {#if $systStatus === "editing"} -->
          
<div class="container">  

  <div class="mainContainer">
    <h1>Agenda</h1>
    <img src={schedule} alt="schedule" class="imgTitle">
    
      <div>
        <input type="text" class="inputTask" cols="56" rows="1"  placeholder = "Agrega una Tarea o Cita" bind:value = {$todo.task} />
      </div>

      <div class="contDate">
          <input type="time"class="inputDate" bind:value = {$todo.timeTask} />
          <input type="date" class="inputDate" bind:value = {$todo.endTask} /> 
      </div>

      <div>
          <textarea name="notes" id="" cols="56" rows="5" bind:value = {$todo.notes} placeholder ="descripción"></textarea>
      </div> 

      <div>
        <!-- <button id="btn-task-save" on:click={handTodos}>Guardar</button> -->
        <button on:click={handTodo($todo)} >{#if $systStatus !== "editing"}Guardar{:else} Editar{/if}</button>
        <button on:click={cancel}>Cancelar</button>
        {#if editStatus}
          <button on:click={deleteTodo}>Borrar</button>
        {/if}
    </div>

   

  <!-- Agenda Head -->
      <!-- {#if $systStatus !== "editing"} -->
      

            <!-- <div class="head__title">
              <h1 class="title">Agenda</h1>
            </div> -->
            
            <!-- <div class="agen__head">
              <img src={schedule} alt="schedule" class="imgTitle">
              <button on:click={addSchedule}>Agregar</button>
            </div> -->

      <!-- AddToSchedule -->
            {#if inActivated}
              <AddToSchedule {...$todo}  on:closeIt = {close} />
            {/if}

      <!-- Todos table´s -->
            <div class="table__todosHoy">
              <h3 class="title">Hoy</h3>
              {#each todoToRender as item}
                <tr on:dblclick={mostIcons}>
                  <td>{formatDate(Number(item.endTask))}</td>
                  <td class="td__task">{item.task}</td>
                  <td class="td__notes">{item.notes}</td>
                  {#if mostActions}
                    <td class="td__icons">
                      <i class="fa-sharp fa-regular fa-square-check"></i>
                      <i on:click={editTodo(item)} on:keydown={()=>{}} class="fa-regular fa-pen-to-square" />
                      <i on:click={deleteTodo(item)} on:keydown={()=>{}} class="fa-regular fa-trash-can" />
                      </td>
                  {/if}
                </tr>
              {/each}
            </div>
          </div>
        </div>  
      <!-- {/if} -->



<style>

.mainContainer {
  display: flex;
  flex-direction: column;
  width: 950px;
  height: 100vh;
  /* background: yellowgreen; */
  align-items: center;
}

/* .agen__head {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
  align-items: center;
} */

img {
  width: 80px;
  height: auto;
  padding: 10px;
}

button {
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border-color: transparent;
}

td {
  font-size: .8em;
  font-weight: 300;
  color: rgb(137, 136, 136);
  padding: 8px;
  border: 1px solid rgb(42, 41, 41, .3);
}


.td__notes {
  width: 160px;
}

.td__task {
  width: 150px;
}




</style>