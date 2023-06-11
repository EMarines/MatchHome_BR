
import { mosRange } from '$lib/functions/rangValue.js'
import { dbProperties } from '../../firebase';


      /**
 * @type {any[]}
 */
      let proInt = [];

      /**
 * @param {{ selecTP?: any; numBeds?: any; numBaths?: any; numParks?: any; budget?: any; rangeProp?: any; locaProperty?: any; tagsProperty?: any; }} contact
 */
      export function filtContPropInte(contact){
        proInt = dbProperties

        // Filtra por tipo de propiedad y numero de piezas
          proInt = proInt.filter((item) =>
            contact.selecTP === item.selectTP
          );

      // // Filtra por tipo de operacion 
      //       proInt = proInt.filter((item) =>
      //       contact.typeContact === item.typeOperation
      //     );
            
        if (contact.numBeds > 0) {
          proInt = proInt.filter((item) => item.beds >= contact.numBeds);
          }

          if (contact.numBaths > 0) {
            proInt = proInt.filter((item) => item.bathroom >= contact.numBaths);
          }

          if (contact.numParks > 0) {
            proInt = proInt.filter((item) => item.park >= contact.numParks);
          }

  // Filtra por Rango
      if(!!contact.budget || (!!contact.rangeProp))
        if(contact.budget){
          let lowRange=(Number(contact.budget * .7))
          let upRange=(Number(contact.budget * 1.1))
          proInt = proInt.filter((prop) => 
          prop.price >= lowRange && prop.price <= upRange)         
        } else {       
          proInt = proInt.filter((prop) => mosRange(Number(prop.price)) === contact.rangeProp);
        }
        
  // Filtra por Ubicación  
      if(contact.locaProperty){
          proInt = proInt.filter(prop => 
          (contact.locaProperty).some((/** @type {any} */ c) => (prop.locaProperty).includes(c))
      )};
        

            // console.log(contact.tagsProperty);

    // Filtra por Etiquetas
        if(contact.tagsProperty)
          console.log("estas dentro de tags", contact.tagsProperty, proInt)
          //   proInt= proInt.filter(e => contact.tagsProperty.every(c => e.tagsProperty.includes(c)));
          // ;
          console.log(contact.tagsProperty.length) 
          try {
            proInt = proInt.filter(prop => {
              // console.log(prop.tagsProperty[0]);
              if(prop.tagsProperty.length > 0){
                console.log("Estas en if", prop.tagsProperty.length);
                return proInt= proInt.filter(elem => contact.tagsProperty.every((/** @type {any} */ tags) => elem.tagsProperty.includes(tags)));
                console.log(proInt);
                // return proInt
              } 
              //     else {
              //   // conIntR = conInt.filter((prop) => cont.tagsProperty.length === 0)
              //   console.log(proInt);
              // }
            });            
          } catch (error) {
            console.log(error)
          };
            
        return proInt;

    }

   