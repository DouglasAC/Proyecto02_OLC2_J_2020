class AsignarOperacionOp {
    constructor(temp, ope1, signo, ope2, fila, columna) {
        this.temp = temp;
        this.ope1 = ope1;
        this.signo = signo;
        this.ope2 = ope2;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = this.temp + " = " + this.ope1 + " " + this.signo + " " + this.ope2 + ";\n";
            return codigo;
        }
        return "";
    }
}
exports.AsignarOperacionOp = AsignarOperacionOp;