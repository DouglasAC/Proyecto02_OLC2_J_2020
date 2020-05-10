class DoWhileAlto {
    constructor(condicion, sentencias, fila, columna) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.fila = fila;
        this.columna = columna;
        this.local = null;
    }
    analizar(tabla) {
        let con = this.condicion.analizar(tabla);
        if (con instanceof ErrorAlto) {
            return con;
        }

        if (con != 'boolean') {
            let err = new ErrorAlto("Semantico", "La condicion en Do While debe ser de tipo boolean", this.fila, this.columna);
            tabla.agregarError(err);
            return err;
        }
        tabla.displayBreak.push(1);
        tabla.displayContinue.push(1);
        let local = new Entorno(tabla.locales);
        tabla.locales = local;
        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (instrucion.tipo != "global") {
                        let res = sentencia.analizar(tabla);
                        if (res instanceof ErrorAlto) {
                            tabla.displayBreak.pop();
                            tabla.displayContinue.pop();
                            return res;
                        }
                    }
                } else {
                    let res = sentencia.analizar(tabla);
                    if (res instanceof ErrorAlto) {
                        tabla.displayBreak.pop();
                        tabla.displayContinue.pop();
                        return res;
                    }
                }
            }
        }
        this.local = local;
        tabla.locales = local.anterior;
        tabla.displayBreak.pop();
        tabla.displayContinue.pop();
    }
    get3D(tabla) {
        let codigo = "# Inicio Do While fila: " + this.fila + " columna: " + this.columna + "\n";
        let etqCon = tabla.getEtiqueta();
        let etqBre = tabla.getEtiqueta();
        let etqV = tabla.getEtiqueta();
        tabla.displayContinue.push(etqCon);
        tabla.displayBreak.push(etqBre);

        codigo += etqV + ":\n";
        tabla.locales = this.local;
        this.sentencias.map(m => {
            codigo += m.get3D(tabla);
        });
        tabla.locales = this.local.anterior;

        codigo += etqCon + ":\n";

        codigo += this.condicion.get3D(tabla);
        let temp = tabla.getTemporalActual();

        codigo += "if (" + temp + " == 1) goto " + etqV + ";\n"
        tabla.quitarNoUsados(temp);
        codigo += etqBre + ":\n";

        codigo += "# Fin Do While\n"
        tabla.displayContinue.pop();
        tabla.displayBreak.pop();
        return codigo;
    }
    generarCuerpo(numero) {
        let valorNodo = this.condicion.generarCuerpo(numero);

        let nodo = "node" + valorNodo.numero;
        let cuerpo = nodo + "(\"Sentencia_Do_While\")\n";
        let nodoIdent = "node" + (valorNodo.numero + 1);
        cuerpo += nodoIdent + "(\"Condicion\")\n";
        cuerpo += nodo + " --> " + nodoIdent + ";\n";
        cuerpo += nodoIdent + " --> " + valorNodo.nombre + ";\n";
        let NodoSentencias = "node" + (valorNodo.numero + 2);
        cuerpo += NodoSentencias + "(\"Sentencias\")\n";
        cuerpo += nodo + " --> " + NodoSentencias + ";\n";
        numero = valorNodo.numero + 3;
        for (let x = 0; x < this.sentencias.length; x++) {
            let nuevo = this.sentencias[x].generarCuerpo(numero);
            numero = nuevo.numero;
            cuerpo += nuevo.cuerpo;
            cuerpo += NodoSentencias + " --> " + nuevo.nombre + ";\n";
        }

        let nuevo = new NodoDot(nodo, valorNodo.cuerpo + cuerpo, numero + 1);
        return nuevo;
    }
}
exports.DoWhileAlto = DoWhileAlto;