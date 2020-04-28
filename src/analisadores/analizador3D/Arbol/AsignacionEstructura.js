class AsignacionEstructura {
    constructor(estructura, posicion, valor, fila, columna) {
        this.estructura = estructura;
        this.posicion = posicion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let value = this.valor.ejecutar(tabla);
        let dir = this.posicion.ejecutar(tabla);
        if (this.estructura.toLowerCase() == "stack") {
            tabla.setStack(dir, value);
        } else {
            tabla.setHeap(dir, value);
        }
        return null;
    }

}
exports.AsignacionEstructura = AsignacionEstructura;