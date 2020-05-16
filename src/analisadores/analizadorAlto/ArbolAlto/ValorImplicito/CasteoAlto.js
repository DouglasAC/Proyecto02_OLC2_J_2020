class CasteoAlto {
    constructor(tipo, expresion, fila, columna) {
        this.tipo = tipo.toLocaleLowerCase();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipoExp = "";
    }
    analizar(tabla) {
        let valor = this.expresion.analizar(tabla);
        if (valor instanceof ErrorAlto) {
            return valor;
        }

        if (!((this.tipo == "integer" && valor[0] == "double")
            || (this.tipo == "char" && valor[0] == "double")
            || (this.tipo == "char" && valor[0] == "integer"))) {
            let err = new ErrorAlto("Semantico", "Se intenta castear a " + tipo + " un tipo " + valor[0] + " no es valido este casteo", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        this.tipoExp = valor[0];
        return [this.tipo];
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccion Casteo fila: " + this.fila + " columna: " + this.columna + "\n";
        let exp = this.expresion.get3D(tabla);
        let temVal = tabla.getTemporalActual();
        if (exp instanceof ErrorAlto) {
            return exp;
        }
        else {
            codigo += exp;
        }
        if (this.tipo == "integer" && this.tipoExp == "double") {
            let temp1 = tabla.getTemporal();
            codigo += temp1 + " = " + temVal + " % 1;\n";
            let temp2 = tabla.getTemporal();
            codigo += temp2 + " = " + temVal + " - " + temp1 + ";\n";
            tabla.agregarNoUsados(temp2);
            tabla.quitarNoUsados(temVal);
        } else if (this.tipo == "char" && this.tipoExp == "integer") {
            let etq = tabla.getEtiqueta();
            let etqFin = tabla.getEtiqueta();
            codigo += "if (" + temVal + " > 255) goto " + etq + ";\n";
            codigo += "if (" + temVal + "< 0) goto " + etq + ";\n";
            codigo += "goto " + etqFin + ";\n";
            codigo += etq + ":\n";
            codigo += "e = 5;\n";
            codigo += etqFin + ":\n";
        } else if (this.tipo == "char" && this.tipoExp == "double") {
            let temp1 = tabla.getTemporal();
            codigo += temp1 + " = " + temVal + " % 1;\n";
            let temp2 = tabla.getTemporal();
            codigo += temp2 + " = " + temVal + " - " + temp1 + ";\n";
            tabla.agregarNoUsados(temp2);
            tabla.quitarNoUsados(temVal);
            let etq = tabla.getEtiqueta();
            let etqFin = tabla.getEtiqueta();
            codigo += "if (" + temp2 + " > 255) goto " + etq + ";\n";
            codigo += "if (" + temp2 + "< 0) goto " + etq + ";\n";
            codigo += "goto " + etqFin + ";\n";
            codigo += etq + ":\n";
            codigo += "e = 5;\n";
            codigo += etqFin + ":\n";
        }
        codigo += "# Fin Traduccion Casteo\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Casteo\"]\n";

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "[label=\"Tipo: " + this.tipo + "\"]\n";
        cuerpo += nodo + " -> " + nodoIdent + "\n";

        let nodoExp = this.expresion.generarCuerpo(numero);
        cuerpo += nodoExp.cuerpo;
        numero = nodoExp.numero;
        cuerpo += nodo + " -> " + nodoExp.nombre + "\n";

        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    }
}
exports.CasteoAlto = CasteoAlto;