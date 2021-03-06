class FuncionAlto {
    constructor(tipo, nombre, parametros, sentencias, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.parametros = parametros;//[tipo, nombre]
        this.sentencias = sentencias;
        this.fila = fila;
        this.columna = columna;
        this.nombreFalso = "";
    }
    analizar(tabla) {
        let nombreFun = this.nombre;
        let nombres_par = [];
        for (let x = 0; x < this.parametros.length; x++) {
            if (this.parametros[x][0][0] == "Tarry") {
                nombreFun += "_arreglo_" + this.parametros[x][0][1];
            } else {
                nombreFun += "_" + this.parametros[x][0];
            }

            let nom = this.parametros[x][1].toLocaleLowerCase();
            for (let y = 0; y < nombres_par.length; y++) {
                if (nom == nombres_par[y].toLocaleLowerCase()) {
                    let err = new ErrorAlto("Semantico", "La funcion tiene parametros con el mismo nombre", this.fila, this.columna);
                    tabla.errores.push(err);
                    return err;
                }
            }
        }
        /// verificar que el tipo exista si es struc
        if (tabla.existeFuncion(nombreFun)) {
            let err = new ErrorAlto("Semantico", "La funcion " + this.nombre + " con " + this.parametros.length + " parametros y el mismo tipo ya existe", this.fila, this.columna);
            tabla.errores.push(err);
            return err;
        }
        this.nombreFalso = nombreFun;
        let fun = new SimboloFuncion(nombreFun, this.nombre, this.tipo, this.parametros, this.sentencias, this.parametros.length + 1);
        tabla.agregarFuncion(fun);
        tabla.simbolos.push(fun);
    }
    get3D(tabla) {
        let codigo = "# Inicio traduccion Funcion: " + this.nombre + " fila: " + this.fila + " columna: " + this.columna + "\n";


        codigo += "proc " + this.nombreFalso + " begin\n";

        tabla.locales = new Entorno(null);
        tabla.stack = 1;
        let etqS = tabla.getEtiqueta();
        tabla.tipoFuncion = this.tipo;
        tabla.finFuncion = etqS;
        tabla.entorno = "local";
        tabla.ambito = this.nombreFalso;


        for (let x = 0; x < this.parametros.length; x++) {
            let sim = new SimboloAlto(this.parametros[x][0], this.parametros[x][1].toLocaleLowerCase(), "local", tabla.getStack(), false, null, tabla.ambito, "Parametro / Variable", false);
            tabla.agregarLocal(sim);
            tabla.simbolos.push(sim);
        }
        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            if (!(sentencia instanceof DefinirEstructura)) {
                if (sentencia instanceof DeclaracionSinTipoAlto) {
                    if (sentencia.tipo != "global") {
                        let val = sentencia.analizar(tabla);
                    }
                } else {
                    let val = sentencia.analizar(tabla);
                }
            }
        }
        if (tabla.errores.length > 0) {
            tabla.tipoFuncion = ["void"];
            tabla.finFuncion = "";
            return tabla.errores[0];
        }
        for (let x = 0; x < this.sentencias.length; x++) {
            let sentencia = this.sentencias[x];
            codigo += sentencia.get3D(tabla);
            if (sentencia instanceof LLamadaAlto
                || sentencia instanceof LlamadaTipo2Alto
                || sentencia instanceof LlamadaAccesoAlto
                || sentencia instanceof AccesoAlto
            ) {
                let quit = tabla.getTemporalActual();
                tabla.quitarNoUsados(quit);
            }
        }
        tabla.entorno = "global";
        tabla.ambito = "global";
        tabla.tipoFuncion = ["void"];
        tabla.finFuncion = "";
        tabla.locales = new Entorno(null);
        tabla.stack = 0;
        codigo += etqS + ":\n";
        codigo += "end\n";
        codigo += "# Fin tracuccion Funcion\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "[label=\"Funcion\"]\n";
        let tipo = "node" + numero++;
        if (this.tipo[0] == "Tarry") {
            cuerpo += tipo + "[label=\"Tipo: Arreglo de " + this.tipo[0] + "\"]\n";
        } else {
            cuerpo += tipo + "[label=\"Tipo: " + this.tipo[0] + "\"]\n";
        }
        cuerpo += nodo + " -> " + tipo + "\n";

        let nom = "node" + numero++;
        cuerpo += nom + "[label=\"Identificador: " + this.nombre + "\"]\n";
        cuerpo += nodo + " -> " + nom + "\n";

        let param = "node" + numero++;
        cuerpo += param + "[label=\"Parametros\"]\n";
        cuerpo += nodo + " -> " + param + "\n";

        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            let para = "node" + numero++;
            cuerpo += para + "[label=\"Parametro\"]\n";
            cuerpo += param + " -> " + para + "\n";
            let tpar = par[0];
            let tipar = "node" + numero++;
            if (tpar[0] == "Tarry") {
                cuerpo += tipar + "[label=\"Tipo: Arreglo de " + tpar[1] + "\"]\n";
            } else {
                cuerpo += tipar + "[label=\"Tipo: " + tpar[0] + "\"]\n";
            }
            cuerpo += para + " -> " + tipar + "\n";
            let nompar = "node" + numero++;
            cuerpo += nompar + "[label=\"Identificador: " + par[1] + "\"]\n";
            cuerpo += para + " -> " + nompar + "\n";
        }

        let NodoSentencias = "node" + numero++;
        cuerpo += NodoSentencias + "[label=\"Sentencias\"]\n";
        cuerpo += nodo + " -> " + NodoSentencias + "\n";

        for (let x = 0; x < this.sentencias.length; x++) {
            let nuevo = this.sentencias[x].generarCuerpo(numero);
            numero = nuevo.numero;
            cuerpo += nuevo.cuerpo;
            cuerpo += NodoSentencias + " -> " + nuevo.nombre + "\n";
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        //console.log("numero funcion " + nuevo.numero)
        return nuevo;
    }
}
exports.FuncionAlto = FuncionAlto;