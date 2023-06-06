// @ts-ignore
import { mosRange } from '$lib/functions/rangValue.js'
import { dbProperties } from '../../firebase';
import { contact } from '$lib/stores/store.js'

let proInt = dbProperties
// console.log(proInt);

  
    /**
 * @param {{ selecTP: any; numBeds: number; numBaths: number; numParks: number; budget: number; rangeProp: string; }} $contact
 */
    export function filtContPropInte($contact){
        // @ts-ignore
        proInt = proInt.filter((item) => {
          console.log($contact);
          console.log("jsjsjsj", item.selectTP, $contact.selecTP);
        item.selectTP === $contact.selecTP
    });
          
        console.log("filtraste por tipo de propiedad", proInt )
       
       if ($contact.numBeds > 0) {
         proInt = proInt.filter((item) => item.beds >= $contact.numBeds);
        }

        if ($contact.numBaths > 0) {
          proInt = proInt.filter((item) => item.bathroom >= $contact.numBaths);
        }

        if ($contact.numParks > 0) {
          proInt = proInt.filter((item) => item.park >= $contact.numParks);
        }
        // console.log("Por caracteristicas", proInt)

    // Filtra por Rango
        if(!!$contact.budget || (!!$contact.rangeProp)){
          if($contact.budget){
            // console.log("filtraste por rango", $contact.budget)  
            let lowRange=(Number($contact.budget * .7))
            let upRange=(Number($contact.budget * 1.1))
            console.log("valores", lowRange, upRange)
            proInt = proInt.filter((prop) => 
              prop.price >= lowRange && prop.price <= upRange
            // console.log(prop.price)
            )         
          } else {         
            console.log("filtraste por rango", $contact.rangeProp)
  
            proInt = proInt.filter((prop) => mosRange(Number(prop.price)) === $contact.rangeProp);
            // console.log(prop.price)
  
          };
        //   console.log("filtraste presupuesto", proInt)
        }
        
    // // Filtra por Ubicación  
    //     if(!!$contact.locaProperty){
    //         console.log($contact.locaProperty)
    //         proInt = proInt.filter(prop => {
    //             console.log("locaProperty", prop.locaProperty, $contact.locaProperty);
    //           // @ts-ignore
    //         ($contact.locaProperty).some(c => (prop.locaProperty).includes(c))
    //     });
    //     console.log("Filtraste por Ubicacion", proInt)
    //     };
        



    // Filtra por Etiquetas
        // if($contact.tagsProperty.length > 0){
        //   // console.log("estas dentro de tags", $contact.tagsProperty.length)
        //   proInt= proInt.filter(e => $contact.tagsProperty.every(c => e.tagsProperty.includes(c)));
        // };
        // console.log("Filtraste por localizacion", proInt) 



        
    // Mensaje de no contactos
        // if (proInt.length === 0) {
        //     message = "No hay resultados con este criterio de busqueda"
        //     // console.logproInt.length, message)
        // } else {
        //   message = ("Se encontraron" + proInt.length + "propiedades con este criterio de busqueda" )
        // };

        // @ts-ignore
        // console.log(proInt);
        return proInt;

    }

   