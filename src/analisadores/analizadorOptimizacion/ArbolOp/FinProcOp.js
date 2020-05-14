class FinProcOp {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            return "end\n";
        }
        return "";
    }
}
exports.FinProcOp = FinProcOp;