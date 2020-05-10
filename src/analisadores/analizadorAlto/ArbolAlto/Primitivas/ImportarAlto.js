class ImportarAlto {
    constructor(nombres, fila, columna) {
        this.nombres = nombres;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        for (let x = 0; x < this.nombres.length; x++) {
            let encontro = obtener(this.nombres[x]);
            if (!encontro) {
                let err = new ErrorAlto("Semantico", "No se encontro el archivo: " + this.nombres[x], this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        }
    }
    get3D(tabla) {
        return "";
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Importar)\n";
        for (let x = 0; x < this.nombres.length; x++) {
            let nom = "node" + numero++;
            cuerpo += nom + "(Nombre Archivo: " + this.nombres[x] + ")\n";
            cuerpo += nodo + " --> " + nom + "\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.ImportarAlto = ImportarAlto;