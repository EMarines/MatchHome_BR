// @ts-nocheck

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
          conInt = conInt.filter((cont) => cont.numPark >= property.parks);
        };
  // Presupuesto
        try {
            conInt = conInt.filter((cont) =>{ 
              if(cont.budget){
                if(Number(cont.budget*0.7) <= Number(property.price) && Number(cont.budget)  * 1.1 >= Number(property.price))
                conIntB = [...conIntB, cont]
              } else {
                if(cont.rangeProp === mosRange(property.price))
                conIntR = [...conIntR, cont]
              };              
            });            
        } catch (error) {
            console.log(error)
        }
        conInt = conIntR.concat(conIntB) 
        conIntB=[];
        conIntR=[];

  // Filtra por Ubicación  
          try {
            conInt = conInt.filter(cont => {
              if(!!cont.locaProperty){
                if(cont.locaProperty.length > 0){
                  if(property.locaProperty.every(loca => cont.locaProperty.includes(loca))){
                    conIntB = [...conIntB, cont]
                  }
                }
              } else {
                conIntR = [... conIntR, cont]
              }
            });            
          } catch (error) {
            console.log(error)
          }
          conInt = conIntR.concat(conIntB) 
          conIntB=[];
          conIntR=[];

  // Filtra por Etiquetas
          try {
            conInt = conInt.filter(cont => {
              if(!!cont.tagsProperty){
                if(cont.tagsProperty.length > 0){
                  if(cont.tagsProperty.every(tag => property.tagsProperty.includes(tag))){
                    conIntB = [...conIntB, cont]}
                } else {
                  conIntR = [...conIntR, cont]
                }
              }            
            });
          } catch (error) {
            console.log(error)
          }
        
      conInt = conIntR.concat(conIntB) 
      conIntB=[];
      conIntR=[];
      
      return contToRender = conInt
    };


