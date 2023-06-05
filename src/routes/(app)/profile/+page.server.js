// import { redirect } from '@sveltejs/kit';
// import { isLoggedIn } from '../../../store';

// /** @type {import('./$types').PageServerLoad} */
// export const load = ({cookies}) => {
//   const access = cookies.get("access") ==="true"

//   // @ts-ignore
//   $: logeado = $isLoggedIn
//   // @ts-ignore
//   if(!logeado) {
//     throw redirect(302, "/login");
//   }
// }