class DeclararArregloAlto {
    constructor(tipo, nombre, expresion, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let existe = tabla.existeLocal(this.nombre);
        if (existe) {
            let err = new ErrorAlto("Semantico", "Ya existe una variable con el nombre " + this.nombre + " por lo tanto no se puede declarar el arreglo", fila, columna);
            tabla.errores.push(err);
            return err;
        }
        if (this.expresion != null) {
            let tipoE = this.expresion.analizar(tabla);
            if (tipoE instanceof ErrorAlto) {
                return tipoE;
            }
            if (tipoE[0] != "Tarry") {
                let err = new ErrorAlto("Semantico", "El valor de la expresion no es un arreglo, no se puede declarar el arreglo", this.expresion.fila, this.expresion.columna);
                tabla.errores.push(err);
                return err;
            }
            if (this.tipo[0] != tipoE[1]) {
                if (!((this.tipo[0] == "int" && tipoE[1] == "char") || (this.tipo[0] == "double" && tipoE[1] == "int") || (this.tipo[0] == "double" && tipoE[1] == "char"))) { }
                let err = new ErrorAlto("Semantico", "El tipo de la declaracion " + this.tipo[0] + " no es igual al de la expresion " + tipoE[1], this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        }
        if (tabla.entorno == "local") {
            let sim = new SimboloAlto(["Tarry", this.tipo[0]], this.nombre, "local", tabla.getStack(), true, 1, tabla.ambito, "Variable/Arreglo", false);
            tabla.agregarLocal(sim);
        } else {
            let sim = new SimboloAlto(["Tarry", this.tipo[0]], this.nombre, "global", tabla.getHeap(), true, 1, tabla.ambito, "Variable/Arreglo", false);
            tabla.agregarGlobal(sim);
        }


    }
    get3D(tabla) {
        let codigo = "# Traduccion de Declaracion de Arreglo fila " + this.fila + " columna: " + this.columna + "\n";

        if (this.expresion != null) {
            codigo += this.expresion.get3D(tabla);
            let tempV = tabla.getTemporalActual();

            let sim = tabla.getSimbolo(this.nombre);
            tabla.quitarNoUsados(tempV);
            if (sim.entorno == "local") {
                let temp = tabla.getTemporal();
                codigo += temp + " = p + " + sim.apuntador + ";\n";
                codigo += "Stack[" + temp + "] = " + tempV + ";\n";
            } else {
                let temp = tabla.getTemporal();
                codigo += temp + " = " + sim.apuntador + ";\n";
                codigo += "Heap[" + temp + "] = " + tempV + ";\n";
            }
        }else{
            if (sim.entorno == "local") {
                let temp = tabla.getTemporal();
                codigo += temp + " = p + " + sim.apuntador + ";\n";
                codigo += "Stack[" + temp + "] = -1;\n";
            } else {
                let temp = tabla.getTemporal();
                codigo += temp + " = " + sim.apuntador + ";\n";
                codigo += "Heap[" + temp + "] = -1;\n";
            }
        }
        codigo += "# Fin Declaracion de Arreglo\n";
        return codigo;
    }



}

exports.DeclararArregloAlto = DeclararArregloAlto;