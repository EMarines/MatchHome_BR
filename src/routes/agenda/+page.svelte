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
    //  import { toComaSep, toTele } from '$lib/functions/format.js';
    //  import { fly, fade } from 'svelte/transition';


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
          
<div class="container schedule">  

  <div class="mainContainer">
    <div class="header">
      <img src={schedule} alt="schedule" class="imgTitle">
      <h1 class="title">Agenda</h1>
    </div>

    <div class="cont__shcedule">

        <input type="text" class="inputTask" placeholder = "Agrega una Tarea o Cita" bind:value = {$todo.task} />
      
      <div class="contDate">
        <input type="time"class="inputDate" bind:value = {$todo.timeTask} />
        <input type="date" class="inputDate" bind:value = {$todo.endTask} /> 
      </div> 

        <textarea name="notes" id="" bind:value = {$todo.notes} placeholder ="descripción"></textarea>
      <!-- <div> -->
        <div class="buttons">
          <button on:click={handTodo($todo)} >{#if $systStatus !== "editing"}Guardar{:else} Editar{/if}</button>
          <button on:click={cancel}>Cancelar</button>
        </div>

        <!-- {#if editStatus}
          <button on:click={deleteTodo}>Borrar</button>
        {/if} -->
      <!-- </div> -->

    </div>

   
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

  .schedule {
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }

  .mainContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    height: auto;
    /* background: yellowgreen; */
    align-items: center;
    /* justify-content: center; */
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

  }

  .cont__shcedule {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 8px;
    gap: 15px;
  }

  .contDate {
    display: flex;
    width: 60%;
    justify-content: space-around;
    
  }

  .table__todosHoy{
    padding: 8px;
  }

  h3{
    display: flex;
    justify-content: center;
  }

  img {
    width: 80px;
    height: auto;
    padding: 10px;
  }

  .inputTask {
    width: 50%;
    
  }

  input {
    width: 40%;
    height: 35px;
    border-radius: 8px;
    padding: 10px;
  }
  textarea{
    width: 60%;
    height: 50px;
    border-radius: 8px;
    padding: 10px;
  }

  button {
    height: 30px;
    padding: 0 10px;
    border-radius: 8px;
    border-color: transparent;
  }

  .buttons {
    display: flex;
    width: 40%;
    justify-content: space-around;
  }



  td {
    font-size: .8rem;
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

  @media(max-width: 400px){
    td{
      font-size: .8rem;
    }

    .cont__shcedule {
      width: 100%;
    }
    .contDate {
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 8px;
    }
    input {
      width: 100%;
    }
    textarea {
      width: 100%;
    }
    .inputTask{
      width: 100%;
    }
    .buttons {
      width: 100%;
      /* gap: 50px; */
    }
  }




</style>