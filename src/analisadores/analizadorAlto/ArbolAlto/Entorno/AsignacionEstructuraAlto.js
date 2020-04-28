class AsignacionEstructuraAlto {
    constructor(nombre, atributo, valor, fila, columna) {
        this.nombre = nombre;
        this.atributo = atributo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existe(this.nombre)) {
            let err = new ErrorAlto("Semantico", "No existe la variable " + this.nombre, this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        let sim = tabla.getSimbolo(this.nombre);
        if (!tabla.existeEstructura(sim.tipo[0])) {
            let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + sim.tipo[0], this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        let estru = tabla.getEstructura(sim.tipo[0]);
        if (!estru.entorno.existe(this.atributo)) {
            let err = new ErrorAlto("Semantico", "El atributo " + this.atributo + " no existe en la estructura " + sim.tipo[0], this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        let at = estru.entorno.getSimbolo(this.atributo);
        let val = this.valor.analizar(tabla);
        if (val instanceof ErrorAlto) {
            return val;
        }

        if (at.tipo[0] != val[0]) {
            if (!((at.tipo[0] == "int" && val[0] == "char") || (at.tipo[0] == "double" && val[0] == "int") || (at.tipo[0] == "double" && val[0] == "char") || (tabla.existeEstructura(at.tipo[0]) && val[0] == "null"))) {
                let erro = new ErrorAlto("Semantico", "El tipo declarado no es igual al valor a asignar", this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Acceso Estructura fila: " + this.fila + " columna: " + this.columna + "\n";

        codigo += this.valor.get3D(tabla);
        let tempVal = tabla.getTemporalActual();
        tabla.quitarNoUsados(tempVal);

        let sim = tabla.getSimbolo(this.nombre);
        let temp = tabla.getTemporal();
        let tempR = tabla.getTemporal();
        if (sim.entorno == "local") {
            codigo += temp + " = p + " + sim.apuntador + ";\n";
            codigo += tempR + " = Stack[" + temp + "];\n";
        } else {
            codigo += temp + " = " + sim.apuntador + ";\n";
            codigo += tempR + " = Heap[" + temp + "];\n";
        }
        /// null pointe exception verificar antes de acceder

        let inicioEstru = tabla.getTemporal();
        codigo += inicioEstru + " = Heap[" + tempR + "];\n";

        /// null aqui talvez 

        let tempPosReal = tabla.getTemporal();
        let estru = tabla.getEstructura(sim.tipo[0]);
        let atri = estru.entorno.getSimbolo(this.atributo);

        codigo += tempPosReal + " = " + tempR + " + " + atri.apuntador + ";\n";

        codigo += "Heap[" + tempPosReal + "] = " + tempVal + ";\n";


        codigo += "# Fin traduccion Acceso Estructura\n"
        return codigo;
    }
}
exports.AsignacionEstructuraAlto = AsignacionEstructuraAlto;