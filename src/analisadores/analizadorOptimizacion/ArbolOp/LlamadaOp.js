class LlamadaOp {
    constructor(nombre, fila, columna) {
        this.nombre = nombre;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "call " + this.nombre + ";\n";
            return codigo;
        }
        return "";
    }
}
exports.LlamadaOp = LlamadaOp;