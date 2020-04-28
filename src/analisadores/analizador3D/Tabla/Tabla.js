class Tabla {
    constructor() {
        this.stack = [];
        this.heap = [];
        this.tabla = new Array();
        this.isDebugger = false;
        this.indiceDebugger = 0;
        this.listaRetornosCall = [];
        this.temporales = [];
        this.insertar("h", 0);
        this.insertar("p", 0);
    }
    insertar(id, valor) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.valor = valor;
                return;
            }
        }
        this.tabla.push(new Simbolo(id.toLowerCase(), valor, null));
    }

    insertarMetodo(id, instrucciones) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.ListaIns = instrucciones;
                return;
            }
        }
        this.tabla.push(new Simbolo(id.toLowerCase(), null, instrucciones));
    }

    getItem(id) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.valor;
            }
        }
        return null;
    }

    getInstructions(id) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.ListaIns;
            }
        }
        return null;
    }

    setHeap(posicion, valor) {
        this.heap[posicion] = valor;
        for (var i = 0; i < this.heap.length; i++) {
            let m = this.heap[i];
            if (m == undefined || m == NaN || m == null) {
                this.heap[i] = -1;
            }
        }
    }

    setStack(posicion, valor) {
        this.stack[posicion] = valor;
        for (var i = 0; i < this.stack.length; i++) {
            let m = this.stack[i];
            if (m == undefined || m == NaN || m == null) {
                this.stack[i] = -1;
            }
        }
    }

    getHeap(posicion) {
        return this.heap[posicion];
    }

    getStack(posicion) {
        return this.stack[posicion];
    }

    getTemporal() {
        var temp = 't' + this.indiceTemporal++;
        this.temporales.push(temp);
        return temp;
    }

    getTemporalActual() {
        return 't' + (this.indiceTemporal - 1);
    }
   
}
exports.Tabla = Tabla;