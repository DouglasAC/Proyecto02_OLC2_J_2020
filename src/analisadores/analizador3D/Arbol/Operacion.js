class Operacion {
    constructor(Operador, ope1, ope2, fila, columna) {
        this.Operador = Operador;
        this.ope1 = ope1;
        this.ope2 = ope2;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {
        let op1 = this.ope1.ejecutar(tabla);
        let op2 = this.ope2.ejecutar(tabla);
        if (this.Operador.toLowerCase() == "+") {
            return op1 + op2;
        } else if (this.Operador.toLowerCase() == "-") {
            return op1 - op2;
        } else if (this.Operador.toLowerCase() == "*") {
            return op1 * op2;
        } else if (this.Operador.toLowerCase() == "/") {
            return op1 / op2;
        } else { 
            return op1 % op2;// modulo
        }
    }
}
exports.Operacion = Operacion;