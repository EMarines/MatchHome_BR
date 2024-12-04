// import type { LayoutServerLoad } from './$types';
// import { EASYBROKER_BASE_URL_CONTACT, EASYBORKER_APP_CLIENT_ID } from '$env/static/private';
// import { getContacts, getBinnacles, getTodos, getProperties } from '$lib/firebase/db';
// import type { Property } from '$lib/types';
// // import { binnacle } from '$lib/db/binnKeep';
// // import { contacts2FB } from '$lib/db/newContactsFB';
// // import { properties } from '$lib/db/propertiesLocal';	


// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// async function fetchAllProperties(fetch: typeof globalThis.fetch) {
//     let allProperties: Property[] = [];
//     let currentPage = 1;
//     let hasNextPage = true;

//     while (hasNextPage) {
//         const params = new URLSearchParams({
//             page: currentPage.toString(),
//             limit: '20',
//             'search[sort_by]': 'updated_at-desc'
//         });

//         try {
//             const response = await fetch(`${EASYBROKER_BASE_URL_CONTACT}/properties?${params}`, {
//                 headers: {
//                     'X-Authorization': EASYBORKER_APP_CLIENT_ID,
//                     'Accept': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Error fetching properties');
//             }

//             const data = await response.json();
//             allProperties = [...allProperties, ...data.content];
            
//             hasNextPage = !!data.pagination?.next_page;
//             currentPage++;

//             if (hasNextPage) {
//                 await delay(1000); // Esperar 1 segundo antes de la siguiente petición
//             }

//         } catch (error) {
//             console.error('Error fetching page', currentPage, error);
//             hasNextPage = false;
//         }
//     }

//     return allProperties;
// }

// export const load: LayoutServerLoad = async ({ fetch, locals }) => {
//     const propertiesEB = await fetchAllProperties(fetch);

//         console.log('Obteniendo datos de Firebase');
//         const [contactsFB, binnaclesFB, todosFB, propertiesFB] = await Promise.all([
//             getContacts(),
//             getBinnacles(),
//             getTodos(),       
//             getProperties(),
//         ]);

//         return {
//             contactsFB,
//             binnaclesFB,
//             todosFB,
//             propertiesFB,
//             user: locals.user,
//             propertiesEB
//         };
   
// };
