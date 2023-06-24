
import { mosRange } from '../functions/rangValue'

/**
 * @type {ConcatArray<any>}
 */
let conIntB = [];
/**
 * @type {any[]}
 */
let conIntR = [];
let contToRender = [];
let property = [];
let conInt = [];
/**
 * @type {never[]}
 */
let conInterest = []
// let cont = [];

// Filtrar property -- properties
    /**
 * @param {{ typeSaller?: string; claveEB?: string; claveMH?: string; createdAt?: string; nameProperty?: string; price: any; beds: any; bathroom: any; halfBathroom?: string; park?: string; areaBuilding?: string; areaTotal?: string; description?: string; urlImage?: string; urlProp?: string; urlSinergy?: string; colonia?: string; rangeProp?: string; selectTP: any; selecTO?: string; typeOperation?: string; tagsProperty: any; locaProperty: any; binnacle?: never[]; numBeds?: any; numBaths?: any; numParks?: any; parks?: any; }} property
 * @param {any[]} conInt
 */
    export function filtPropContInte(property, conInt){
      const cont = []

  // Tipo de contacto
      // @ts-ignore
        conInt = conInt.filter((cont) => cont.typeContact === "Comprador");

  // Tipo de propiedad
        conInt = conInt.filter((cont) => cont.selecTP === property.selectTP);

  // Numero de recámaras   
        if (property.numBeds > 0) {
          return conInt = conInt.filter((cont) => cont.numBeds >= property.beds);
        };

  // Numero de baños
        if (property.numBaths > 0) {
          return conInt = conInt.filter((cont) => cont.numBaths >= property.bathroom);
        };

  // Estacionamientos
        if (property.numParks > 0) {
          return conInt = conInt.filter((cont) => cont.numPark >= property.parks);
        };
  // Presupuesto
        try {
            conInt = conInt.filter((cont) =>{ 
              if(cont.budget == ""){
                conIntB = conInt.filter((cont) => cont.budget >= property.price *.7 && cont.budget <= property.price * 1.1 )
              } else {
                conIntR = conInt.filter((cont) => cont.rangeProp === mosRange(property.price));
              };              
            });            
          } catch (error) {
            console.log(error)
          }
          conInt = conIntR.concat(conIntB) 
          conIntB=[];
          conIntR=[];

  // // Filtra por Ubicación  
  //         try {
  //           conInt = conInt.filter(cont => {
  //             if(cont.locaProperty.length > 0){
  //               // console.log("object");
  //               conIntB = conInt.filter(cont => cont.locaProperty.some((/** @type {any} */ ubic) => (property.locaProperty).includes(ubic)));
  //             } else {
  //               conIntR = conInt.filter((cont) => cont.locaProperty.length === 0)
  //             }
  //           });            
  //         } catch (error) {
  //           console.log(error)
  //         }
  //         conInt = conIntR.concat(conIntB) 
  //         conIntB=[];
  //         conIntR=[];

  // // Filtra por Etiquetas
  //       if(property.tagsProperty.length > 0){
  //         try {
  //           conInt = conInt.filter(cont => {
  //             if(cont.tagsProperty.length > 0){
  //               conIntB = conInt.filter(cont => property.tagsProperty.every((/** @type {any} */ tag) => cont.tagsProperty.includes(tag)));
  //             } else {
  //               conIntR = conInt.filter((cont) => cont.tagsProperty.length === 0)

  //             }
  //           });            
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       };

      // conInt = conIntR.concat(conIntB) 
      // conIntB=[];
      // conIntR=[];
      
      return contToRender = conInt
    };


