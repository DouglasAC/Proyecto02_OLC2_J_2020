class ImprimirAlto {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let val = this.valor.analizar(tabla);
        if (val instanceof ErrorAlto) {
            return val;
        }
        if (val[0] == "void") {
            let err = new ErrorAlto("Semantico", "No se puede imprimir una funcion void", this.valor.fila, this.valor.columna);
            tabla.errores.push(err);
            return err;
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio Imprimir fila: " + this.fila + " columna: " + this.columna + "\n";
        let tipo = this.valor.analizar(tabla);
        codigo += this.valor.get3D(tabla);
        let temp = tabla.getTemporalActual(tabla);
        console.log("imprimir " + tipo);
        if (tipo[0] == "int") {
            codigo += "print(\"%i\", " + temp + ");\n";
        } else if (tipo[0] == "double") {
            codigo += "print(\"%d\", " + temp + " );\n";
        } else if (tipo[0] == 'boolean') {
            let etqV = tabla.getEtiqueta();
            let etqF = tabla.getEtiqueta();
            codigo += "if (" + temp + " == 1) goto " + etqV + ";\n";
            codigo += "print(\"%c\", 102);\n";
            codigo += "print(\"%c\", 97);\n";
            codigo += "print(\"%c\", 108);\n";
            codigo += "print(\"%c\", 115);\n";
            codigo += "print(\"%c\", 101);\n";
            codigo += "goto " + etqF + ";\n"
            codigo += etqV + ":\n";
            codigo += "print(\"%c\", 116);\n";
            codigo += "print(\"%c\", 114);\n";
            codigo += "print(\"%c\", 117);\n";
            codigo += "print(\"%c\", 101);\n";
            codigo += etqF + ":\n"
        } else if (tipo[0] == "null") {
            codigo += "print(\"%c\", 110);\n";
            codigo += "print(\"%c\", 117);\n";
            codigo += "print(\"%c\", 108);\n";
            codigo += "print(\"%c\", 108);\n";
        }
        else if (tipo[0] == "char") {
            codigo += "print(\"%c\", " + temp + ");\n";
        } else if (tipo[0] = "string") {
            let tempLetra = tabla.getTemporal();
            let etqV = tabla.getEtiqueta();
            let etqF = tabla.getEtiqueta();
            let tempTam = tabla.getTemporal();
            let etqV2 = tabla.getEtiqueta();
            codigo += "if (" + temp + " == -1) goto " + etqV2 + ";\n";
            codigo += tempTam + " = Heap[" + temp + "];\n"
            codigo += temp + " = " + temp + " + 1;\n"
            codigo += etqF + ":\n"
            codigo += "if (" + tempTam + " <= 0) goto " + etqV + ";\n";
            codigo += tempLetra + " = Heap[" + temp + "];\n";
            codigo += "print(\"%c\", " + tempLetra + ");\n";
            codigo += temp + " = " + temp + " + 1;\n"
            codigo += tempTam + " = " + tempTam + " - 1;\n";
            codigo += "goto " + etqF + ";\n";
            codigo += etqV + ":\n";
            codigo += etqV2 + ":\n";
        }
        tabla.quitarNoUsados(temp);
        codigo += "print(\"%c\", 13);\n";
        codigo += "# Fin Imprimir\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Imprimir)\n";
        let nodoExpresion = this.valor.generarCuerpo(numero);
        cuerpo += nodoExpresion.cuerpo;
        numero = nodoExpresion.numero;
        cuerpo += nodo + " --> " + nodoExpresion.nombre;
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.ImprimirAlto = ImprimirAlto;