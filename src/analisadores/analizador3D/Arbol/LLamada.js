class Llamada {
    constructor(identificador, fila, columna) {
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {
        let index = tabla.getItem(this.identificador);
        return index;
    }
}
exports.Llamada = Llamada;