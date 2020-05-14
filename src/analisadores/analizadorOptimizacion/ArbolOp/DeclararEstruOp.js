class DeclararEstruOp {
    constructor(estructura, fila, columna) {
        this.estructura = estructura;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "var " + this.estructura + "[];\n";
            return codigo;
        }
        return "";
    }
    getExpresion() {
        let codigo = "var " + this.estructura + "[];\n";
        return codigo;
    }
}
exports.DeclararEstruOp = DeclararEstruOp;