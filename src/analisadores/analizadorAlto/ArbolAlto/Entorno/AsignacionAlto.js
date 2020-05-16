class AsignacionAlto {
    constructor(nombre, valor, fila, columna) {
        this.nombre = nombre;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existe(this.nombre)) {
            let err = new ErrorAlto("Semantico", "La variable " + this.nombre + " no existe", this.fila, this.columna);
            tabla.agregarError(err);
            return err;
        }
        let val = this.valor.analizar(tabla);
        if (val instanceof ErrorAlto) {
            return err;
        }
        let sim = tabla.getSimbolo(this.nombre);
        if (sim.constante) {
            let erro = new ErrorAlto("Semantico", "La variable: " + this.nombre + " es constante, por lo tanto no se puede modificar su valor", this.fila, this.columna);
            tabla.agregarError(erro);
            return erro;
        }
        if (sim.tipo[0] != val[0]) {
            if (!((sim.tipo[0] == "integer" && val[0] == "char")
                || (sim.tipo[0] == "double" && val[0] == "integer")
                || (sim.tipo[0] == "double" && val[0] == "char")
                || (tabla.existeEstructura(sim.tipo[0]) && val[0] == "null")
                || (sim.tipo[0] == "Tarry" && val[0] == "null")
                || (sim.tipo[0] == "string" && val[0] == "null")
            )) {
                let erro = new ErrorAlto("Semantico", "El tipo de la variable es " + sim.tipo + " no es igual al valor a asignar de tipo " + val, this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
        } else if (sim.tipo[0] == "Tarry" && val[0] == "Tarry") {
            if (sim.tipo[1] != val[1]) {
                let erro = new ErrorAlto("Semantico", "El tipo de la variable es arreglo de " + sim.tipo[1] + " no es igual al valor a asignar de tipo arreglo de " + val[1], this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;

            }
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio Asignacion fila " + this.fila + " columna " + this.columna + "\n";
        let sim = tabla.getSimbolo(this.nombre);
        codigo += this.valor.get3D(tabla);
        let tempV = tabla.getTemporalActual();
        tabla.quitarNoUsados(tempV);
        if (sim.entorno == "local") {
            let temp = tabla.getTemporal();
            codigo += temp + " = p + " + sim.apuntador + ";\n";
            codigo += "Stack[" + temp + "] = " + tempV + ";\n";
        } else {
            let temp = tabla.getTemporal();
            codigo += temp + " = " + sim.apuntador + ";\n";
            codigo += "Heap[" + temp + "] = " + tempV + ";\n";
        }
        codigo += "# Fin Asignacion\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Asignacion\"]\n";
        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "[label=\"Identificador: " + this.nombre + "\"]\n";
        cuerpo += nodo + " -> " + nodoIdent + ";\n";
        let valorNodo = this.valor.generarCuerpo(numero);
        cuerpo += valorNodo.cuerpo;
        cuerpo += nodo + " -> " + valorNodo.nombre + ";\n";
        numero = valorNodo.numero;
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}