class Etiqueta {
    constructor(id, fila, columna) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {
        tabla.insertar(this.id, this.index);
        return null;
    }

}
exports.Etiqueta = Etiqueta;