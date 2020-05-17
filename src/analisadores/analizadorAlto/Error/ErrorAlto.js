class ErrorAlto {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla)
    {
        tabla.errores.push(this)
        return this;
    }
    get3D(tabla) {
        
        return "codigo";
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Error: " + this.tipo + "\"]\n";
        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    }
}
exports.ErrorAlto = ErrorAlto;