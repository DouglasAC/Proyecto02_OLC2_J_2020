class ContinueAlto {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (tabla.displayContinue.length == 0) {
            let er = new ErrorAlto("Semantico", "Continue esta mal ubicado", this.fila, this.columna);
            tabla.errores.push(er);
            return er;
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Continue fila: " + this.fila + " columna: " + this.columna + "\n";
        let et = tabla.displayContinue[tabla.displayContinue.length - 1];
        codigo += "goto " + et + ";\n";
        codigo += "# Fin Continue\n"
        return codigo;
    }
}

exports.ContinueAlto = BreakAlto;