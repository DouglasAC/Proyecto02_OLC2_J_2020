class Entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = [];
    }
    existe(nombre) {
        nombre = nombre.toLocaleLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            for (let x = 0; x < e.variables.length; x++) {
                let sim = e.variables[x];
                if (nombre == sim.nombre) {
                    return true;
                }
            }
        }
        return false;
    }
    existeActual(nombre) {
        nombre = nombre.toLocaleLowerCase();
        for (let x = 0; x < this.variables.length; x++) {
            let sim = this.variables[x];
            if (nombre == sim.nombre) {
                return true;
            }
        }
        return false;
    }
    agregar(simbolo) {
        this.variables.push(simbolo);
    }
    getSimbolo(nombre)
    {
        nombre = nombre.toLocaleLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            for (let x = 0; x < e.variables.length; x++) {
                let sim = e.variables[x];
                if (nombre == sim.nombre) {
                    return sim;
                }
            }
        }
        return null;
    }
}