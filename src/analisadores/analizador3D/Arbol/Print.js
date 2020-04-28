class Print {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(tabla) {
        let value = this.valor.ejecutar(tabla);

        if (this.tipo.toLowerCase() == "%c") {
            document.getElementById("consola").value += String.fromCharCode(value);
        } else if (this.tipo.toLowerCase() == "%d") {
            document.getElementById("consola").value += parseFloat(value + "").toFixed(2);
        } else {
            document.getElementById("consola").value += parseInt(value + "", 10);
        }
        return null;
    }


}
exports.Print = Print;