// @ts-nocheck

/**
 * @param {number} number
 */
export function toComaSep(number){
	try {
		return number.toLocaleString('en')		
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {string | any[]} tel
 */
export function toTele(tel){
	try {
		let res1 = tel.slice(0, 3)
		let res2 = tel.slice(3, 6)
		let res3 = tel.slice(6, 10)
		return (`${res1} ${res2} ${res3}`)		
	} catch (error) {
		console.log(error);
	}
}

export function cleanNumber(numToClean){
	try {
		let newNumber = numToClean.replaceAll(",", "").replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "");
		return newNumber;

	} catch (error) {
		console.log(error);
	}
}

export function cleanName(nomToClean){
	try {
		let newNomber = nomToClean.trim().toLowerCase();
		return newNomber;

	} catch (error) {
		console.log(error);
	}
}
