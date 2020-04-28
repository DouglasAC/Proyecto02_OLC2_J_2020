class Asignacion {
    constructor(id, valor, fila, columna) {
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let value = this.valor.ejecutar(tabla);
        tabla.insertar(this.id, value);
        return null;
    }
}
exports.Asignacion = Asignacion;