class InicioProcOp {
    constructor(nombre, fila, columna) {
        this.nombre = nombre;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "proc " + this.nombre + " begin\n";
            return codigo;
        }
        return "";
    }
    getExpresion() {
        let codigo = "proc " + this.nombre + " begin\\n";
        return codigo;
    }
}
exports.InicioProcOp = InicioProcOp;