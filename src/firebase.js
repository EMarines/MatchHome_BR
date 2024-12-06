import { initializeApp } from "firebase/app";
import { collection, getDoc, getDocs, onSnapshot, getFirestore, orderBy, limit, query} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
// import { currContList, currPropList, currBinnList } from './lib/stores/store';


// $: currContList
// $: currPropList
// $: currBinnList

/**
 * @type {any[]}
 */
  export let dbContacts  = [];

  /**
 * @type {any[]}
 */
  export let dbProperties  = [];

  /**
 * @type {any[]}
 */
  export let dbTodos = [];

  /**
 * @type {any[]}
 */
  export let dbBinnacle = [];

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCkuw82zTqtiPDp3eS2qwGr8UUQFDBBglM",
  //   authDomain: "curso-svelte-58c5d.firebaseapp.com",
  //   projectId: "curso-svelte-58c5d",
  //   storageBucket: "curso-svelte-58c5d.appspot.com",
  //   messagingSenderId: "1067367490239",
  //   appId: "1:1067367490239:web:8a8aeae384fa8319515c0a"
  // };
  
  

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCkuw82zTqtiPDp3eS2qwGr8UUQFDBBglM",
//   authDomain: "curso-svelte-58c5d.firebaseapp.com",
//   projectId: "curso-svelte-58c5d",
//   storageBucket: "curso-svelte-58c5d.appspot.com",
//   messagingSenderId: "1067367490239",
//   appId: "1:1067367490239:web:8a8aeae384fa8319515c0a"
// };


  // Your web app's Firebase configuration match-home
   const firebaseConfig = {
   apiKey: "AIzaSyDGi3ndUC1b4SFNstliSSVryu7_ymXEkZc",
   authDomain: "match-home-7d1f9.firebaseapp.com",
   databaseURL: "https://match-home-7d1f9-default-rtdb.firebaseio.com",
   projectId: "match-home-7d1f9",
   storageBucket: "match-home-7d1f9.appspot.com",
   messagingSenderId: "747751099607",
   appId: "1:747751099607:web:29d1e5beda87c847dfb492"
   };


//   // Your web app's Firebase configuration JGCapital
// const firebaseConfig = {
//   apiKey: "AIzaSyBgaVo-bSos2GjBjds1hePHkz6GAGHQFus",
//   authDomain: "jgcapital-bbfcf.firebaseapp.com",
//   projectId: "jgcapital-bbfcf",
//   storageBucket: "jgcapital-bbfcf.appspot.com",
//   messagingSenderId: "834626798641",
//   appId: "1:834626798641:web:fbd4818c82ab2f02588110"
// };

 
 

// Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)
  export const auth = getAuth(app)



  
  const bitacora =  collection(db, "binnacles");
   const contactos = collection(db, "contacts");
   const propiedades = collection(db, "properties");
   const tareas = collection(db, "todos");


  (() => {
    getDocs (contactos)
    .then((response) => {
      return dbContacts = response.docs.map((item) => {
          return {... item.data(), id: item.id};
      })
    })
  })();

  (() => {
    getDocs(propiedades)
    .then((response) => {
      return dbProperties = response.docs.map((item) => {
          return {... item.data(), id: item.id};
      })
    })
  })();

  (() => {
    getDocs(bitacora)
    .then((response) => {
          return dbBinnacle = response.docs.map((item) => {
          return {... item.data(), id: item.id};
       })
    })
    })();

    (() => {
      getDocs(tareas)
      .then((response) => {
            return dbTodos = response.docs.map((item) => {
            return {... item.data(), id: item.id};
         })
      })
      })();



 




      // const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_APIKEY,
  //   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  //   projectId: import.meta.env.VITE_PROJECT_ID,
  //   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  //   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  //   appId: import.meta.env.VITE_APP_ID,
  // };


