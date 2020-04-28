class MenosUnario {
    constructor(id, fila, columna) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let value = this.id.ejecutar(tabla);
        return - value;
    }
}
exports.MenosUnario = MenosUnario;