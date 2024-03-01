// @ts-nocheck
// export let linkToSend;
// let link;
// let myWindow;

/**
 * @param {any} tel
 * @param {string} msg
 */
export function sendWhatsApp(tel, msg) { 
  let link = (`https://api.whatsapp.com/send?phone=52${tel}&text=${msg}`)
  window.open(link, "ventana1","width=350,height=350,scrollbars=NO" );
}



export function closeWindow(linkToSend) {
  console.log("ya es tiempo de cerrar", linkToSend);
  myWindow.close();
} 

