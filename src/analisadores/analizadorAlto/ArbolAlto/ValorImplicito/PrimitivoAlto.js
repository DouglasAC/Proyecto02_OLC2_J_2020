class PrimitivoAlto {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        return [this.tipo];
    }
    get3D(tabla) {
        let codigo = "";
        if (this.tipo == 'int' || this.tipo == 'double') {
            let temp = tabla.getTemporal();
            codigo = temp + " = " + this.valor + ";\n";
            tabla.agregarNoUsados(temp);
        }
        else if (this.tipo == 'boolean') {
            let temp = tabla.getTemporal();
            if (this.valor) {
                codigo = temp + ' = 1;\n';
            } else {
                codigo = temp + ' = 0;\n';
            }
            tabla.agregarNoUsados(temp);
        } else if (this.tipo == 'null') {
            let temp = tabla.getTemporal();
            codigo = temp + ' = -1;\n';
            tabla.agregarNoUsados(temp);
        } else if (this.tipo == "char") {
            let temp = tabla.getTemporal();
            codigo = temp + ' = ' + this.valor.charCodeAt(0) + ";\n";
            tabla.agregarNoUsados(temp);
        } else if (this.tipo == "string") {
            let tempInicio = tabla.getTemporal();
            codigo += tempInicio + " = h;\n";
            codigo += "Heap[h] = " + this.valor.length + ";\n";
            codigo += "h = h + 1;\n";
            for (let i = 0; i < this.valor.length; i++) {
                codigo += "Heap[h] = " + this.valor[i].charCodeAt(0) + ";\n";
                codigo += "h = h + 1;\n";
            }
            let temp = tabla.getTemporal();
            codigo += temp + " = " + tempInicio + ";\n";
            tabla.agregarNoUsados(temp);
        }
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Primitivo " + this.valor + ")\n";
        let nuevo = new NodoDot(nodo, cuerpo, numero);
        return nuevo;
    }
}
exports.PrimitivoAlto = PrimitivoAlto;