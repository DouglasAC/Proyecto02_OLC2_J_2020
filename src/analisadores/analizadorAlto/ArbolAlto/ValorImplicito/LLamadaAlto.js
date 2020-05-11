class LLamadaAlto {
    constructor(identificador, parametros, fila, columna) {
        this.identificador = identificador.toLocaleLowerCase();
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
        this.nombreFalso = "";
    }
    analizar(tabla) {
        let nombre = this.identificador;
        let tipo_parametros = [];
        for (let x = 0; x < this.parametros.length; x++) {
            let tipo = this.parametros[x].analizar(tabla);
            if (tipo instanceof ErrorAlto) {
                return tipo;
            }
            if (tipo[0] == "Tarry") {
                nombre += "_arreglo_" + tipo[1];
            } else {
                nombre += "_" + tipo[0];
            }
            tipo_parametros.push(tipo);
        }
        if (!tabla.existeFuncion(nombre)) {
            let funciones = tabla.getFunciones(this.identificador);
            let encontro = false;
            let tipo = [];
            for (let x = 0; x < funciones.length; x++) {
                encontro = this.verificarFuncion(tabla, funciones[x], tipo_parametros);
                if (encontro) {
                    this.nombreFalso = funciones[x].nombre;
                    tipo = funciones[x].tipo;
                    break;
                }
            }
            if (!encontro) {
                let err = new ErrorAlto("Semantico", "La funcion " + this.identificador + " no existe o el tipo de parametros no existe", this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
            return tipo;
        }
        this.nombreFalso = nombre;
        let fun = tabla.getFuncion(nombre);
        return fun.tipo;
    }
    verificarFuncion(tabla, funcion, tipo_valores) {

        if (funcion.parametros.length != tipo_valores.length) {
            return false;
        }
        for (let x = 0; x < funcion.parametros.length; x++) {
            let tipo = funcion.parametros[x][0];
            let val = tipo_valores[x];
            console.log(tipo);
            console.log(val);
            if (tipo[0] == val[0]) {
                if (tipo[0] == "Tarry" && val[0] == "Tarry") {
                    if (tipo[1] != val[1]) {
                        return false;
                    }
                }
                continue;
            }
            if (!((tipo[0] == "integer" && val[0] == "char")
                || (tipo[0] == "double" && val[0] == "integer")
                || (tipo[0] == "double" && val[0] == "char")
                || (tabla.existeEstructura(tipo[0]) && val[0] == "null")
                || (tipo[0] == "string" && val[0] == "null")
                || (tipo[0] == "Tarry" && val[0] == "null"))) {
                return false;
            }
        }
        return true;
    }
    get3D(tabla) {
        let codigo = "# Inicio Llamada nombre: " + this.identificador + " nombreReal: " + this.nombreFalso + " fila " + this.fila + " columna " + this.columna + "\n";

        //Traducir parametros
        let val_parametros = [];
        for (let x = 0; x < this.parametros.length; x++) {
            codigo += this.parametros[x].get3D(tabla);
            let tem = tabla.getTemporalActual();
            val_parametros.push(tem);
        }
        // no guardar los parametros
        for (let x = 0; x < val_parametros.length; x++) {
            tabla.quitarNoUsados(val_parametros[x]);
        }
        //Cambir de ambito


        codigo += "p = p + " + tabla.stack + ";\n";
        //Guardar temporales
        let temp2 = tabla.getTemporal();
        for (let x = 0; x < tabla.temporalesNoUsados.length; x++) {
            codigo += temp2 + " = p + " + x + ";\n";
            codigo += "Stack[" + temp2 + "] = " + tabla.temporalesNoUsados[x] + ";\n";
        }
        codigo += "p = p + " + tabla.temporalesNoUsados.length + ";\n";
        // temporales guardados

        // pasar parametros
        let temp3 = tabla.getTemporal();
        codigo += temp3 + " = p + 0;\n"
        codigo += "Stack[" + temp3 + "] = 0;\n"
        for (let x = 0; x < this.parametros.length; x++) {
            codigo += temp3 + " = p + " + (x + 1) + ";\n"
            codigo += "Stack[" + temp3 + "] = " + val_parametros[x] + ";\n"
        }

        codigo += "call " + this.nombreFalso + ";\n"
        //return 
        let tempR = tabla.getTemporal();
        codigo += tempR + " = p + 0;\n";
        let tempR2 = tabla.getTemporal();
        codigo += tempR2 + " = Stack[" + tempR + "];\n";
        // recuperar temporales
        codigo += "p = p - " + tabla.temporalesNoUsados.length + ";\n";
        let tempRec = tabla.getTemporal();
        for (let x = 0; x < tabla.temporalesNoUsados.length; x++) {
            codigo += tempRec + " = p + " + x + ";\n";
            codigo += tabla.temporalesNoUsados[x] + " = Stack[" + tempRec + "];\n";
        }
        codigo += "p = p - " + tabla.stack + ";\n";


        let tempValorReturn = tabla.getTemporal();

        codigo += tempValorReturn + " = " + tempR2 + ";\n";
        tabla.agregarNoUsados(tempValorReturn);
        codigo += "# Fin llamada\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Llamada)\n";
        let nodoIde = "node" + numero++;
        cuerpo += nodoIde + "(\"Identificador: " + this.identificador + "\")\n";
        cuerpo += nodo + " --> " + nodoIde + "\n";
        let nodoExpres = "node" + numero++;
        cuerpo += nodoExpres + "(Expresiones)\n";
        cuerpo += nodo + " --> " + nodoExpres + "\n";
        for (let x = 0; x < this.parametros.length; x++) {
            let nodoExp = "node" + numero++;
            cuerpo += nodoExp + "(Expresion)\n";
            cuerpo += nodoExpres + " --> " + nodoExp + "\n";
            let nodoVal = this.parametros[x].generarCuerpo(numero);
            cuerpo += nodoVal.cuerpo;
            numero = nodoVal.numero;
            cuerpo += nodoExp + " --> " + nodoVal.nombre + "\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.LLamadaAlto = LLamadaAlto;