class Goto {
    constructor(identificador, fila, columna) {
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {
        let value = tabla.getItem(this.identificador);
        return value;
    }
}
exports.Goto = Goto;