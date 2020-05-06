class LlamadaTipo2Alto {
    constructor(identificador, parametros, fila, columna) {
        this.identificador = identificador.toLocaleLowerCase();
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
        this.nombreFalso = "";
        this.funcion = null;
    }
    analizar(tabla) {
        let funciones = tabla.getFunciones(this.identificador);
        let tipo_parametros = [];
        let nombres = [];
        for (let x = 0; x < this.parametros.length; x++) {
            let tipo = this.parametros[x][1].analizar(tabla);
            if (tipo instanceof ErrorAlto) {
                return tipo;
            }
            tipo_parametros.push(tipo);
            nombres.push(this.parametros[x][0]);
        }
        let bienNombres = this.verificarNombres(nombres);
        if (bienNombres instanceof ErrorAlto) {
            tabla.errores.push(bienNombres);
            return bienNombres;
        }
        for (let x = 0; x < funciones.length; x++) {
            let bien = this.verificarFuncion(tabla, funciones[x],tipo_parametros, nombres);
            if (bien) {
                this.nombreFalso = funciones[x].nombre;
                this.funcion = funciones[x];
                return this.funcion.tipo;
            }
        }
        let err = new ErrorAlto("Semantico","No se encontro una funcion que cumpla con los nombres y tipos de la llamada", this.fila, this.columna);
        tabla.errores.push(err);
        return err;
    }
    verificarNombres(nombres) {
        for (let x = 0; x < nombres.length; x++) {
            let nom = nombres[x];
            let cont = 0;
            for (let y = 0; y < nombres.length; y++) {
                if (nom == nombres[y]) {
                    cont++;
                }
            }
            if (cont > 1) {
                let err = new ErrorAlto("Semantico", "En la llamada a " + this.identificador + " se repite el nombre " + nom, this.fila, this.columna);
                return err;
            }
        }
        return true;
    }
    verificarFuncion(tabla, funcion, tipo_parametros, nombres) {
        if (funcion.parametros.length != tipo_parametros.length) {
            return false;
        }
        for (let x = 0; x < tipo_parametros.length; x++) {
            let existe = this.existeParametro(funcion.parametros, nombres[x]);
            if (existe) {
                let parametro = this.getParametro(funcion.parametros, nombres[x]);
                let tipo = parametro[0];
                let val = tipo_parametros[x];
                if (tipo[0] == val[0]) {
                    if (tipo[0] == "Tarry" && val[0] == "Tarry") {
                        if (tipo[1] != val[1]) {
                            return false;
                        }
                    }
                    continue;
                }
                if (!((tipo[0] == "int" && val[0] == "char") || (tipo[0] == "double" && val[0] == "int") || (tipo[0] == "double" && val[0] == "char") || (tabla.existeEstructura(tipo[0]) && val[0] == "null") || (tipo[0] == "string" && val[0] == "null") || (tipo[0] == "Tarry" && val[0] == "null"))) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    existeParametro(parametros, nombre) {
        for (let x = 0; x < parametros.length; x++) {
            if (nombre == parametros[x][1]) {
                return true;
            }
        }
        return false;
    }
    getParametro(parametros, nombre) {
        for (let x = 0; x < parametros.length; x++) {
            if (nombre == parametros[x][1]) {
                return parametros[x];
            }
        }
        return null;
    }
    get3D(tabla) {
        let codigo = "# Inicio Llamada Tipo 2 nombre: " + this.identificador + " nombreReal: " + this.nombreFalso + " fila " + this.fila + " columna " + this.columna + "\n";

        //Traducir parametros
        let val_parametros = [];
        for (let x = 0; x < this.parametros.length; x++) {
            codigo += this.parametros[x][1].get3D(tabla);
            let tem = tabla.getTemporalActual();
            val_parametros.push(tem);
        }
        // no guardar los parametros
        for (let x = 0; x < val_parametros.length; x++) {
            tabla.quitarNoUsados(val_parametros[x]);
        }
        //poner posicion a los parametros
        let posicion = [];
        for (let x = 0; x < this.parametros.length; x++) {
            let nombre = this.parametros[x][0];
            for (let y = 0; y < this.funcion.parametros.length; y++) {
                if (nombre == this.funcion.parametros[y][1]) {
                    posicion.push(y);
                }
            }
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
        console.log(posicion)
        for (let x = 0; x < this.parametros.length; x++) {
            codigo += temp3 + " = p + " + (posicion[x] + 1) + ";\n"
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
        codigo += "# Fin llamada Tipo 2\n"
        return codigo;
    }
}
exports.LlamadaTipo2Alto = LlamadaTipo2Alto;