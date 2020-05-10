class SeleccionarAlto {
    constructor(expresion, casos, defecto, fila, columna) {
        this.expresion = expresion;
        this.casos = casos;
        this.defecto = defecto;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let exp = this.expresion.analizar(tabla);
        if (this.expresion instanceof ErrorAlto) {
            return exp;
        }
        tabla.displayBreak.push(1);
        for (let x = 0; x < this.casos.length; x++) {
            let caso = this.casos[x];
            let igual = new OperacionAlto(this.expresion, caso.expresion, null, "==", caso.fila, caso.columna);
            let expigual = igual.analizar(tabla);
            if (expigual instanceof ErrorAlto) {
                return expigual;
            }
            let local = new Entorno(tabla.locales);
            tabla.locales = local;
            let sentencias = caso.sentencias;

            for (let x = 0; x < sentencias.length; x++) {
                let sentencia = sentencias[x];
                if (!(sentencia instanceof DefinirEstructura)) {
                    let res = sentencia.analizar(tabla);
                    if (res instanceof ErrorAlto) {
                        return res;
                    }
                }
            }
            caso.local = local;
            tabla.locales = local.anterior;
        }

        if (this.defecto != null) {
            let local = new Entorno(tabla.locales);
            tabla.locales = local;
            let sentencias = this.defecto.sentencias;
            for (let x = 0; x < sentencias.length; x++) {
                let sentencia = sentencias[x];
                if (!(sentencia instanceof DefinirEstructura)) {
                    if (sentencia instanceof DeclaracionSinTipoAlto) {
                        if (instrucion.tipo != "global") {
                            let res = sentencia.analizar(tabla);
                            if (res instanceof ErrorAlto) {
                                return res;
                            }
                        }
                    } else {
                        let res = sentencia.analizar(tabla);
                        if (res instanceof ErrorAlto) {
                            return res;
                        }
                    }
                }
            }
            this.defecto.local = local;
            tabla.locales = local.anterior;
        }
        tabla.displayBreak.pop();
    }
    get3D(tabla) {
        let codigo = "# Inicio Tracuccion Switch fila: " + this.fila + " columna: " + this.columna + "\n";

        let etqBre = tabla.getEtiqueta();
        tabla.displayBreak.push(etqBre);
        let etiquetas = [];
        for (let x = 0; x < this.casos.length; x++) {
            let caso = this.casos[x];
            let igual = new OperacionAlto(this.expresion, caso.expresion, null, "==", caso.fila, caso.columna);
            let expigual = igual.get3D(tabla);
            if (expigual instanceof ErrorAlto) {
                return expigual;
            }
            codigo += expigual;
            let temp = tabla.getTemporalActual();
            let etiq = tabla.getEtiqueta();
            codigo += "if (" + temp + " == 1) goto " + etiq + ";\n";
            etiquetas.push(etiq);
        }

        if (this.defecto != null) {
            let caso = this.defecto
            tabla.locales = caso.local;
            caso.sentencias.map(m => {
                let cod = m.get3D(tabla);
                if (cod instanceof ErrorAlto) {
                    return cod;
                }
                codigo += cod;
            });
            tabla.locales = caso.local.anterior;
        }
        codigo += "goto " + etqBre + ";\n";
        for (let x = 0; x < this.casos.length; x++) {
            let caso = this.casos[x];
            codigo += etiquetas[x] + ":\n";
            tabla.locales = caso.local;
            caso.sentencias.map(m => {
                let cod = m.get3D(tabla);
                if (cod instanceof ErrorAlto) {
                    return cod;
                }
                codigo += cod;
            });
            tabla.locales = caso.local.anterior;
        }
        codigo += etqBre + ":\n";
        tabla.displayBreak.pop();

        codigo += "# Fin traduccion Switch\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(\"Sentencia_Switch\")\n";
        let nodoIdent = "node" + numero++;
        cuerpo += nodoIdent + "(\"Condicion\")\n";
        cuerpo += nodo + " --> " + nodoIdent + "\n";
        let valorNodo = this.expresion.generarDot(numero);
        cuerpo += valorNodo.cuerpo;
        numero = valorNodo.numero;
        cuerpo += nodoIdent + " --> " + valorNodo.nombre + "\n";
        let NodoSentencias = "node" + numero++;
        cuerpo += NodoSentencias + "(\"Casos\")\n";
        cuerpo += nodo + "->" + NodoSentencias + "\n";


        for (let x = 0; x < this.casos.length; x++) {
            let caso = this.casos[x];
            let nodoCaso = "node" + numero++;
            cuerpo += nodoCaso + "(\"Caso\")\n";
            cuerpo += NodoSentencias + " --> " + nodoCaso + ";\n";
            let cas = caso.expresion.generarCuerpo(numero);
            cuerpo += cas.cuerpo;
            numero = cas.numero;
            let comparar = "node" + numero++;
            cuerpo += comparar + "(\"Comparar\")\n";
            cuerpo += nodoCaso + " --> " + comparar + "\n";
            cuerpo += comparar + " --> " + cas.nombre + "\n";

            let sentencias = "node" + numero++;

            cuerpo += sentencias + "(\"Sentencias\")\n";
            cuerpo += nodoCaso + " -> " + sentencias + "\n";
            numero++;
            for (let y = 0; y < caso.sentencias.length; y++) {
                let nuevo = caso.sentencia[y].generarDot(numero);
                numero = nuevo.numero;
                cuerpo += nuevo.cuerpo;
                cuerpo += sentencias + " -> " + nuevo.nombre + "\n";
            }
        }

        if (this.defecto != null) {
            let nodoCaso = "node" + numero++;
            cuerpo += nodoCaso + "(\"Caso_Defecto\")\n";
            cuerpo += NodoSentencias + " --> " + nodoCaso + ";\n";

            let sentencias = "node" + numero;
            cuerpo += sentencias + "(\"Sentencias\")\n";
            cuerpo += nodoCaso + " -> " + sentencias + ";\n";

            for (let x = 0; x < this.defecto.sentencias.length; x++) {
                let nuevo = this.defecto.sentencias[x].generarCuerpo(numero);
                numero = nuevo.numero;
                cuerpo += nuevo.cuerpo;
                cuerpo += sentencias + " --> " + nuevo.nombre + ";\n";
            }
        }

        let nuevo = new NodoDot(nodo, valorNodo.Cuerpo + cuerpo, numero + 1);
        return nuevo;
    }
}
exports.SeleccionarAlto = SeleccionarAlto;