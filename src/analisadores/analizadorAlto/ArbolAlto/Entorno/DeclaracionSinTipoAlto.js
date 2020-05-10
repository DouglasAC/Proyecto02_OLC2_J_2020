class DeclaracionSinTipoAlto {
    constructor(tipo, nombre, valor, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (this.tipo == "global") {
            if (tabla.existeGlobal(this.nombre)) {
                let erro = new ErrorAlto("Semantico", "Ya existe variable global con este nombre: " + this.nombre, this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
        } else {
            if (tabla.entorno == "global") {
                if (tabla.existeGlobal(this.nombre)) {
                    let erro = new ErrorAlto("Semantico", "Ya existe variable global con este nombre: " + this.nombre, this.fila, this.columna);
                    tabla.agregarError(erro);
                    return erro;
                }
            } else {
                if (tabla.existeLocal(this.nombre)) {
                    let erro = new ErrorAlto("Semantico", "Ya existe variable local con este nombre: " + this.nombre, this.fila, this.columna);
                    tabla.agregarError(erro);
                    return erro;
                }
            }
        }

        let val = this.valor.analizar(tabla);
        if (val instanceof ErrorAlto) {
            return val;
        }
        if (val[0] == "null") {
            let erro = new ErrorAlto("Semantico", "Declaracion de tipo 2, 3 y 4 la expresion no puede ser nula", this.fila, this.columna);
            tabla.agregarError(erro);
            return erro;
        } else {
            if (this.tipo == "global") {
                let sim = new SimboloAlto(val, this.nombre.toLocaleLowerCase(), "global", tabla.getHeap(), false, null, tabla.ambito, "Variable", false);
                tabla.agregarGlobal(sim);
                tabla.simbolos.push(sim);
            } else {
                let constante = false;
                if (this.tipo == "const") {
                    constante = true;
                }
                if (tabla.entorno == "local") {
                    let sim = new SimboloAlto(val, this.nombre.toLocaleLowerCase(), "local", tabla.getStack(), false, null, tabla.ambito, "Variable", constante);
                    tabla.agregarLocal(sim);
                    tabla.simbolos.push(sim);
                } else {
                    let sim = new SimboloAlto(val, this.nombre.toLocaleLowerCase(), "global", tabla.getHeap(), false, null, tabla.ambito, "Variable", constante);
                    tabla.agregarGlobal(sim);
                    tabla.simbolos.push(sim);
                }
            }

        }

    }
    get3D(tabla) {
        let codigo = "# Inicio Declaracion tipo 2, 3 o 5 fila: " + this.fila + " columna: " + this.columna + "\n";
        let sim = tabla.getSimbolo(this.nombre.toLocaleLowerCase());
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
        codigo += "# Fin Declaracion\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Declaracion)\n";
       

        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "\"Identificador: " + this.nombre + "\"\n";
        cuerpo += nodo + " --> " + nodoIdent + ";\n";


        let nodoTipo = "node" + numero++;
        cuerpo += nodoTipo + "\"Expresion\"\n";
        cuerpo += nodo + " --> " + nodoTipo + ";\n";

        let expr = this.valor.generarCuerpo(numero);
        cuerpo += expr.cuerpo;
        numero = cuerpo.numero;
        cuerpo += nodoTipo + " --> " + expr.nombre + ";\n";

        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}