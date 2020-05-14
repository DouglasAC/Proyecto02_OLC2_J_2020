class SaltoCondicionalOp {
    constructor(ope1, tipo, ope2, etiqueta, fila, columna) {
        this.ope1 = ope1;
        this.tipo = tipo;
        this.ope2 = ope2;
        this.etiqueta = etiqueta;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "if (" + this.ope1 + " " + this.tipo + " " + this.ope2 + ") goto " + this.etiqueta + ";\n";
            return codigo;
        }
        return "";
    }
}
exports.SaltoCondicionalOp = SaltoCondicionalOp;