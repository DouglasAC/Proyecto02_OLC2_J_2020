class AccesoEstructura {
    constructor(estructura, posicion, fila, columna) {
        this.estructura = estructura;
        this.posicion = posicion;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let pos = this.posicion.ejecutar(tabla);
        let value;
        if (this.estructura.toLowerCase() == "stack") {
            value = tabla.getStack(pos);
        } else {
            value = tabla.getHeap(pos);
        }
        
        return value;
    }
}
exports.AccesoEstructura = AccesoEstructura;