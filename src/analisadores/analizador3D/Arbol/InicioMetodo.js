class InicioMetodo {
    constructor(identificador, cantidadIns, fila, columna) {
        this.identificador = identificador;
        this.cantidadIns = cantidadIns;
        this.getValor = false;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {
        let value = this.index;
        if (this.getValor) {
            return tabla.getItem(this.identificador);
        } else {
            tabla.insertar(this.identificador, value);
        }
        return null;
    }
}
exports.InicioMetodo = InicioMetodo;