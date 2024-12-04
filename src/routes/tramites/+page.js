// import { currContList, currPropList, contact, property } from '$lib/stores/store.js';
// import { onSnapshot, collection } from '@firebase/firestore';
// import { onDestroy } from 'svelte';
// import { db } from '../../firebase';
// import CardContact  from '$lib/components/CardContact.svelte';
// import { formatDate} from '$lib/functions/dateFunctions';



// const values = [
//   { label: 'Etapa', value: "con.contactStage" },
//   { label: 'Fecha Creación', value: "con.createdAt" },
//   { label: 'Telefono', value: "con.telephon" },
//   { label: 'Bitácora', value: "con.binnacles" }
// ];

// /**
// * @type {string | any[]}
// */
// let found = [];
// let buscar = "";
// let date1 = Date.now();
// let date2 = 0;
// $: dateFrom = new Date(date1).getTime()+(1000*3600*18);
// $: dateTo = new Date(date2).getTime()+(1000*3600*18);
// let selected = values[0];
// $: selecValue = selected.value;



// collection(db, "contacts"),
// (querySnapshot) => {
//    $currContList = querySnapshot.docs.map(doc => {
//       return{...doc.data(), id: doc.id}
//    })
//    return $currContList
// },
//    (err) =>{
//       console.log(err);
// }
// );

// onDestroy(unsubC)
// $: contToRender = $currContList


// function findItems(){
//   found = contToRender.filter((con) => con.createdAt < dateFrom && con.createdAt > dateTo); // 1 ener 2022 = 1641038401000: 1 julio 2023 = 1688191261000
//   if(selecValue === "con.createdAt"){
//      found = found.filter((con) => con.createdAt < (buscar)
//      );
//      // )
//   } else if (selecValue === "con.telephon"){
//      found = found.filter((con) => con.telephon === (buscar)
//      );
//   } else if (selecValue === "con.contactStage"){
//      found = found.filter((con) => con.contactStage === (buscar)
//      );
//      return found;
//   }
// }

// function cleanFind(){
//   date1 = Date.now();
//   date2 = 0;
//   found = [];
//   buscar = "";
// }