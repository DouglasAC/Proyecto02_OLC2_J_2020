class DeclararEstructura {
    constructor(estructura, fila, columna) {
        this.estructura = estructura;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        if (this.estructura == "heap") {
            tabla.heap = [];
        } else {
            tabla.stack = [];
        }
        return null;
    }
}
exports.DeclararEstructura = DeclararEstructura;