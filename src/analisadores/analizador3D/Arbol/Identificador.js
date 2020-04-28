class Identificador {
    constructor(id, fila, columna) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let value = tabla.getItem(this.id);
        return value;
    }
}
exports.Identificador = Identificador;