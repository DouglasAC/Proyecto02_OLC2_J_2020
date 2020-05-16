class IdentificadorAlto {
    constructor(nombre, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existe(this.nombre)) {
            let err = new ErrorAlto("Semantico", "La variable " + this.nombre + " no existe", this.fila, this.columna);
            tabla.agregarError(err);
            return err;
        }
        let sim = tabla.getSimbolo(this.nombre);
        return sim.tipo;
    }
    get3D(tabla) {
        let codigo = "# Inicio identificador fila " + this.fila + " columna " + this.columna + "\n";
        let sim = tabla.getSimbolo(this.nombre);
        if (sim.entorno == "local") {
            let temp = tabla.getTemporal();
            codigo += temp + " = p + " + sim.apuntador + ";\n";
            let tempR = tabla.getTemporal();
            codigo += tempR + " = Stack[" + temp + "];\n";
            tabla.agregarNoUsados(tempR);
        }else
        {
            let temp = tabla.getTemporal();
            codigo += temp + " = " + sim.apuntador + ";\n";
            let tempR = tabla.getTemporal();
            codigo += tempR + " = Heap[" + temp + "];\n";
            tabla.agregarNoUsados(tempR);
        }

        codigo += "# Fin identificador\n"
        return codigo
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Identificador: "+this.nombre+"\"]\n";
        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    }
}