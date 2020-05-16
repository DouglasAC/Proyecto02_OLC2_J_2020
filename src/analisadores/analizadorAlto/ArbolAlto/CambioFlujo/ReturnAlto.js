class ReturnAlto {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (this.valor == null) {
            if (tabla.tipoFuncion[0] != "void") {
                let err = new ErrorAlto("Semantico", "El retorno de la funcion no es void, el return debe estar acompañado", this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        } else {
            let tipoVal = this.valor.analizar(tabla);
            if (tipoVal instanceof ErrorAlto) {
                return tipoVal;
            }
            if (tabla.tipoFuncion[0] == tipoVal[0]) {
                // otras comparacione como arreglo y struct
                if (tabla.tipoFuncion[0] == "Tarry" && tipoVal[0] == "Tarry") {
                    if (tabla.tipoFuncion[1] != tipoVal[1]) {
                        let err = new ErrorAlto("Semantico", "El la funcion es de tipo arreglo de " + tabla.tipoFuncion[1] + " el retorno es de tipo areglo de " + tipoVal[1], this.fila, this.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                }
            }
            else {
                //falta arreglos struct
                if (!((tabla.tipoFuncion[0] == "integer" && tipoVal[0] == "char")
                    || (tabla.tipoFuncion[0] == "double" && tipoVal[0] == "integer")
                    || (tabla.tipoFuncion[0] == "double" && tipoVal[0] == "char")
                    || (tabla.existeEstructura(tabla.tipoFuncion[0]) && tipoVal[0] == "null")
                    || (tabla.tipoFuncion[0] == "Tarry" && tipoVal[0] == "null")
                    || (tabla.tipoFuncion[0] == "string" && tipoVal[0] == "null")
                )) {
                    let err = new ErrorAlto("Semantico", "El la funcion es de tipo " + tabla.tipoFuncion + " el retorno es de tipo " + tipoVal, this.fila, this.columna);
                    tabla.errores.push(err);
                    return err;
                }
            }
        }
    }
    get3D(tabla) {
        let codigo = "# Inicion Return fila " + this.fila + " columna " + this.columna + "\n";

        if (this.valor != null) {
            codigo += this.valor.get3D(tabla);
            let tempR = tabla.getTemporalActual();
            tabla.quitarNoUsados(tempR);
            let temp = tabla.getTemporal();
            codigo += temp + " = p + 0;\n";
            codigo += "Stack[" + temp + "] = " + tempR + ";\n";

        } else {
            let temp = tabla.getTemporal();
            codigo += temp + " = p + 0;\n";
            codigo += "Stack[" + temp + "] = -1;\n";
        }
        codigo += "# Fin Return\n"
        return codigo;
    }
    generarCuerpo(numero) {

        if (this.valor != null) {
            let nodo = "node" + numero++;
            let cuerpo = nodo + "[label=\"Return\"];\n";
            let val = this.valor.generarCuerpo(numero);
            cuerpo += nodo + " -> " + val.nombre + ";\n";
            let nuevo = new NodoDot(nodo, val.cuerpo + cuerpo, val.numero + 1);
            return nuevo;
        } else {
            let nodo = "node" + numero;
            let cuerpo = nodo + "[label=\"Return\"];\n";
            let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
            return nuevo;
        }
    }
}
exports.ReturnAlto = ReturnAlto;