import { writable, readable } from 'svelte/store';

export const currPropList = writable([]);

export const currContList = writable([]);

export const dbProperties = writable([]);

export const currBinnList = writable([]);

// export const toRenBinn = writable([]);

export const currTodoList = writable([]);

export const systStatus = writable("");

export const contact = writable({
  typeContact: "",  // Tipo de contacto
  name: "",
  lastname: "",
  lastContact: "",
  telephon: "",
  email: "",
  selecMC: "",      // Modo de contacto
  propCont: "",     // Propiedad de contacto
  comContact: "",   // Comentarios
  rangeProp: "",    // Rango buscado
  contMode: "",     // Modo de contacto
  budget: "",       // Presupuesto tope
  numBeds:"",
  numBaths:"",
  halfBathroom: "",
  numParks:"",
  modePay: "",      // Modo de pago
  selecTP: "",      // Tipo de propiedad
  contactType: "",  // Modo de contacto
  contactStage: "", // Etapa del cliente
  createdAt: "",    // Fecha de alta
  locaProperty: [], // Localicacion buscada
  tagsProperty: [], // Etiquetas
  sendedProperties:[],  // Propiedades enviadas,
  id: "",
});

// Decraracion de Prperty
export const property = writable ({
  // typeProperty: "",
  typeSaller: "",      // Tipo de encargado de la propiedad
  claveEB: "",
  claveMH: "",
  createdAt: "",
  nameProperty: "",
  price: "",
  beds: "",
  bathroom: "",
  halfBathroom: "",
  park: "",
  areaBuilding: "",
  areaTotal: "",
  description: "",
  urlImage: "",
  urlProp: "",
  urlSinergy: "",
  colonia: "",
  rangeProp: "",
  selectTP: "",
  selecTO: "",
  typeOperation: "",      // Tipo de Operación
  tagsProperty: [],
  locaProperty: [],
  binnacle: [],
});

// Declaracion de todos
  export const todo = writable({
    task: "",
    isComplete: "",
    createdAt: "",
    endTask: "",
    timeTask: "", 
    notes: "",
    user: "" ,
    id:""       
  });

// Binnacle
  export const binnacle = writable({
    date: "",
    comment: "",
    action: "",
    to: ""
  });

