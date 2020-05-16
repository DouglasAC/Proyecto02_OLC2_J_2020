class SaltoIncondicionalOp {
    constructor(etiqueta, fila, columna) {
        this.etiqueta = etiqueta;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "goto " + this.etiqueta + ";\n";
            return codigo;
        }
        return "";
    }
    getExpresion() {
        let codigo = "goto " + this.etiqueta + ";\\n";
        return codigo;
    }
}
exports.SaltoIncondicionalOp = SaltoIncondicionalOp;