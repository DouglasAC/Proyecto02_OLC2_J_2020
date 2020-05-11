class DefinirEstructura {
    constructor(nombre, atributos, fila, columna) {
        this.nombre = nombre.toLocaleLowerCase();
        this.atributos = atributos;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (tabla.existeTipo(this.nombre)) {
            let err = new ErrorAlto("Semantico", "Ya existe una estructura con el nombre " + this.nombre, this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        let ent = new Entorno(null);
        for (let x = 0; x < this.atributos.length; x++) {
            let atri = this.atributos[x];
            if (ent.existe(atri.nombre)) {
                let err = new ErrorAlto("Semantico", "Ya existe un atributo con el nombre " + atri.nombre + " en la estructura " + this.nombre);
                tabla.errores.push(err);
                return err;
            }
            if (atri.tipo[0] == "Tarry") {
                let sim = new SimboloAlto(atri.tipo, atri.nombre, "global", (x + 1), true, null, this.nombre, "Artibuto/" + this.nombre, false);
                ent.agregar(sim);
            } else {
                let sim = new SimboloAlto(atri.tipo, atri.nombre, "global", (x + 1), false, null, this.nombre, "Artibuto/" + this.nombre, false);
                ent.agregar(sim);
            }
        }
        let estu = new Estructura(this.nombre, ent, this.atributos);
        tabla.agregarEstructura(estu);
        tabla.agregarTipo(this.nombre);
    }
    get3D(tabla) {
        let ent = new Entorno(null);
        for (let x = 0; x < this.atributos.length; x++) {
            let atri = this.atributos[x];
            let t = atri.tipo;
            if (t[0] == "Tarry") {
                t = t[1];
            } else {
                t = t[0];
            }
            //console.log(t);
            if (!tabla.existeTipo(t)) {
                let err = new ErrorAlto("Semantico", "No existe el tipo " + atri.tipo, this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
            if (atri.tipo[0] == "Tarry") {
                let sim = new SimboloAlto(atri.tipo, atri.nombre, "global", (x + 1), true, null, this.nombre, "Artibuto/" + this.nombre, false);
                ent.agregar(sim);
            } else {
                let sim = new SimboloAlto(atri.tipo, atri.nombre, "global", (x + 1), false, null, this.nombre, "Artibuto/" + this.nombre, false);
                ent.agregar(sim);
            }
        }

        let codigo = "# Inicio Traduccion Estructura est_15_" + this.nombre + " fila: " + this.fila + " columna: " + this.columna + "\n";
        codigo += "proc " + "est_15_" + this.nombre + " begin\n";
        let tempAtributos = [];

        for (let x = 0; x < this.atributos.length; x++) {
            let at = this.atributos[x];
            if (at.valor != null) {
                let tipo = at.valor.analizar(tabla);
                if (tipo instanceof ErrorAlto) {
                    return err;
                }
                codigo += at.valor.get3D(tabla);
                let temp = tabla.getTemporalActual();
                tabla.agregarNoUsados(temp);
                tempAtributos.push(temp);
            } else {
                let temp = tabla.getTemporal();
                if (at.tipo[0] == "int" || at.tipo[0] == "boolean" || at.tipo[0] == "char") {
                    codigo += temp + " = 0;\n";
                } else if (at.tipo[0] == "double") {
                    codigo += temp + " = 0.0;\n";
                } else {
                    codigo += temp + " = -1;\n";
                }
                tabla.agregarNoUsados(temp);
                tempAtributos.push(temp);
            }
        }

        let tempApun = tabla.getTemporal();
        codigo += tempApun + " = h + 0;\n";
        tabla.agregarNoUsados(tempApun);
        codigo += "Heap[h] = " + this.atributos.length + ";\n";
        codigo += "h = h + 1;\n";
        for (let x = 0; x < tempAtributos.length; x++) {
            codigo += "Heap[h] = " + tempAtributos[x] + ";\n";
            codigo += "h = h + 1;\n";
            tabla.quitarNoUsados(tempAtributos[x]);
        }

        let temp = tabla.getTemporal();
        codigo += temp + " = p + 0;\n";
        codigo += "Stack[" + temp + "] = " + tempApun + ";\n";

        codigo += "end\n";
        codigo += "# Fin Traduccion Estructura est_15_" + this.nombre + "\n";
        tabla.agregarCodigoEstructura(codigo);



        return "";
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Definir Estructura)\n";
        let ide = "node" + numero++;
        cuerpo += ide + "(\"Identificador: " + this.nombre + "\")\n";
        cuerpo += nodo + " --> " + ide + "\n";

        let parames = "node" + numero++;
        cuerpo += parames + "(Atributos)\n";
        cuerpo += nodo + " --> " + parames + "\n";
        for (let x = 0; x < this.atributos.length; x++) {
            let atributo = this.atributos[x];
            let nodoA = "node" + numero++;
            cuerpo += nodoA + "(Atributo)\n";
            cuerpo += parames + " --> " + nodoA + "\n";
            let tipo = "node" + numero++;
            if (atributo.tipo[0] == "Tarry") {
                cuerpo += tipo + "(Tipo: Arreglo de " + atributo.tipo[1] + ")\n";
            } else {
                cuerpo += tipo + "(Tipo: " + atributo.tipo[0] + ")\n";
            }
            cuerpo += nodoA + " --> " + tipo + "\n";
            let nom = "node" + numero++;
            cuerpo += nom + "(Identificador: " + atributo.nombre + ")\n";
            cuerpo += nodoA + " --> " + nom + "\n";

            if (atributo.valor != null) {
                let nodoValor = "node" + numero++;
                cuerpo += nodoValor + "(\"Expresion\")\n";
                cuerpo += nodoA + " --> " + nodoValor + ";\n";

                let expr = atributo.valor.generarCuerpo(numero);
                cuerpo += expr.cuerpo;
                numero = expr.numero;
                cuerpo += nodoValor + " --> " + expr.nombre + ";\n";
            }
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.DefinirEstructura = DefinirEstructura;