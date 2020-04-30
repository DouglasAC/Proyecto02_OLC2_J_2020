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
            let res = this.sentencias[x].analizar(tabla);
            if (res instanceof ErrorAlto) {
                return res;
            }
        }
        this.local = local;
        tabla.locales = local.anterior;

        let localElse = new Entorno(tabla.locales);
        tabla.locales = localElse;
        if (this.sentenciasElse != null) {
            for (let x = 0; x < this.sentenciasElse.length; x++) {
                let res = this.sentenciasElse[x].analizar(tabla);
                if (res instanceof ErrorAlto) {
                    return res;
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

}
exports.SiAlto = SiAlto;