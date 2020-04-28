class Metodo {
    constructor(identificador, instrucciones, fila, columna) {
        this.identificador = identificador;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
        this.InitMethod = new InicioMetodo(this.identificador, this.instrucciones.length, fila, columna);
        this.EndMethod = new FinMetodo(this.identificador, fila, columna);
        this.instruccionesMetodo = [];
        this.instruccionesMetodo.push(this.InitMethod);
        this.instrucciones.map(m => {
            this.instruccionesMetodo.push(m);
        })
        this.instruccionesMetodo.push(this.EndMethod);
    }

    ejecutar(tabla) {
        tabla.insertarMetodo(this.identificador, this.instrucciones);
        return null;
    }
}
exports.Metodo = Metodo;