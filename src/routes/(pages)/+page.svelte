    <script>
// @ts-nocheck

        import What from '$lib/What.svelte';
        import Seo from '$lib/Seo.svelte';
        import { db, dbContacts } from '../../firebase.js';
        import { currPropList, currContList } from '$lib/stores/store.js';
        import { onSnapshot, collection } from '@firebase/firestore'
        import { onDestroy } from 'svelte';


        export let data;

        $: totProp = $currPropList.length;
        $: totCont = dbContacts.length;

    // Renderiza currPropList
          const unsubC = onSnapshot(
           collection(db, "contacts"),
           (querySnapshot) => {
              $currContList = querySnapshot.docs.map(doc => {
                 return{...doc.data(), id: doc.id}
              })
              return $currContList
           },
              (err) =>{
                 console.log(err);
           }
        );           
        onDestroy(unsubC)

        const unsubB = onSnapshot(
           collection(db, "properties"),
           (querySnapshot) => {
              $currPropList = querySnapshot.docs.map(doc => {
                 return{...doc.data(), id: doc.id}
              })
              return $currPropList
           },
              (err) =>{
                 console.log(err);
           }
        );           
        onDestroy(unsubB)
        
        const { posts } = data;
    </script>

    <What />    
    
    <div class="container">
        <div class="grid">
            {#each posts as { id, title, image, body }}
            <div>
                <h2>{title}</h2>
                <img src = {image} alt={title} />
                <p>{body.substring(0, 100)}{totCont}</p>
            </div>
            {/each}
        </div>
    </div>
    
    <Seo title = "Home | MatchHome" description="sample" type = "WebSite"/>

    <style>
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2em;
            padding: 2em 0;
        }
        img {
            height: 300px;
            width: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 8px;
        }

        @media(max-width: 800px){
            .grid {
                display: flex;
                flex-direction: column;
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
            }
        }

        @media(max-width: 400px){
            .grid {
                display: flex;
                flex-direction: column;
                max-width: 350px;
                margin: 0 auto;
                padding: 10px;
            }
        }

    </style>
