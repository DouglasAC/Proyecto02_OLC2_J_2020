class TryCatchAlto {
    constructor(sentencias, tipoExcepcion, nombre, sentenciasCatch, fila, columna) {
        this.sentencias = sentencias;
        this.tipoExcepcion = tipoExcepcion;
        this.nombre = nombre;
        this.sentenciasCatch = sentenciasCatch;
        this.fila = fila;
        this.columna = columna;
        this.local = null;
        this.localCatch = null;
        this.e = 0;
    }
    analizar(tabla) {
        tabla.displayTry.push(1);
        let local = new Entorno(tabla.locales);
        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (sentencia.tipo != "global") {
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
        tabla.displayTry.pop();
        let localCatch = new Entorno(tabla.locales);
        for (let x = 0; x < this.sentenciasCatch.length; x++) {
            let sentencia = this.sentenciasCatch[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (sentencia.tipo != "global") {
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
        this.localCatch = localCatch;
        tabla.locales = localCatch.anterior;

        if (this.tipoExcepcion == "arit") {
            this.e = 1;
        } else if (this.tipoExcepcion == "index") {
            this.e = 2;
        } else if (this.tipoExcepcion == "unc") {
            this.e = 3;
        } else if (this.tipoExcepcion == "null") {
            this.e = 4;
        } else if (this.tipoExcepcion == "inval") {
            this.e = 5;
        } else if (this.tipoExcepcion == "heap") {
            this.e = 6;
        } else if (this.tipoExcepcion == "stack") {
            this.e = 7;
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccuion Try Catch fila: " + this.fila + " columna: " + this.columna + "\n";
        let etq = tabla.getEtiqueta();
        tabla.displayTry.push(etq);
        tabla.locales = this.local;
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
        tabla.locales = this.local.anterior;
        tabla.displayTry.pop();
        codigo += "# Inicio Catch\n"
        codigo += etq + ":\n";
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (e == " + this.e + ") goto " + etqV + ";\n";
        if (tabla.displayTry.length > 0) {
            let nextTry = tabla.displayTry[tabla.displayTry.length - 1];
            codigo += "goto " + nextTry + ";\n";
        } else {
            codigo += "goto " + etqF + ";\n";
        }
        codigo += etqV + ":\n"

        tabla.locales = this.localCatch;
        this.sentenciasCatch.map(m => {
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
        tabla.locales = this.localCatch.anterior;
        codigo += etqF + ":\n"
        codigo += "# Fin Catch"
        codigo += "# Fin Traduccuion Try Catch\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Try Catch\"]\n";

        let sentenciaTry = "node" + numero++;
        cuerpo += sentenciaTry + "[label=\"Sentencias_Try\"]\n";
        cuerpo += nodo + " -> " + sentenciaTry + "\n";
        for (let x = 0; x < this.sentencias.length; x++) {
            let nuevo = this.sentencias[x].generarCuerpo(numero);
            cuerpo += nuevo.cuerpo;
            numero += nuevo.numero;
            cuerpo += sentenciaTry + " -> " + nuevo.nombre + "\n";
        }
        let sentenciaCatch = "node" + numero++;
        cuerpo += sentenciaCatch + "[label=\"Sentencias_Catch\"]\n";
        cuerpo += nodo + " -> " + sentenciaCatch + "\n";
        for (let x = 0; x < this.sentenciasCatch.length; x++) {
            let nuevo = this.sentenciasCatch[x].generarCuerpo(numero);
            cuerpo += nuevo.cuerpo;
            numero += nuevo.numero;
            cuerpo += sentenciaCatch + " -> " + nuevo.nombre + "\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.TryCatchAlto = TryCatchAlto;