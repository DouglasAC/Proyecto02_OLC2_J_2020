class ImportarAlto {
    constructor(nombres, fila, columna) {
        this.nombres = nombres;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        for (let x = 0; x < this.nombres.length; x++) {
            let encontro = obtener(this.nombres[x]);
            if (!encontro) {
                let err = new ErrorAlto("Semantico", "No se encontro el archivo: " + this.nombres[x], this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        }
    }
    get3D(tabla) {
        return "";
    }
}
exports.ImportarAlto = ImportarAlto;