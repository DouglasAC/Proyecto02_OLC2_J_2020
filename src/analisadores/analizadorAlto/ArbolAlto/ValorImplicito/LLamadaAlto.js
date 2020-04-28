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
        for (let x = 0; x < this.parametros.length; x++) {
            let tipo = this.parametros[x].analizar(tabla);
            if (tipo instanceof ErrorAlto) {
                return tipo;
            }
            nombre += "_" + tipo[0];
        }
        if (!tabla.existeFuncion(nombre)) {
            let err = new ErrorAlto("Semantico", "La funcion " + this.identificador + " no existe o el tipo de parametros no existe", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        this.nombreFalso = nombre;
        let fun = tabla.getFuncion(nombre);
        return fun.tipo;
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

        codigo += tempValorReturn + " = " + tempR2+";\n";
        tabla.agregarNoUsados(tempValorReturn);
        codigo += "# Fin llamada\n"
        return codigo;
    }
}
exports.LLamadaAlto = LLamadaAlto;