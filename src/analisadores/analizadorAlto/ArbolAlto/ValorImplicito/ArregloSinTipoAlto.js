class ArregloSinTipoAlto {
    constructor(expresiones, fila, columna) {
        this.expresiones = expresiones;
        this.fila = fila;
        this.columna = columna;
        this.tipo = [];
    }
    analizar(tabla) {
        let tipos = [];
        for (let x = 0; x < this.expresiones.length; x++) {
            let t = this.expresiones[x].analizar(tabla);
            if (t instanceof ErrorAlto) {
                return t;
            } else {
                tipos.push(t);
            }
        }
        let tipo = tipos[0];
        if (!this.todosIguales(tipos)) {
            if (this.todosInt(tipos)) {
                tipo = ["integer"];
            } else if (this.todosDouble(tipos)) {
                tipo = ["double"]
            } else {
                let err = new ErrorAlto("Semantico", "La expresions para formar el arreglo deben  ser derl mismo tipo, " + tipos, this.fila, this.columna);
                tabla.errores.push(err);
                return err;
            }
        }
        this.tipo = ["Tarry", tipo[0]];
        return this.tipo;
    }
    todosIguales(tipos) {
        let primero = tipos[0];
        for (let x = 0; x < tipos.length; x++) {
            if (primero[0] != tipos[x][0]) {
                return false;
            }
        }
        return true;
    }
    todosInt(tipos) {
        for (let x = 0; x < tipos.length; x++) {
            if (!(tipos[x][0] == "integer" || tipos[x][0] == "char")) {
                return false;
            }
        }
        return true;
    }
    todosDouble(tipos) {
        for (let x = 0; x < tipos.length; x++) {
            if (!(tipos[x][0] == "integer" || tipos[x][0] == "char" || tipos[x][0] == "double")) {
                return false;
            }
        }
        return true;
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccion Expresion Arreglo sin Tipo fila: " + this.fila + " columna: " + this.columna + "\n";

        let temporales = [];

        for (let x = 0; x < this.expresiones.length; x++) {
            codigo += this.expresiones[x].get3D(tabla);
            let temp = tabla.getTemporalActual();
            tabla.agregarNoUsados(temp);
            temporales.push(temp);
        }

        let tempR = tabla.getTemporal();
        codigo += tempR + " = h + 0;\n";
        tabla.agregarNoUsados(tempR);

        codigo += "Heap[h] = " + this.expresiones.length + ";\n";
        codigo += "h = h + 1;\n";

        for (let x = 0; x < temporales.length; x++) {
            codigo += "Heap[h] = " + temporales[x] + ";\n";
            codigo += "h = h + 1;\n";
            tabla.quitarNoUsados(temporales[x]);
        }

        codigo += "# Fin Expresion Arreglo sin Tipo\n"
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Expresion Arreglo ST)\n";
        let nodoExpresiones = "node" + numero++;
        cuerpo += nodoExpresiones + "(Expresiones)\n";
        cuerpo += nodo + " --> " + nodoExpresiones + "\n";
        for (let x = 0; x < this.expresiones.length; x++) {
            let nodoExp = "node" + numero++;
            cuerpo += nodoExp + "(Expresion)\n";
            cuerpo += nodoExpresiones + " --> " + nodoExp + "\n";
            let val = this.expresiones[x].generarCuerpo(numero);
            cuerpo += val.cuerpo;
            numero = val.numero;
            cuerpo += nodoExp + " --> " + val.nombre + "\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.ArregloSinTipoAlto = ArregloSinTipoAlto;