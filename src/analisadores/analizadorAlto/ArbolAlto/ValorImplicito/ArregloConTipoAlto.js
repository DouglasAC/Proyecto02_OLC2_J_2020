class ArregloConTipoAlto {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existeTipo(this.tipo[0])) {
            let err = new ErrorAlto("Semantico", "El tipo " + this.tipo[0] + " no existe, no se puede crear Arreglo", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        let tipoT = this.valor.analizar(tabla);
        if (tipoT instanceof ErrorAlto) {
            return tipoT;
        }

        if (!(tipoT[0] == "int" || tipoT[0] == "char")) {
            let err = new ErrorAlto("Semantico", "El tamaño del arreglo debe ser entero, se encontro " + tipoT[0], this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        return ["Tarry", this.tipo[0]];
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccion Expresion Arreglo con Tipo fila: " + this.fila + " columna: " + this.columna + "\n";
        codigo += this.valor.get3D(tabla);
        let tempV = tabla.getTemporalActual();
        tabla.quitarNoUsados(tempV);

        let tempA = tabla.getTemporal();
        codigo += tempA + " = h + 0;\n";
        tabla.agregarNoUsados(tempA);
        /// falta verificar que tempV sea mayor que 0 para las execiones
        codigo += "Heap[h] = " + tempV + ";\n";
        codigo += "h = h + 1;\n";

        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();

        codigo += etqF + ":\n"
        codigo += "if (" + tempV + " <= 0) goto " + etqV + ";\n";
        if (this.tipo[0] == "int" || this.tipo[0] == "boolean" || this.tipo[0] == "char") {
            codigo += "Heap[h] = 0;\n";
        } else if (this.tipo[0] == "double") {
            codigo += "Heap[h] = 0.0;\n";
        } else {
            codigo += "Heap[h] = -1;\n";
        }
        codigo += "h = h + 1;\n";
        codigo += tempV + " = " + tempV + " - 1;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"


        codigo += "# Fin Expresion Arreglo con Tipo\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Expresion Arreglo Con Tipo)\n";

        let nodoTipo = "node" + numero++;
        cuerpo += nodoTipo + "(Tipo: " + this.tipo[0] + ")\n";
        cuerpo += nodo + " --> " + nodoTipo + "\n";

        let nodoTam = "node" + numero++;
        cuerpo += nodoTam + "(Tamaño)\n";
        cuerpo += nodo + " --> " + nodoTam + "\n";
        let nodoEsp = this.valor.generarCuerpo(numero);
        cuerpo += nodoEsp.cuerpo;
        numero = nodoEsp.numero;
        cuerpo += nodoTam + " --> " + nodoEsp.nombre + "\n";

        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.ArregloConTipoAlto = ArregloConTipoAlto;