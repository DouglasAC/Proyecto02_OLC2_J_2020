class AccesoArregloAlto {
    constructor(nombre, posicion, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.posicion = posicion;
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

        return [sim.tipo[1]];

    }
    get3D(tabla) {
        let codigo = "# Inicio Traducion Acceso Arreglo fila: " + this.fila + " columna: " + this.columna + "\n";

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
/// null pointe exception verificar antes de acceder
        let tempTam = tabla.getTemporal();
        codigo += tempTam + " = Heap[" + tempR + "];\n";
        
        let etq = tabla.getEtiqueta();// exepcion error index algo 
        let etq2 = tabla.getEtiqueta();// no exepcion 
        codigo += "if (" + tempPos + " < 0) goto " + etq + ";\n";
        codigo += "if (" + tempPos + " >= " + tempTam + ") goto " + etq + ";\n";
        codigo += tempPos + " = " + tempPos + " + 1;\n";

        let tempPosReal = tabla.getTemporal();
        codigo += tempPosReal + " = " + tempR + " + " + tempPos + ";\n"

        let tempValor = tabla.getTemporal();
        codigo += tempValor + " = Heap[" + tempPosReal + "];\n";
        tabla.agregarNoUsados(tempValor);

        codigo += "goto " + etq2 + ";\n";
        codigo += etq + ":\n"
        // cambiar cuando haga el try
        codigo += "e = 2;\n"
        codigo += etq2 + ":\n"


        codigo += "# Fin Acceso Arreglo\n"
        return codigo;
    }
}
exports.AccesoArregloAlto = AccesoArregloAlto;