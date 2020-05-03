class Acceso {
    constructor(tipo, nombre, posicion, parametros, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.posicion = posicion;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
        this.tipoActual = "";
    }
}
exports.Acceso = Acceso;