class EtiquetaOp {
    constructor(etiqueta, fila, columna) {
        this.etiqueta = etiqueta;
        this.fila = fila;
        this.columna = columna;
        this.avilitado = true;
    }
    getCodigo() {
        if (this.avilitado) {
            let codigo = this.etiqueta + ":\n";
            return codigo;
        }
        return "";
    }
}
this.EtiquetaOp = EtiquetaOp;