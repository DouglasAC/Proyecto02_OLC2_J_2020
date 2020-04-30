class ThrowAlto {
    constructor(tipoExcepcion, fila, columna) {
        this.tipoExcepcion = tipoExcepcion;
        this.fila = fila;
        this.columna = columna;
        this.e = 0;
    }
    analizar(tabla) {
        if (tabla.displayTry.length == 0) {
            let er = new ErrorAlto("Semantico", "Throw esta mal ubicado", this.fila, this.columna);
            tabla.errores.push(er);
            return er;
        }
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
        let codigo = "# Inicio Traduccion Thorw fila: " + this.fila + " columna: " + this.columna + "\n";
        let et = tabla.displayTry[tabla.displayTry.length - 1];
        codigo += "e = " + this.e + ";\n";
        codigo += "goto " + et + ";\n";
        codigo += "# Fin Thorw\n"
        return codigo;
    }
}
exports.ThrowAlto = ThrowAlto;