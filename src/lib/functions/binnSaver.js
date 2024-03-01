// import { binnacle } from '$lib/stores/store';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';


// export let contact = {};


/**
 * @param {{ date: string; comment: string; action: string; to: string; }} binn
*/
export async function infoToBinnacle (binn) {  
         try {
            const binnacleToAdd = collection(db, "binnacles")
            await addDoc(binnacleToAdd, binn);
         } catch (error) {
            console.log("error", error)
         }  
               
      };



 