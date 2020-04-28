class BreakAlto {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        if (tabla.displayBreak.length == 0) {
            let er = new ErrorAlto("Semantico", "Break esta mal ubicado", this.fila, this.columna);
            tabla.errores.push(er);
            return er;
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Break fila: " + this.fila + " columna: " + this.columna + "\n";
        let et = tabla.displayBreak[tabla.displayBreak.length - 1];
        codigo += "goto " + et + "\n";
        codigo += "# Fin Break\n"
        return codigo;
    }
}

exports.BreakAlto = BreakAlto;