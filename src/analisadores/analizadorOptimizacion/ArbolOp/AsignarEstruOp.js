class AsignarEstruOp {
    constructor(temp, estructura, posicion, fila, columna) {
        this.temp = temp;
        this.estructura = estructura;
        this.posicion = posicion;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = this.temp + " = " + this.estructura + "[" + this.posicion + "];\n";
            return codigo;
        }
        return "";
    }
}
exports.AsignarEstruOp = AsignarEstruOp;