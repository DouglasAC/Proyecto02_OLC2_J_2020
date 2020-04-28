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
                    tabla.agregarError(erro);
                    return erro;
                } else {
                    let sim = new SimboloAlto(this.tipo, this.nombres[x].toLocaleLowerCase(), "global", tabla.getHeap(), false, null, tabla.ambito, "Variable", false);
                    tabla.agregarGlobal(sim);
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
                }
            }
        }

        if (this.valor != null) {
            let val = this.valor.analizar(tabla);
            if (val instanceof ErrorAlto) {
                return val;
            }
            if (this.tipo[0] != val[0]) {
                if (!((this.tipo[0] == "int" && val[0] == "char") || (this.tipo[0] == "double" && val[0] == "int") || (this.tipo[0] == "double" && val[0] == "char"))) {
                    console.log(this.tipo);
                    console.log(val);
                    let erro = new ErrorAlto("Semantico", "El tipo declarado no es igual al valor a asignar", this.fila, this.columna);
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
                    if (sim.tipo[0] == "int" || sim.tipo[0] == "boolean" || sim.tipo[0] == "char") {
                        codigo += "Stack[" + temp + "] = 0;\n";
                    } else if (sim.tipo[0] == "double") {
                        codigo += "Stack[" + temp + "] = 0.0;\n";
                    } else {
                        codigo += "Stack[" + temp + "] = -1;\n";
                    }
                } else {
                    let temp = tabla.getTemporal();
                    codigo += temp + " = " + sim.apuntador + ";\n";
                    if (sim.tipo[0] == "int" || sim.tipo[0] == "boolean" || sim.tipo[0] == "char") {
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
}

exports.DeclaracionAlto = DeclaracionAlto;