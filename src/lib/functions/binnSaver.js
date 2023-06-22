import { binnacle } from '$lib/stores/store';
import { db } from '../../firebase';
import { collection, deleteDoc, doc, addDoc, onSnapshot, updateDoc} from 'firebase/firestore';
// import { onDestroy } from 'svelte';
// import { binnacle, property, contact, systStatus, currBinnList } from '$lib/stores/store'

export let contact = {};
/**
 * @type {any}
 */
// let binnacle;


// Añadir Información a Bitácora para Alta de Contacto 
      /**
 * @param {string} systStatus
 * @param {{name: any;lastname: any;telephon: any;}} binn
 */
      export async function infoToBinnacle (systStatus, binn) {  
            console.log(binn, systStatus);
         try {
            const binnacleToAdd = collection(db, "binnacles")
            await addDoc(binnacleToAdd, binn);


            // // let commBinnacle = (`${contact.name} ${contact.lastname}`)
            // if(systStatus === "addContact"){
            //       // let binnInfo = {"date": Date.now(), "comment": commBinnacle, "action": "Se agregó a: ", "to": contact.telephon }
            //       const binnacleToAdd = collection(db, "binnacles")
            //       await addDoc(binnacleToAdd, binn);
            // } else if(systStatus === "editing"){
            //       // let commBinnacle = (`Se le editó a: ${contact.name} ${contact.lastname}`)
            //       // let binnInfo = {"date": Date.now(), "comment": commBinnacle, "action": "Se editó a: ", "to": contact.telephon }
            //       const binnacleToAdd = collection(db, "binnacles")
            //       await addDoc(binnacleToAdd, binn);
            // } else if(systStatus === "sendComm"){
            //    //Nota enviada
            //    // let binnInfo = {"date": Date.now(), "comment": msgWA, "action": "Se guardó nota a: ", "to": contact.telephon }
            //    const binnacleToAdd = collection(db, "binnacles")
            //    await addDoc(binnacleToAdd, binn);
            // } else if(systStatus === "sendProp"){
            //    //Propiedad enviada
            //    const binnacleToAdd = collection(db, "binnacles")
            //    await addDoc(binnacleToAdd, binn);
            // } else if(systStatus === "sendWA"){
            //    //WatsApp enviado
            //    console.log("Mensaje WA", binn);
            //    // let binnInfo = {"date": Date.now(), "comment": binnacle, "action": "Se envió WA a: ", "to": contact.telephon }
            //    const binnacleToAdd = collection(db, "binnacles");
            //    await addDoc(binnacleToAdd, binn);               
            // } else {
            //    // Propiedad enviada
            //    console.log("no ay valor de systS", systStatus);
            // }
         } catch (error) {
            console.log("error", error)
         }  
               
      };



// // Guarda, Edita y Borra items en la bitácora
//    /**
//  * @param {string} $systStatus
//  * @param {{ date?: string; comment?: string; action?: string; to?: string; id?: any; }} binn
//  */
//    export async function binnSave($systStatus, binn){
//       if($systStatus === "binnAdding"){
//          // console.log($systStatus, binn);
//          const binnacleToAdd = collection(db, "binnacles")
//          await addDoc(binnacleToAdd, binn);
//       } else if($systStatus === "binnUpdate") {
//          // await updateDoc(doc(db, "binnacles", $binnacle.id), $binnacle)
//          // editStatus = false;
//       } else if($systStatus === "binnDelete") {
//          // const binnacleToDelete = collection(db, "binnacles", binn)
//          // await deleteDoc(doc(db, "binnacles", binn.id))
//          console.log(binn.id);
//       }
//       binn = {};
//    }

 