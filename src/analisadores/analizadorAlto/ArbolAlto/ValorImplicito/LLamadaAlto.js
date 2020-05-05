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
                continue;
            }
            if (!((tipo[0] == "int" && val[0] == "char") || (tipo[0] == "double" && val[0] == "int") || (tipo[0] == "double" && val[0] == "char") || (tabla.existeEstructura(tipo[0]) && val[0] == "null") || (tipo[0] == "string" && val[0] == "null") || (tipo[0] == "Tarry" && val[0] == "null"))) {
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
}
exports.LLamadaAlto = LLamadaAlto;