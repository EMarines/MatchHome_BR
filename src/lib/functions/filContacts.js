/* eslint-disable no-unused-vars */
// @ts-nocheck

import { mosRange } from '../functions/rangValue'

let conIntB = [];
let conIntR = [];
let contToRender = [];
let dateTo = new Date().getTime();


// Filtrar property -- properties
    /**
 * @param {{
 *  typeSaller?: string;
 *  claveEB?: string;
 *  claveMH?: string;
 *  createdAt?: string;
 *  nameProperty?: string;
 *  price: any; beds: any;
 *  bathroom: any; halfBathroom?:
 *  string; park?: string;
 *  areaBuilding?: string;
 *  areaTotal?: string;
 *  description?: string;
 *  urlImage?: string;
 *  urlProp?: string;
 *  urlSinergy?: string;
 *  colonia?: string;
 *  rangeProp?: string;
 *  selectTP: any;
 *  selecTO?: string;
 *  typeOperation?: string;
 *  tagsProperty: any;
 *  locaProperty: any;
 *  binnacle?: never[];
 *  numBeds?: any;
 *  numBaths?: any;
 *  numParks?: any;
 *  parks?: any;
 *  }} property * 
 * @param {any[]} conInt
 */
    export function filtPropContInte(property, conInt){  

      // busqueda de Hoy hasta 1/ene/23
        conInt = conInt.filter((con) => con.createdAt <=  dateTo && con.createdAt >= 1672596060000);   
      
      // Tipo de contacto    
        conInt = conInt.filter((cont) => cont.typeContact === "Comprador");        
        
      // Tipo de propiedad
        conInt = conInt.filter((cont) => cont.selecTP === property.selectTP);
      
      // Numero de recámaras   
        if (property.beds > 0) {
          conInt = conInt.filter(cont => cont.numBeds <= property.beds);
        };
        
      // Numero de baños
        if (property.bathroom > 0) {
          conInt = conInt.filter(cont => cont.numBaths <= property.bathroom);
        };
      // Estacionamientos
        if (property.park > 0) {
          conInt = conInt.filter((cont) => cont.numParks <= property.park);
        };

      // Presupuesto
        try {
          conInt = conInt.filter(cont =>{ 
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
        }; 
        conInt = conIntR.concat(conIntB) 
        conIntB=[];
        conIntR=[];

      // Filtra por Ubicación  
          try {
            conInt = conInt.filter(cont => {
              if(cont.locaProperty.length > 0){
                if(cont.locaProperty.includes(property.locaProperty)){
                  conIntB = [...conIntB, cont]
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
              if(cont.tagsProperty){  //Le quite la doble !! para reafirmar el boolean
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


