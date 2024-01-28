

/**
 * @param {any} tel
 * @param {string} msg
 */
export function sendWhatsApp(tel, msg) { 
  console.log(tel, msg);
  let link = (`https://api.whatsapp.com/send?phone=52${tel}&text=${msg}`)
  window.open(link, "ventana1","width=350,height=350,scrollbars=NO" );
}

