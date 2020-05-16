class PorValorAlto {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = [];
    }
    analizar(tabla) {
        let tipo = this.expresion.analizar(tabla);
        if (tipo instanceof ErrorAlto) {
            return tipo;
        }
        this.tipo = tipo;
        return tipo;
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccion por Valor fila: " + this.fila + " columna: " + this.columna + "\n";
        let val = this.expresion.get3D(tabla);
        if (val instanceof ErrorAlto) {
            return val;
        } else {
            codigo += val;
        }
        if (this.tipo[0] == "Tarry" || this.tipo[0] == "string" || tabla.existeEstructura(this.tipo[0])) {
            let temp = tabla.getTemporalActual();
            tabla.agregarNoUsados(temp);
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "# Inicio Traduccion llamada a linealize fila: " + this.fila + " columna: " + this.columna + "\n";
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n"
            codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
            codigo += "call toCharArray_15;\n"
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            tabla.quitarNoUsados(temp);
            tabla.agregarNoUsados(tempR2);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a linealize\n";
        }
        codigo += "# Fin por Valor";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Por Valor\"]\n";
        let exp = this.expresion.generarCuerpo(numero);
        cuerpo += exp.cuerpo;
        numero = exp.numero;
        cuerpo += nodo + " -> " + exp.nombre+"\n";
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.PorValorAlto = PorValorAlto;