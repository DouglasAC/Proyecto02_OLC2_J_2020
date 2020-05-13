class DeclaracionAlto {
    constructor(tipo, nombres, valor, fila, columna) {
        this.tipo = tipo;
        this.nombres = nombres;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (tabla.entorno == "global") {
            for (let x = 0; x < this.nombres.length; x++) {
                if (tabla.existeGlobal(this.nombres[x].toLocaleLowerCase())) {
                    let erro = new ErrorAlto("Semantico", "Ya existe variable global con este nombre: " + this.nombres[x], this.fila, this.columna);
                    tabla.advertencias.push(erro);
            
                } else {
                    let sim = new SimboloAlto(this.tipo, this.nombres[x].toLocaleLowerCase(), "global", tabla.getHeap(), false, null, tabla.ambito, "Variable", false);
                    tabla.agregarGlobal(sim);
                    tabla.simbolos.push(sim);
                    
                }
            }
        } else {
            for (let x = 0; x < this.nombres.length; x++) {
                if (tabla.existeLocal(this.nombres[x].toLocaleLowerCase())) {
                    let erro = new ErrorAlto("Semantico", "Ya existe variable local con este nombre: " + this.nombres[x], this.fila, this.columna);
                    tabla.agregarError(erro);
                    return erro;
                } else {
                    let sim = new SimboloAlto(this.tipo, this.nombres[x].toLocaleLowerCase(), "local", tabla.getStack(), false, null, tabla.ambito, "Variable", false);
                    tabla.agregarLocal(sim);
                    tabla.simbolos.push(sim);
                }
            }
        }

        if (this.valor != null) {
            let val = this.valor.analizar(tabla);
            if (val instanceof ErrorAlto) {
                return val;
            }
            if (this.tipo[0] != val[0]) {
                if (!((this.tipo[0] == "integer" && val[0] == "char")
                    || (this.tipo[0] == "double" && val[0] == "integer")
                    || (this.tipo[0] == "double" && val[0] == "char")
                    || (tabla.existeEstructura(this.tipo[0]) && val[0] == "null")
                    || (this.tipo[0] == "string" && val[0] == "null")
                )) {
                    //console.log(this.tipo);
                    //console.log(val);
                    let erro = new ErrorAlto("Semantico", "El tipo declarado es " + this.tipo + " no es igual al valor a asignar es: " + val, this.fila, this.columna);
                    tabla.agregarError(erro);
                    return erro;
                }
            }
        }

    }
    get3D(tabla) {
        let codigo = "# Inicio Declaracion tipo 1 o tipo 5 fila: " + this.fila + " columna: " + this.columna + "\n";
        if (this.valor == null) {
            for (let x = 0; x < this.nombres.length; x++) {
                let sim = tabla.getSimbolo(this.nombres[x].toLocaleLowerCase());
                if (sim.entorno == "local") {
                    let temp = tabla.getTemporal();
                    codigo += temp + " = p + " + sim.apuntador + ";\n";
                    if (sim.tipo[0] == "integer" || sim.tipo[0] == "boolean" || sim.tipo[0] == "char") {
                        codigo += "Stack[" + temp + "] = 0;\n";
                    } else if (sim.tipo[0] == "double") {
                        codigo += "Stack[" + temp + "] = 0.0;\n";
                    } else {
                        codigo += "Stack[" + temp + "] = -1;\n";
                    }
                } else {
                    let temp = tabla.getTemporal();
                    codigo += temp + " = " + sim.apuntador + ";\n";
                    if (sim.tipo[0] == "integer" || sim.tipo[0] == "boolean" || sim.tipo[0] == "char") {
                        codigo += "Heap[" + temp + "] = 0;\n";
                    } else if (sim.tipo[0] == "double") {
                        codigo += "Heap[" + temp + "] = 0.0;\n";
                    } else {
                        codigo += "Heap[" + temp + "] = -1;\n";
                    }
                }
            }
        }
        else {
            for (let x = 0; x < this.nombres.length; x++) {
                let sim = tabla.getSimbolo(this.nombres[x].toLocaleLowerCase());
                codigo += this.valor.get3D(tabla);
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
            }
        }
        codigo += "# Fin Declaracion\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Declaracion)\n";
        let nodoTipo = "node" + numero++;
        cuerpo += nodoTipo + "(\"Tipo " + this.tipo[0] + "\")\n";
        cuerpo += nodo + " --> " + nodoTipo + ";\n";

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "(\"Identificadores\")\n";
        cuerpo += nodo + " --> " + nodoIdent + ";\n";
        for (let x = 0; x < this.nombres.length; x++) {
            let nodoId = "node" + numero++;
            cuerpo += nodoId + "(\"Identificador: " + this.nombres[x] + "\")\n";
            cuerpo += nodoIdent + " --> " + nodoId + ";\n";
        }

        if (this.valor != null) {
            let nodoValor = "node" + numero++;
            cuerpo += nodoValor + "(\"Expresion\")\n";
            cuerpo += nodo + " --> " + nodoValor + ";\n";

            let expr = this.valor.generarCuerpo(numero);
            cuerpo += expr.cuerpo;
            numero = expr.numero;
            cuerpo += nodoValor + " --> " + expr.nombre + ";\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}

exports.DeclaracionAlto = DeclaracionAlto;