class SiAlto {
    constructor(condicion, sentencias, sentenciasElse, fila, columna) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.sentenciasElse = sentenciasElse;
        this.fila = fila;
        this.columna = columna;
        this.local = null;
        this.localElse = null;
    }
    analizar(tabla) {
        let con = this.condicion.analizar(tabla);
        if (con instanceof ErrorAlto) {
            return con;
        }

        if (con[0] != 'boolean') {
            let err = new ErrorAlto("Semantico", "La condicion en if debe ser de tipo boolean", this.fila, this.columna);
            tabla.agregarError(err);
            return err;
        }
        let local = new Entorno(tabla.locales);
        tabla.locales = local;
        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (instrucion.tipo != "global") {
                        let res = sentencia.analizar(tabla);
                        if (res instanceof ErrorAlto) {
                            return res;
                        }
                    }
                } else {
                    let res = sentencia.analizar(tabla);
                    if (res instanceof ErrorAlto) {
                        return res;
                    }
                }
            }
        }
        this.local = local;
        tabla.locales = local.anterior;

        let localElse = new Entorno(tabla.locales);
        tabla.locales = localElse;
        if (this.sentenciasElse != null) {
            for (let x = 0; x < this.sentenciasElse.length; x++) {
                let sentencia = this.sentenciasElse[x];
                if (!(sentencia instanceof DefinirEstructura)) {
                    if (sentencia instanceof DeclaracionSinTipoAlto) {
                        if (instrucion.tipo != "global") {
                            let res = sentencia.analizar(tabla);
                            if (res instanceof ErrorAlto) {
                                return res;
                            }
                        }
                    } else {
                        let res = sentencia.analizar(tabla);
                        if (res instanceof ErrorAlto) {
                            return res;
                        }
                    }
                }
            }
        }

        this.localElse = localElse;
        tabla.locales = localElse.anterior;

    }
    get3D(tabla) {
        let codigo = "# Inicio traducion if fila: " + this.fila + " columna: " + this.columna + "\n";
        codigo += this.condicion.get3D(tabla);
        let temp = tabla.getTemporalActual();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + temp + " == 1) goto " + etqV + ";\n"
        tabla.quitarNoUsados(temp);
        if (this.sentenciasElse != null) {
            codigo += "# Traducion Else:\n";
            tabla.locales = this.localElse;
            this.sentenciasElse.map(m => {
                let cod = m.get3D(tabla);
                if (cod instanceof ErrorAlto) {
                    return cod;
                }
                codigo += cod;
            });
            tabla.locales = this.localElse.anterior;
            codigo += "# Fin Traducion Else\n";
        }
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n";
        tabla.locales = this.local;
        this.sentencias.map(m => {
            let cod = m.get3D(tabla);
            if (cod instanceof ErrorAlto) {
                return cod;
            }
            codigo += cod;
        });
        tabla.locales = this.local.anterior;
        codigo += etqF + ":\n";
        codigo += "# Fin traduccion if \n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(\"Sentencia_Si\")\n";
        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "(\"Condicion\")\n";
        cuerpo += nodo + " --> " + nodoIdent + ";\n";
        let valorNodo = this.condicion.generarCuerpo(numero);
        numero = valorNodo.nuevo;
        cuerpo += valorNodo.cuerpo;
        cuerpo += nodoIdent + " --> " + valorNodo.nombre + "\n";
        let NodoSentencias = "node" + numero++;
        cuerpo += NodoSentencias + "(\"Sentencias\")\n";
        cuerpo += nodo + " --> " + NodoSentencias + "\n";
        numero = valorNodo.Numero + 3;
        for (let x = 0; x < this.sentencias.length; x++) {
            let nuevo = this.sentencias[x].generarCuerpo(numero);
            numero = nuevo.numero;
            cuerpo += nuevo.cuerpo;
            cuerpo += NodoSentencias + " --> " + nuevo.nombre + "\n";
        }
        if (this.sentenciasElse != null) {
            let NodoSentenciasElse = "node" + numero++;
            cuerpo += NodoSentenciasElse + "(\"Sentencias_Else\")\n";
            cuerpo += nodo + " --> " + NodoSentenciasElse + "\n";
            for (let x = 0; x < this.sentenciasElse.length; x++) {
                let nuevo = this.sentenciasElse[x].generarCuerpo(numero);
                numero = nuevo.numero;
                cuerpo += nuevo.cuerpo;
                cuerpo += NodoSentenciasElse + " --> " + nuevo.nombre + "\n";
            }
        }

        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.SiAlto = SiAlto;