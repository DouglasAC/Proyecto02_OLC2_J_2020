class ForAlto {
    constructor(inicio, condicion, final, sentencias, fila, columna) {
        this.inicio = inicio;
        this.condicion = condicion;
        this.final = final;
        this.sentencias = sentencias;
        this.fila = fila;
        this.columna = columna;
        this.local = null;
    }
    analizar(tabla) {
        let local = new Entorno(tabla.locales);
        tabla.locales = local;
        if (this.inicio != null) {
            let ini = this.inicio.analizar(tabla);
            if (ini instanceof ErrorAlto) {
                return ini;
            }
        }

        if (this.condicion != null) {
            let cond = this.condicion.analizar(tabla);
            if (cond instanceof ErrorAlto) {
                return cond;
            }
            if (cond[0] != "boolean") {
                let err = new ErrorAlto("Senatico", "La condicion del ciclo For debe ser tipo boolean", this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        }

        if (this.final != null) {
            let fin = this.final.analizar(tabla);
            if (fin instanceof ErrorAlto) {
                return fin;
            }
        }
        tabla.displayBreak.push(1);
        tabla.displayContinue.push(1);

        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (sentencia.tipo != "global") {
                        let res = sentencia.analizar(tabla);
                        if (res instanceof ErrorAlto) {
                            tabla.displayBreak.pop();
                            tabla.displayContinue.pop();
                            return res;
                        }
                    }
                } else {
                    let res = sentencia.analizar(tabla);
                    if (res instanceof ErrorAlto) {
                        tabla.displayBreak.pop();
                        tabla.displayContinue.pop();
                        return res;
                    }
                }
            }
        }
        this.local = local;
        tabla.locales = local.anterior;
        tabla.displayBreak.pop();
        tabla.displayContinue.pop();
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Ciclo For fila " + this.fila + " columna: " + this.columna + "\n";
        tabla.locales = this.local;
        if (this.inicio != null) {
            let ini = this.inicio.get3D(tabla);
            if (ini instanceof ErrorAlto) {
                return ini;
            }
            codigo += ini;
        }


        let etqCon = tabla.getEtiqueta();
        let etqBre = tabla.getEtiqueta();
        tabla.displayContinue.push(etqCon);
        tabla.displayBreak.push(etqBre);
        codigo += etqCon + ":\n";

        if (this.condicion != null) {
            codigo += this.condicion.get3D(tabla);
            let temp = tabla.getTemporalActual();
            let etqV = tabla.getEtiqueta();

            codigo += "if (" + temp + " == 1) goto " + etqV + ";\n"
            tabla.quitarNoUsados(temp);
            codigo += "goto " + etqBre + ";\n";
            codigo += etqV + ":\n";
        }


        this.sentencias.map(m => {
            let cod = m.get3D(tabla);
            if (cod instanceof ErrorAlto) {
                return cod;
            }
            codigo += cod;
            if (m instanceof LLamadaAlto
                || m instanceof LlamadaTipo2Alto
                || m instanceof LlamadaAccesoAlto
                || m instanceof AccesoAlto
            ) {
                let quit = tabla.getTemporalActual();
                tabla.quitarNoUsados(quit);
            }
        });


        if (this.final != null) {
            let fin = this.final.get3D(tabla);
            if (fin instanceof ErrorAlto) {
                return fin;
            }
            codigo += fin;
        }
        tabla.locales = this.local.anterior;
        codigo += "goto " + etqCon + ";\n";

        codigo += etqBre + ":\n";
        codigo += "# Fin tradiccion For\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Sentencia_For\"]\n";
        if (this.inicio != null) {
            let nodoInicio = "node" + numero++;
            cuerpo += nodoInicio + "[label=\"Inicio_For\"]\n";
            cuerpo += nodo + " -> " + nodoInicio + "\n";
            let nodoIni = this.inicio.generarCuerpo(numero);
            numero = nodoIni.numero;
            cuerpo += nodoIni.cuerpo;
            cuerpo += nodoInicio + " -> " + nodoIni.nombre + "\n";
        }
        if (this.condicion != null) {
            let nodoCondicion = "node" + numero++;
            cuerpo += nodoCondicion + "[label=\"Condicion_For\"]\n"
            cuerpo += nodo + " --> " + nodoCondicion + "\n";
            let nodoIni = this.condicion.generarCuerpo(numero);
            numero = nodoIni.numero;
            cuerpo += nodoIni.cuerpo;
            cuerpo += nodoCondicion + " -> " + nodoIni.nombre + "\n";
        }
        if (this.final != null) {
            let nodoCondicion = "node" + numero++;
            cuerpo += nodoCondicion + "[label=\"Final_For\"]\n"
            cuerpo += nodo + " --> " + nodoCondicion + "\n";
            let nodoIni = this.final.generarCuerpo(numero);
            numero = nodoIni.numero;
            cuerpo += nodoIni.cuerpo;
            cuerpo += nodoCondicion + " -> " + nodoIni.nombre + "\n";
        }
        let NodoSentencias = "node" + numero++;
        cuerpo += NodoSentencias + "[label=\"Sentencias\"]\n";
        cuerpo += nodo + " -> " + NodoSentencias + "\n";
        
        for (let x = 0; x<this.sentencias.length; x++) {
            let nuevo = this.sentencias[x].generarCuerpo(numero);
            numero = nuevo.numero;
            cuerpo += nuevo.cuerpo;
            cuerpo += NodoSentencias + " -> " + nuevo.nombre + ";\n";
        }

        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}

exports.ForAlto = ForAlto;