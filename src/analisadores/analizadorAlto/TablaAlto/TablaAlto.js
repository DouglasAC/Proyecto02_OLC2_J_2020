class TablaAlto {
    constructor(anterior) {
        this.indiceTemporal = 1;
        this.indiceEtiqueta = 1;
        this.heap = 0;
        this.stack = 0;
        this.funcionSizeActual;
        this.displayBreak = [];
        this.displayContinue = [];
        this.temporalesUsados = [];
        this.temporalesNoUsados = [];
        this.errores = [];
        this.globales = [];
        this.locales = new Entorno(anterior);
        this.entorno = "global";
        this.ambito = "global";
        this.funciones = [];
        this.tipoFuncion = ["void"];
        this.finFuncion = "";
        this.tipos = ["integer", "double", "char", "boolean", "string"];
        this.estructuras = [];
        this.codigoEstructuras = [];
        this.displayTry = [];
        this.simbolos = [];
    }
    agregarNoUsados(temp) {
        if (this.temporalesNoUsados.indexOf(temp) == -1) {
            this.temporalesNoUsados.push(temp);
        }
    }
    quitarNoUsados(temp) {
        if (this.temporalesNoUsados.indexOf(temp) != -1) {
            this.temporalesNoUsados.splice(this.temporalesNoUsados.indexOf(temp), 1);
        }
    }
    getTemporal() {
        return 't' + this.indiceTemporal++;
    }
    getTemporalActual() {
        return 't' + (this.indiceTemporal - 1);
    }
    getEtiqueta() {
        return 'L' + this.indiceEtiqueta++;
    }
    getEtiquetaActual() {
        return 'L' + (this.indiceEtiqueta - 1);
    }
    getHeap() {
        return this.heap++;
    }
    getStack() {
        return this.stack++;
    }
    agregarError(nuevo) {
        this.errores.push(nuevo);
    }
    agregarSimbolo(simbolo) {
        if (simbolo.entorno == "local") {
            this.agregarLocal(simbolo);
        } else {
            this.agregarGlobal(simbolo);
        }
    }
    agregarGlobal(nuevo) {
        this.globales.push(nuevo);
    }
    agregarLocal(nuevo) {
        this.locales.agregar(nuevo);
    }
    existe(nombre) {
        let existe = false;
        existe = this.locales.existe(nombre);
        if (existe) {
            return existe;
        }
        for (let x = 0; x < this.globales.length; x++) {
            let sim = this.globales[x];
            if (nombre == sim.nombre) {
                return true;
            }
        }
        return existe;
    }
    existeLocal(nombre) {
        let existe = this.locales.existeActual(nombre);
        return existe;
    }
    existeGlobal(nombre) {
        let existe = false;
        for (let x = 0; x < this.globales.length; x++) {
            let sim = this.globales[x];
            if (nombre == sim.nombre) {
                return true;
            }
        }
        return existe;
    }
    getSimbolo(nombre) {
        let existe = null;
        existe = this.locales.getSimbolo(nombre);
        if (existe != null) {
            return existe;
        }
        for (let x = 0; x < this.globales.length; x++) {
            let sim = this.globales[x];
            if (nombre == sim.nombre) {
                return sim;
            }
        }
        return existe;
    }
    existeFuncion(nombre) {
        for (let x = 0; x < this.funciones.length; x++) {
            if (nombre == this.funciones[x].nombre) {
                return true;
            }
        }
        return false;
    }
    agregarFuncion(nueva) {
        this.funciones.push(nueva);
    }
    getFuncion(nombre) {
        for (let x = 0; x < this.funciones.length; x++) {
            if (nombre == this.funciones[x].nombre) {
                return this.funciones[x];
            }
        }
        return false;
    }
    getFunciones(nombre) {
        let funciones = [];
        for (let x = 0; x < this.funciones.length; x++) {
            if (nombre == this.funciones[x].nombreReal) {
                funciones.push(this.funciones[x]);
            }
        }
        return funciones;
    }
    existeTipo(tipo) {
        tipo = tipo.toLocaleLowerCase();
        for (let x = 0; x < this.tipos.length; x++) {
            if (tipo == this.tipos[x]) {
                return true;
            }
        }
        return false;
    }
    agregarTipo(tipo) {
        this.tipos.push(tipo);
    }
    existeEstructura(tipo) {
        for (let x = 0; x < this.estructuras.length; x++) {
            if (tipo == this.estructuras[x].nombre) {
                return true;
            }
        }
        return false;
    }
    getEstructura(nombre) {
        for (let x = 0; x < this.estructuras.length; x++) {
            if (nombre == this.estructuras[x].nombre) {
                return this.estructuras[x];
            }
        }
        return false;
    }
    agregarEstructura(est) {
        this.estructuras.push(est);
    }
    agregarCodigoEstructura(cod) {
        this.codigoEstructuras.push(cod);
    }
}
exports.TablaAlto = TablaAlto;