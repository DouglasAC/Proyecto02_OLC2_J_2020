class AsignarSimpleOp {
    constructor(temp, valor, fila, columna) {
        this.temp = temp;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = this.temp + " = " + this.valor + ";\n";
            return codigo;
        }
        return "";
    }
    getExpresion() {
        let codigo = this.temp + " = " + this.valor + ";\n";
        return codigo;
    }
}
exports.AsignarSimpleOp = AsignarSimpleOp;