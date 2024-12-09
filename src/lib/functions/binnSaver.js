// import { binnacle } from '$lib/stores/store';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';


// export let contact = {};


/**
 * @param {{ date: string; comment: string; action: string; to: string; }} binn
*/
export async function infoToBinnacle (binn) {  
   console.log("binn", binn)
   try {
      const validatedBinn = {
         date: binn.date || '',
         comment: binn.comment || '',
         action: binn.action || '',
         to: binn.to || ''
      };

      const binnacleToAdd = collection(db, "binnacles")
      await addDoc(binnacleToAdd, validatedBinn);
   } catch (error) {
      console.log("error", error)
   }  
         
};



 