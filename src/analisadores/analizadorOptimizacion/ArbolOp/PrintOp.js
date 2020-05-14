class PrintOp {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = `print(\"${this.tipo}\", ${this.valor});\n`;
            return codigo;
        }
        return "";
    }
    getExpresion() {
        let codigo = `print(\"${this.tipo}\", ${this.valor});\n`;
        return codigo;
    }
}
exports.PrintOp = PrintOp;