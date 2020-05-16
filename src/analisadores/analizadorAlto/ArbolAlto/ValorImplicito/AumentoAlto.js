class AumentoAlto {
    constructor(nombre, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let ident = new IdentificadorAlto(this.nombre, this.fila, this.columna);
        let tipo = ident.analizar(tabla);
        if (tipo instanceof ErrorAlto) {
            return tipo;
        }
        if (!(tipo[0] == "integer" || tipo[0] == "double")) {
            let err = new ErrorAlto("Semantico", "La variable " + this.nombre + " es de tipo " + tipo[0] + ", no se puede aumetar su valor", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        return tipo;
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Aumento fila: " + this.fila + " columna: " + this.columna + "\n";

        let sim = tabla.getSimbolo(this.nombre);
        if (sim.entorno == "local") {
            let temp = tabla.getTemporal();
            codigo += temp + " = p + " + sim.apuntador + ";\n";
            let tempR = tabla.getTemporal();
            codigo += tempR + " = Stack[" + temp + "];\n";
            let tempA = tabla.getTemporal();
            codigo += tempA + " = " + tempR + " + 1;\n";
            codigo += "Stack[" + temp + "] = " + tempA + ";\n";
            let tempVal = tabla.getTemporal();
            codigo += tempVal + " = " + tempR + ";\n";
            tabla.agregarNoUsados(tempVal);
        } else {
            let temp = tabla.getTemporal();
            codigo += temp + " = " + sim.apuntador + ";\n";
            let tempR = tabla.getTemporal();
            codigo += tempR + " = Heap[" + temp + "];\n";
            let tempA = tabla.getTemporal();
            codigo += tempA + " = " + tempR + " + 1;\n";
            codigo += "Heap[" + temp + "] = " + tempA + ";\n";
            let tempVal = tabla.getTemporal();
            codigo += tempVal + " = " + tempR + ";\n";
            tabla.agregarNoUsados(tempVal);
        }
        codigo += "# Fin Traduccion Aumento\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Aumento\"]\n";

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "[label=\"Identificador: " + this.nombre + "\"]\n";
        cuerpo += nodo + " -> " + nodoIdent + "\n";

        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    }
}
exports.AumentoAlto = AumentoAlto;