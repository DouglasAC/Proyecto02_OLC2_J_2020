class DeclararTempOp {
    constructor(lista, fila, columna) {
        this.lista = lista;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = "var ";
            for (let x = 0; x < this.lista.length; x++) {
                if (x != 0) {
                    codigo += ", ";
                }
                codigo += this.lista[x];
            }
            codigo += ";\n";
            return codigo;
        }
        else {
            return "";
        }
    }
    getExpresion() {
        let codigo = "var ";
        for (let x = 0; x < this.lista.length; x++) {
            if (x != 0) {
                codigo += ", ";
            }
            codigo += this.lista[x];
        }
        codigo += ";\n";
        return codigo;
    }
}
exports.DeclararTempOp = DeclararTempOp;