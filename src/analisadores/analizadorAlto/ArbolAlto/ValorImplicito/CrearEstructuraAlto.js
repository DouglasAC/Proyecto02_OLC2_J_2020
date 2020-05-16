class CrearEstructuraAlto {
    constructor(nombre, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (!tabla.existeTipo(this.nombre)) {
            let err = new ErrorAlto("Semantico", "El tipo de estructura " + this.nombre + " no existe", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }

        return [this.nombre];
    }
    get3D(tabla)
    {
        let codigo = "# Inicio Llamada nombre: est_15_" + this.nombre + " fila " + this.fila + " columna " + this.columna + "\n";
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
        codigo += "call " + "est_15_" + this.nombre + ";\n"
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
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Crear Estructura\"]\n";

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "[label=\"Identificador: " + this.nombre + "\"]\n";
        cuerpo += nodo + " -> " + nodoIdent + "\n";

        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    } 
}
exports.CrearEstructuraAlto = CrearEstructuraAlto;