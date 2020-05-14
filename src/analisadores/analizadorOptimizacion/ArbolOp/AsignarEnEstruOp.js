class AsignarEnEstruOp {
    constructor(estructura, posicion, valor, fila, columna) {
        this.estructura = estructura;
        this.posicion = posicion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = this.estructura + "[" + this.posicion + "] = " + this.valor + ";\n";
            return codigo;
        }
        return "";
    }
}
exports.AsignarEnEstruOp = AsignarEnEstruOp;