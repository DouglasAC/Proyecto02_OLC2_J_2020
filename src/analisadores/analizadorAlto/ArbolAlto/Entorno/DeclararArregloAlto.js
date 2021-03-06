class DeclararArregloAlto {
    constructor(tipo, nombre, expresion, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (tabla.entorno == "global") {
            if (tabla.existeGlobal(this.nombre)) {
                let err = new ErrorAlto("Semantico", "Ya existe una variable global con el nombre " + this.nombre, fila, columna);
                tabla.advertencias.push(err);
                
            }
        } else {
            if (tabla.existeLocal(this.nombre)) {
                let erro = new ErrorAlto("Semantico", "Ya existe variable local con este nombre: " + this.nombre, this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
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
                if (!((this.tipo[0] == "integer" && tipoE[1] == "char")
                    || (this.tipo[0] == "double" && tipoE[1] == "integer")
                    || (this.tipo[0] == "double" && tipoE[1] == "char")
                    || (tabla.existeEstructura(this.tipo[0]) && tipoE[0] == "null")
                    || (this.tipo[0] == "string" && val[0] == "null")
                )) {
                    let err = new ErrorAlto("Semantico", "El tipo de la declaracion " + this.tipo[0] + " no es igual al de la expresion " + tipoE[1], this.fila, this.columna);
                    tabla.errores.push(err);
                    return err;
                }
            }
        }
        if (tabla.entorno == "local") {
            let sim = new SimboloAlto(["Tarry", this.tipo[0]], this.nombre, "local", tabla.getStack(), true, 1, tabla.ambito, "Variable/Arreglo", false);
            tabla.agregarLocal(sim);
            tabla.simbolos.push(sim);
        } else {
            let sim = new SimboloAlto(["Tarry", this.tipo[0]], this.nombre, "global", tabla.getHeap(), true, 1, tabla.ambito, "Variable/Arreglo", false);
            tabla.agregarGlobal(sim);
            tabla.simbolos.push(sim);
        }


    }
    get3D(tabla) {
        let codigo = "# Traduccion de Declaracion de Arreglo fila " + this.fila + " columna: " + this.columna + "\n";
        let sim = tabla.getSimbolo(this.nombre);
        if (this.expresion != null) {
            codigo += this.expresion.get3D(tabla);
            let tempV = tabla.getTemporalActual();


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
        } else {
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
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Declaracion de Arreglo\"]\n";
        let nodoTipo = "node" + numero++;
        cuerpo += nodoTipo + "[label=\"Tipo Arreglo de " + this.tipo[0] + "\"]\n";
        cuerpo += nodo + " -> " + nodoTipo + ";\n";

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "[label=\"Identificador: " + this.nombre + "\"]\n";
        cuerpo += nodo + " -> " + nodoIdent + ";\n";

        if (this.expresion != null) {
            let nodoValor = "node" + numero++;
            cuerpo += nodoValor + "[label=\"Expresion\"]\n";
            cuerpo += nodo + " -> " + nodoValor + ";\n";

            let expr = this.expresion.generarCuerpo(numero);
            cuerpo += expr.cuerpo;
            numero = expr.numero;
            cuerpo += nodoValor + " -> " + expr.nombre + ";\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}

exports.DeclararArregloAlto = DeclararArregloAlto;