<script>
// @ts-nocheck
   
   // Importaciones
      import { createEventDispatcher } from 'svelte';
      import { fly, fade } from 'svelte/transition';
      import { contact, systStatus, todo } from '../stores/store';
      import { todoSave } from '$lib/functions/todoSaver.js'
      // import { now } from 'svelte/internal';

      // console.log($todo);
      export let cont = {};
      cont = $contact
      export let tarea = $todo;
   // Declaraciones
         const dispatch = createEventDispatcher();

         export let nombre = (`${$contact.name} ${$contact.lastname}`)
         // export let stage = $contact.contactStage
         // console.log(stage);
         // export let tarea = [];
         // export let task = [];
         // let fechaVista= new Date();
         // let endTask;
         let endTaskQ = 0;
         // console.log(endTask)

         tarea = {
            task: "",
            endTask: "",
            isComplete: "",
            createdAt: "",
            timeTask: "", 
            notes: "",
            user: "",
            id: "",
            stage: ""       
         };
   // *- Funciones
      // Close
            function close() {
               dispatch('closeIt');            
               $systStatus = "contSelect";
               $todo="";
            };
      
      // Agrega la tarea
            const addTodo = async() => {
               $systStatus = "todoAdding"
               let task = nombre;
               tarea.endTask = new Date(tarea.endTask).getTime()
               $todo = {...tarea, task}
               todoSave($systStatus, $todo)
               close()
            };
                 
      // Agrega la tarea con el "Enter"
            const keyIsPressed = (event) => {
               if (event.key ==="Enter"){
                  addTodo()
               };
               close()
            };

</script>

   <!-- <body> -->

      <div class="background" transition:fade on:click ={close} on:keydown={()=>{}}/>
         <div class="pop__up" transition:fly>         
            <div>
               <input type="text" class="inputTask"  placeholder = "Agrega una Tarea o Cita" bind:value = {nombre} />
            </div>
            <!-- <div class="contDate"> -->
               <input type="time"class="inputDate" bind:value = {tarea.timeTask} placeholder="Hora"/>
               <input type="date" class="inputDate" bind:value = {tarea.endTask} placeholder="Fecha"/> 
            <!-- </div> -->
            <div>
               <textarea name="notes"  cols="40" rows="5" bind:value = {tarea.notes} placeholder ="descripción"></textarea>
            </div>         
            <div>
               <button class="btnShedule" on:click={addTodo}>Guardar</button>
               <button class="btnShedule" on:click={close}>Cancelar</button>
            </div>
         </div>  
      <!-- </body>   -->
      <!-- <svelte:window on:keydown={keyIsPressed}/> -->

<style>


   .background {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      align-items: bottom;
      z-index: 2;
   }

   .pop__up {
        position: fixed;
        top: 100px;
        height: auto;
        width: 350px;
        color: white;
        padding: 15px;
        background-color: #37474f;
        border: solid 5px;
        /* flex-wrap: wrap; */
        border-radius: 8px;
        /* align-items: center; */
        z-index: 5;
    }

    
	.inputTask {
      font-size: 20px;
      font-weight: bold;
		width: 300px;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 8px;
	}

    .inputDate {
        font-size: 20px;
        letter-spacing: .4em;
        font-weight: bold;
        padding: 25px;
        width: 300px;
        height: 40px;
        margin-bottom: 10px;
        border-radius: 8px;
    }

    .btnShedule{
      width: 100px;
      height: 30px;
      border-radius: 8px;
      font-size: 20px;
      /* color: rgb(208, 220, 208); */
    }



</style>