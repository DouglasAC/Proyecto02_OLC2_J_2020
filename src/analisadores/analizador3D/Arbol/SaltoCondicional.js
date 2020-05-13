
class SaltoCondicional {
    constructor(op1, signo, op2, identificador, fila, columna) {
        this.op1 = op1;
        this.op2 = op2;
        this.signo = signo;
        this.identificador = identificador
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(tabla) {

        var dato1 = this.op1.ejecutar(tabla);
        var signo = this.signo;
        var dato2 = this.op2.ejecutar(tabla);

        if (signo == "==") {
            if (dato1 == dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        } else if (signo == "<>") {
            if (dato1 != dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        } else if (signo == "<") {
            dato1 = parseFloat(dato1);
            dato2 = parseFloat(dato2);
            if (dato1 < dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        } else if (signo == ">") {
            dato1 = parseFloat(dato1);
            dato2 = parseFloat(dato2);
            if (dato1 > dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        } else if (signo == "<=") {
            dato1 = parseFloat(dato1);
            dato2 = parseFloat(dato2);
            if (dato1 <= dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        } else if (signo == ">=") {
            dato1 = parseFloat(dato1);
            dato2 = parseFloat(dato2);
            if (dato1 >= dato2) {
                let value = tabla.getItem(this.identificador);
                return value;
            } else {
                return null;
            }
        }
    }
}

exports.SaltoCondicional = SaltoCondicional;