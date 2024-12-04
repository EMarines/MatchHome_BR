export function tagToUbicacion(obj: any) {
    const direcciones = [
        'norte', 'noreste', 'noroeste', 'oeste', 'este',
        'centronorte', 'centro sur', 'sureste', 'suroeste'
    ];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const valor = obj[key].toLowerCase();
            for (const direccion of direcciones) {
                if (valor.includes(direccion)) {
                    return direccion;
                }
            }
        }
    }

    return null; // Si no se encuentra ninguna dirección
}

export function tagToFeatures(obj: any) {
    const direcciones = [
        'patio amplio', 'recamara en planta baja', 'lista para habitarse', 'una planta', 'frente a parque',
        'nueva', 'moderna', 'fraccionamiento privado', 'alberca'
    ];

    const resultados: string[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const valor = obj[key].toLowerCase();
            for (const direccion of direcciones) {
                if (valor.includes(direccion) && !resultados.includes(direccion)) {
                    resultados.push(direccion);
                }
            }
        }
    }

    if (resultados.length === 0) {
        return null;
    }

    if (resultados.length === 1) {
        return resultados[0];
    }

    const ultimaDireccion = resultados.pop();
    return `${resultados.join(', ')} y ${ultimaDireccion}`;
}
