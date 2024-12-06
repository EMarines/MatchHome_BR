/* eslint-disable no-unused-vars */
// @ts-nocheck

import { mosRange } from '../functions/rangValue'
import { tagToUbicacion, tagToFeatures } from './tagConverters'

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
      console.log(conInt)

      // Tipo de contacto    
        conInt = conInt.filter((cont) => cont.typeContact === "Comprador");        
        
      // Tipo de propiedad
        conInt = conInt.filter((cont) => cont.selecTP === property.property_type);
      
      // Numero de recámaras   
        if (property.bedrooms > 0) {
          conInt = conInt.filter(cont => cont.numBeds <= property.bedrooms);
        };
        
      // Numero de baños
        if (property.bathrooms > 0) {
          conInt = conInt.filter(cont => cont.numBaths <= property.bathrooms);
        };

        // Estacionamientos
        if (property.parking_spaces > 0) {
          conInt = conInt.filter((cont) => cont.numParks <= property.parking_spaces);
        };


      // Presupuesto
      try {
        const filteredContacts = conInt.reduce((acc, cont) => {
          if (cont.budget) {
            const minBudget = Number(cont.budget) * 0.7;
            const maxBudget = Number(cont.budget) * 1.1;
            const propertyAmount = Number(property.operations[0].amount);

            // Si el precio de la propiedad está dentro del rango del presupuesto
            if (minBudget <= propertyAmount && maxBudget >= propertyAmount) {
              acc.push(cont);
            }
          } else if (cont.rangeProp === mosRange(property.price)) {
            // Si coincide exactamente con el rango
            acc.push(cont);
          }
          return acc;
        }, []); // Usamos un array simple como acumulador

        conInt = filteredContacts; // Solo guardamos los contactos que coinciden
      } catch (error) {
        console.log('Error al filtrar por presupuesto:', error);
        console.log('Valor del presupuesto:', property.operations[0].amount);
      }


      // Filtra por Ubicación
      try {
        const filteredContacts = conInt.reduce((acc, cont) => {
            const propertyTags = Array.isArray(property.tags) 
                ? property.tags.join(' ') 
                : String(property.tags || '');
            
    
            if (cont.locaProperty && cont.locaProperty.length > 0) {
                const locationTag = tagToUbicacion(propertyTags.toLowerCase());
    
                if (locationTag && cont.locaProperty.some(location => 
                    location.toLowerCase() === locationTag.toLowerCase()
                )) {
                    acc.push(cont);
                }
            }
            return acc;
        }, []);
    
        conInt = filteredContacts;
    } catch (error) {
        console.log('Error al filtrar por ubicación:', error);
    }


      // Filtra por Etiquetas
      try {
        const filteredContacts = conInt.reduce((acc, cont) => {
            // Si el contacto no tiene tags, lo incluimos directamente
            if (!cont.tagsProperty || cont.tagsProperty.length === 0) {
                acc.push(cont);
                return acc;
            }

            // Si tiene tags, verificamos coincidencias
            const features = tagToFeatures(property.tags);
            if (features && cont.tagsProperty.every(tag => features.includes(tag))) {
                acc.push(cont);
            }

            return acc;
        }, []);

        conInt = filteredContacts;
      } catch (error) {
        console.log('Error al filtrar por etiquetas:', error);
      }


      return contToRender = conInt;
    };


