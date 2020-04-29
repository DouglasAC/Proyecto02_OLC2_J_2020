class WhileAlto {
    constructor(condicion, sentencias, fila, columna) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.fila = fila;
        this.columna = columna;
        this.local = null;
    }
    analizar(tabla) {
        let con = this.condicion.analizar(tabla);
        if (con instanceof ErrorAlto) {
            return con;
        }

        if (con[0] != 'boolean') {
            let err = new ErrorAlto("Semantico", "La condicion en While debe ser de tipo boolean", this.fila, this.columna);
            tabla.agregarError(err);
            return err;
        }
        tabla.displayBreak.push(1);
        tabla.displayContinue.push(1);
        let local = new Entorno(tabla.locales);
        for (let x = 0; x < this.sentencias.length; x++) {
            let res = this.sentencias[x].analizar(tabla);
            if (res instanceof ErrorAlto) {
                tabla.displayBreak.pop();
                tabla.displayContinue.pop();
                return res;
            }
        }
        this.local = local;
        tabla.locales = local.anterior;
        tabla.displayBreak.pop();
        tabla.displayContinue.pop();
    }
    get3D(tabla) {
        let codigo = "# Inicio While fila: " + this.fila + " columna: " + this.columna + "\n";
        let etqCon = tabla.getEtiqueta();
        let etqBre = tabla.getEtiqueta();
        tabla.displayContinue.push(etqCon);
        tabla.displayBreak.push(etqBre);
        codigo += etqCon + ":\n";

        codigo += this.condicion.get3D(tabla);
        let temp = tabla.getTemporalActual();
        let etqV = tabla.getEtiqueta();

        codigo += "if (" + temp + " == 1) goto " + etqV + ";\n"
        tabla.quitarNoUsados(temp);
        codigo += "goto " + etqBre + ";\n";
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
        codigo += "goto " + etqCon + ";\n";

        codigo += etqBre + ":\n";

        codigo += "# Fin While\n"
        tabla.displayContinue.pop();
        tabla.displayBreak.pop();
        return codigo;
    }
}
exports.WhileAlto = WhileAlto;