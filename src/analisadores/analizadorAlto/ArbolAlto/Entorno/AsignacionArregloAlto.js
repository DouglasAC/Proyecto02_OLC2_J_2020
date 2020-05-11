class AsignacionArregloAlto {
    constructor(nombre, posicion, valor, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.posicion = posicion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existe(this.nombre)) {
            let err = new ErrorAlto("Semantico", "La variable " + this.nombre + " a la que se desea acceder no existe", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        let sim = tabla.getSimbolo(this.nombre);

        if (!sim.arreglo) {
            let err = new ErrorAlto("Semantico", "La variable " + this.nombre + " no es un arreglo por lo tanto no se puede acceder", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        let tipoPos = this.posicion.analizar(tabla);
        if (tipoPos instanceof ErrorAlto) {
            return tipoPos;
        }

        if (!(tipoPos[0] == "integer" || tipoPos[0] == "char")) {
            let err = new ErrorAlto("Semantico", "La posicion que se desea acceder debe tipo Integer, se encontro " + tipoPos[0], this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        let tipoVal = this.valor.analizar(tabla);
        if (tipoVal instanceof ErrorAlto) {
            return tipoVal;
        }

        let tipoSim = sim.tipo;
        if (tipoSim[1] != tipoVal[0]) {
            if (!((tipoSim[1] == "integer" && tipoVal[0] == "char") 
            || (tipoSim[1] == "double" && tipoVal[0] == "integer") 
            || (tipoSim[1] == "double" && tipoVal[0] == "char"))) {
                let erro = new ErrorAlto("Semantico", "El tipo del arreglo es " + tipoSim[1] + " no es igual al valor a asignar es " + tipoVal[0], this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
        }

    }
    get3D(tabla) {
        let codigo = "# Inicio Traducion Asignacion Arreglo fila: " + this.fila + " columna: " + this.columna + "\n";

        codigo += this.valor.get3D(tabla);
        let tempVal = tabla.getTemporalActual();
        tabla.agregarNoUsados(tempVal);


        codigo += this.posicion.get3D(tabla);
        let tempPos = tabla.getTemporalActual();
        tabla.quitarNoUsados(tempPos);

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

        let tempTam = tabla.getTemporal();
        codigo += tempTam + " = Heap[" + tempR + "];\n";

        let etq = tabla.getEtiqueta();// exepcion error index algo 
        let etq2 = tabla.getEtiqueta();// no exepcion 
        codigo += "if (" + tempPos + " < 0) goto " + etq + ";\n";
        codigo += "if (" + tempPos + " >= " + tempTam + ") goto " + etq + ";\n";
        codigo += tempPos + " = " + tempPos + " + 1;\n";

        let tempPosReal = tabla.getTemporal();
        codigo += tempPosReal + " = " + tempR + " + " + tempPos + ";\n"


        codigo += "Heap[" + tempPosReal + "] = " + tempVal + ";\n";
        tabla.quitarNoUsados(tempVal);


        codigo += "goto " + etq2 + ";\n";
        codigo += etq + ":\n"
        // cambiar cuando haga el try
        codigo += "e = 2;\n"
        codigo += etq2 + ":\n"


        codigo += "# Fin Asignacion Arreglo\n"
        return codigo;
    }
}
exports.AsignacionArregloAlto = AsignacionArregloAlto;