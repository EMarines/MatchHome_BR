import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';


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
         try {
            const binnacleToAdd = collection(db, "binnacles")
            await addDoc(binnacleToAdd, binn);
         } catch (error) {
            console.log("error", error)
         }  
               
      };



 