class DeclararTemporales {
    constructor(temporales, fila, columna) {
        this.temporales = temporales;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        for (let x = 0; x < this.temporales.length; x++) {
            tabla.insertar(this.temporales[x], 0);
        }
        return null;
    }
}

exports.DeclararTemporales = DeclararTemporales;