import {db } from '../../firebase';
import { todo, systStatus} from '$lib/stores/store'
import { collection, deleteDoc, doc, addDoc, updateDoc} from 'firebase/firestore';


   // @ts-ignore
   export async function todoSave($systStatus, $todo){
      console.log("estas en la funcion")
      if($systStatus === "todoAdding"){
         const todoToAdd = collection(db, "todos")
         await addDoc(todoToAdd, $todo);
      } else if($systStatus === "todoUpdate") {
         await updateDoc(doc(db, "todos", $todo.id), $todo)
         // editStatus = false;
      } else if($systStatus === "todoDelete") {
         await deleteDoc(doc(db, "todos", $todo.id))
      }
      $todo = ""; 
   }