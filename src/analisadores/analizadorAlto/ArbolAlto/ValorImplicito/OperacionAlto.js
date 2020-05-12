class OperacionAlto {
    constructor(operando1, operando2, operandoU, operador, fila, columna) {
        this.operando1 = operando1;
        this.operando2 = operando2;
        this.operandoU = operandoU;
        this.operador = operador;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let tipoResultado;
        let tipo1;
        let tipo2;
        let tipoU;
        if (this.operandoU == null) {
            tipo1 = this.operando1.analizar(tabla);
            if (tipo1 instanceof ErrorAlto) {
                return tipo1;
            }
            tipo1 = tipo1[0];
            tipo2 = this.operando2.analizar(tabla);
            if (tipo2 instanceof ErrorAlto) {
                return tipo2;
            }
            tipo2 = tipo2[0];
        } else {
            tipoU = this.operandoU.analizar(tabla)
            if (tipoU instanceof ErrorAlto) {
                return tipoU;
            }
            tipoU = tipoU[0];
        }
        switch (this.operador) {
            case '+':
                tipoResultado = this.analizarSuma(tipo1, tipo2);
                break;
            case '-':
                tipoResultado = this.analizarResta(tipo1, tipo2);
                break;
            case '*':
                tipoResultado = this.analizarMultiplicacion(tipo1, tipo2);
                break;
            case '/':
                tipoResultado = this.analizarDivision(tipo1, tipo2);
                break;
            case '^^':
                tipoResultado = this.analizarPotencia(tipo1, tipo2);
                break;
            case '%':
                tipoResultado = this.analizarModulo(tipo1, tipo2);
                break;
            case '==':
                tipoResultado = this.analizarIgualdad(tipo1, tipo2);
                break;
            case '!=':
                tipoResultado = this.analizarIgualdad(tipo1, tipo2);
                break;
            case '<':
                tipoResultado = this.analizarRelacional(tipo1, tipo2);
                break;
            case '>':
                tipoResultado = this.analizarRelacional(tipo1, tipo2);
                break;
            case '<=':
                tipoResultado = this.analizarRelacional(tipo1, tipo2);
                break;
            case '>=':
                tipoResultado = this.analizarRelacional(tipo1, tipo2);
                break;
            case '||':
                tipoResultado = this.analizarLogica(tipo1, tipo2);
                break;
            case '&&':
                tipoResultado = this.analizarLogica(tipo1, tipo2);
                break;
            case '^':
                tipoResultado = this.analizarLogica(tipo1, tipo2);
                break;
            case 'U':
                tipoResultado = this.analizarMenosUnitario(tipoU);
                break;
            case '!':
                tipoResultado = this.analizarNot(tipoU);
                break;
            case '===':
                tipoResultado = this.analizarIgualdadReferencia(tipo1, tipo2);
                break;
        }
        if (tipoResultado instanceof ErrorAlto) {
            tabla.agregarError(tipoResultado);
        }
        return [tipoResultado];
    }
    analizarSuma(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'integer')
        ) {
            return 'integer';
        } else if ((tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'double')
        ) {
            return 'double';
        } else if ((tipo1 == 'string' && tipo2 == 'string')
            || (tipo1 == 'string' && tipo2 == 'integer')
            || (tipo1 == 'string' && tipo2 == 'double')
            || (tipo1 == 'string' && tipo2 == 'char')
            || (tipo1 == 'string' && tipo2 == 'boolean')
            || (tipo1 == 'integer' && tipo2 == 'string')
            || (tipo1 == 'double' && tipo2 == 'string')
            || (tipo1 == 'char' && tipo2 == 'string')
            || (tipo1 == 'boolean' && tipo2 == 'string')
            || (tipo1 == 'char' && tipo2 == 'char')
        ) {
            return 'string';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Suma", this.fila, this.columna);
        }
    }
    analizarResta(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'integer')
            || (tipo1 == 'char' && tipo2 == 'char')
        ) {
            return 'integer';
        } else if ((tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'double')
        ) {
            return 'double';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Resta", this.fila, this.columna);
        }
    }
    analizarMultiplicacion(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'integer')
            || (tipo1 == 'char' && tipo2 == 'char')
        ) {
            return 'integer';
        } else if ((tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'double')
        ) {
            return 'double';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Multiplicacion", this.fila, this.columna);
        }
    }
    analizarDivision(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'integer' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'char' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'char' && tipo2 == 'integer')
        ) {
            return 'double';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Divsion", this.fila, this.columna);
        }
    }
    analizarPotencia(tipo1, tipo2) {
        if (tipo1 == 'integer' && tipo2 == 'integer') {
            return 'integer';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Potencia", this.fila, this.columna);
        }
    }
    analizarModulo(tipo1, tipo2) {
        if (tipo1 == 'integer' && tipo2 == 'integer') {
            return 'integer';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Modulo", this.fila, this.columna);
        }
    }
    analizarIgualdad(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'double')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'integer')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'boolean' && tipo2 == 'boolean')
            || (tipo1 == 'string' && tipo2 == 'string')
            || (tipo1 == "null" || tipo2 == "null")
        ) {
            return 'boolean';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Igualacion: " + this.operador, this.fila, this.columna);
        }
    }
    analizarIgualdadReferencia(tipo1, tipo2) {
        if ((tipo1 == 'arreglo' && tipo2 == 'arreglo')
            || (tipo1 == 'string' && tipo2 == 'string')
        ) {
            return 'boolean';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Igualacion Referencia: " + this.operador, this.fila, this.columna);
        }
    }
    analizarRelacional(tipo1, tipo2) {
        if ((tipo1 == 'integer' && tipo2 == 'integer')
            || (tipo1 == 'integer' && tipo2 == 'double')
            || (tipo1 == 'integer' && tipo2 == 'char')
            || (tipo1 == 'double' && tipo2 == 'double')
            || (tipo1 == 'double' && tipo2 == 'integer')
            || (tipo1 == 'double' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'char')
            || (tipo1 == 'char' && tipo2 == 'double')
            || (tipo1 == 'char' && tipo2 == 'integer')
        ) {
            return 'boolean';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Relacional " + this.operador, this.fila, this.columna);
        }
    }
    analizarLogica(tipo1, tipo2) {
        if (tipo1 == 'boolean' && tipo2 == 'boolean') {
            return 'boolean';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Logico " + this.operador, this.fila, this.columna);
        }
    }
    analizarMenosUnitario(tipo) {
        if (tipo == 'integer') {
            return 'integer';
        } else if (tipo == 'double') {
            return 'double';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Menos Unitario " + this.operador, this.fila, this.columna);
        }
    }
    analizarNot(tipo) {
        if (tipo == 'boolean') {
            return 'boolean';
        } else {
            return new ErrorAlto("Semantico", "Error de tipos en Not " + this.operador, this.fila, this.columna);
        }
    }
    get3D(tabla) {
        let codigo = "# Operacion: " + this.operador + " fila " + this.fila + " columna " + this.columna + "\n";
        switch (this.operador) {
            case '+':
                codigo += this.get3DSuma(tabla);
                break;
            case '-':
                codigo += this.get3DResta(tabla);
                break;
            case '*':
                codigo += this.get3DMultiplicacion(tabla);
                break;
            case '/':
                codigo += this.get3DDivision(tabla);
                break;
            case '^^':
                codigo += this.get3DPotencia(tabla);
                break;
            case '%':
                codigo += this.get3DModulo(tabla);
                break;
            case '==':
                codigo += this.get3DIgualIgual(tabla);
                break;
            case '===':
                codigo += this.get3DIgualIgual(tabla);
                break;
            case '!=':
                codigo += this.get3DDiferente(tabla);
                break;
            case '<':
                codigo += this.get3DMenorQue(tabla);
                break;
            case '>':
                codigo += this.get3DMayorQue(tabla);
                break;
            case '<=':
                codigo += this.get3DMenorIgual(tabla);
                break;
            case '>=':
                codigo += this.get3DMayorIgual(tabla);
                break;
            case '||':
                codigo += this.get3DOr(tabla);
                break;
            case '&&':
                codigo += this.get3DAnd(tabla);
                break;
            case '^':
                codigo += this.get3DXor(tabla);
                break;
            case 'U':
                codigo += this.get3DMenosUnario(tabla);
                break;
            case '!':
                codigo += this.get3DNot(tabla);
                break;
            case '===':
                codigo += this.get3dIgualReferencia(tabla);
                break;
        }
        codigo += "# Fin de la operacion\n"
        return codigo;
    }
    get3DSuma(tabla) {
        let codigo = "";
        let tipo1 = this.operando1.analizar(tabla);
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        let tipo2 = this.operando2.analizar(tabla);
        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        if ((tipo1[0] == "integer" && tipo2[0] == "integer")
            || (tipo1[0] == "integer" && tipo2[0] == "double")
            || (tipo1[0] == "integer" && tipo2[0] == "char")
            || (tipo1[0] == "double" && tipo2[0] == "double")
            || (tipo1[0] == "double" && tipo2[0] == "integer")
            || (tipo1[0] == "double" && tipo2[0] == "char")
            || (tipo1[0] == "char" && tipo2[0] == "double")
            || (tipo1[0] == "char" && tipo2[0] == "integer")) {
            let tempR = tabla.getTemporal();
            codigo += tempR + " = " + op1 + " + " + op2 + ";\n"
            tabla.agregarNoUsados(tempR);
        } else if (tipo1[0] == "string" && tipo2[0] == "string") {
            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempPar2 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op1 + ";\n";
            codigo += tempPar2 + " = p + 2;\n";
            codigo += "Stack[" + tempPar2 + "] = " + op2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            tabla.agregarNoUsados(tempR2);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        } else if (tipo1[0] == "string" && tipo2[0] == "boolean") {
            codigo += "# Inicio Traduccion llamada a booleanAstring fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op2 + ";\n";
            codigo += "call booleanastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a booleanAstring\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + op1 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + tempR2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";

        } else if (tipo1[0] == "boolean" && tipo2[0] == "string") {
            codigo += "# Inicio Traduccion llamada a booleanAstring fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op1 + ";\n";
            codigo += "call booleanastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a booleanAstring\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + tempR2 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + op2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";

        } else if (tipo1[0] == "string" && tipo2[0] == "integer") {
            codigo += "# Inicio Traduccion llamada a enteroastring fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op2 + ";\n";
            codigo += "call enteroastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a entero a string\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + op1 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + tempR2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";

        } else if (tipo1[0] == "integer" && tipo2[0] == "string") {
            codigo += "# Inicio Traduccion llamada a entro a string fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op1 + ";\n";
            codigo += "call enteroastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a entero a string\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + tempR2 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + op2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        } else if (tipo1[0] == "char" && tipo2[0] == "char") {
            let apunChar = tabla.getTemporal();
            codigo += apunChar + " = h + 0;\n";
            codigo += "Heap[h] = 2;\n";
            codigo += "h = h + 1;\n";
            codigo += "Heap[h] = " + op1 + ";\n";
            codigo += "h = h + 1;\n";
            codigo += "Heap[h] = " + op2 + ";\n";
            codigo += "h = h + 1;\n";
            tabla.agregarNoUsados(apunChar);
        } else if (tipo1[0] == "char" && tipo2[0] == "string") {
            let apunChar = tabla.getTemporal();
            codigo += apunChar + " = h + 0;\n";
            codigo += "Heap[h] = 1;\n";
            codigo += "h = h + 1;\n";
            codigo += "Heap[h] = " + op1 + ";\n";
            codigo += "h = h + 1;\n";
            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + apunChar + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + op2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        } else if (tipo1[0] == "string" && tipo2[0] == "char") {
            let apunChar = tabla.getTemporal();
            codigo += apunChar + " = h + 0;\n";
            codigo += "Heap[h] = 1;\n";
            codigo += "h = h + 1;\n";
            codigo += "Heap[h] = " + op2 + ";\n";
            codigo += "h = h + 1;\n";
            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + op1 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + apunChar + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        } else if (tipo1[0] == "string" && tipo2[0] == "double") {
            codigo += "# Inicio Traduccion llamada a double a string fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op2 + ";\n";
            codigo += "call doubleastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada adouble a string\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + op1 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + tempR2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        } else if (tipo1[0] == "double" && tipo2[0] == "string") {
            codigo += "# Inicio Traduccion llamada a double a string fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar1 = tabla.getTemporal();
            let tempR = tabla.getTemporal();
            let tempR2 = tabla.getTemporal();
            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar1 + " = p + 1;\n";
            codigo += "Stack[" + tempPar1 + "] = " + op1 + ";\n";
            codigo += "call doubleastring_15;\n";
            codigo += tempR + " = p + 0;\n";
            codigo += tempR2 + " = Stack[" + tempR + "];\n";
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada adouble a string\n";

            codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
            let tempPar3 = tabla.getTemporal();
            let tempPar4 = tabla.getTemporal();
            let tempR3 = tabla.getTemporal();
            let tempR4 = tabla.getTemporal();

            codigo += "p = p + " + tabla.stack + ";\n";
            codigo += tempPar3 + " = p + 1;\n";
            codigo += "Stack[" + tempPar3 + "] = " + tempR2 + ";\n";
            codigo += tempPar4 + " = p + 2;\n";
            codigo += "Stack[" + tempPar4 + "] = " + op2 + ";\n";
            codigo += "call concatenar_15;\n";
            codigo += tempR3 + " = p + 0;\n";
            codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
            tabla.agregarNoUsados(tempR4);
            codigo += "p = p - " + tabla.stack + ";\n";
            codigo += "# Fin Traduccion llamada a concatenar_15 \n";
        }

        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DResta(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        codigo += tempR + " = " + op1 + " - " + op2 + ";\n"
        tabla.agregarNoUsados(tempR);
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DMultiplicacion(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        codigo += tempR + " = " + op1 + " * " + op2 + ";\n"

        tabla.agregarNoUsados(tempR);
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DDivision(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etq = tabla.getEtiqueta();
        let etq2 = tabla.getEtiqueta();
        codigo += "if (" + op2 + " == 0) goto " + etq + ";\n";
        codigo += tempR + " = " + op1 + " / " + op2 + ";\n"
        codigo += "goto " + etq2 + ";\n";
        codigo += etq + ":\n"
        codigo += "e = 1;\n";
        codigo += etq2 + ":\n"

        tabla.agregarNoUsados(tempR);
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DModulo(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        codigo += tempR + " = " + op1 + " % " + op2 + ";\n"

        tabla.agregarNoUsados(tempR);
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DPotencia(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let t1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(t1);
        codigo += this.operando2.get3D(tabla);
        let t2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(t2);

        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        let etqC = tabla.getEtiqueta();

        let tempR = tabla.getTemporal();

        codigo += tempR + " = 1;\n";
        codigo += etqC + ":\n";
        codigo += "if ( " + t2 + " > 0 ) goto " + etqV + ";\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n";
        codigo += tempR + " = " + tempR + " * " + t1 + ";\n";
        codigo += t2 + " = " + t2 + " - 1;\n";
        codigo += "goto " + etqC + ";\n";
        codigo += etqF + ":\n";

        tabla.quitarNoUsados(t1);
        tabla.quitarNoUsados(t2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DMenorQue(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " < " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DMayorQue(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " > " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DMenorIgual(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " <= " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DMayorIgual(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " >= " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DDiferente(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " <> " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DIgualIgual(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();
        codigo += "if (" + op1 + " == " + op2 + ") goto " + etqV + ";\n";
        codigo += tempR + " = 0;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n"
        codigo += tempR + " = 1;\n";
        codigo += etqF + ":\n"
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        tabla.agregarNoUsados(tempR);
        return codigo;
    }
    get3DAnd(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        let etqV1 = tabla.getEtiqueta();
        let etqF1 = tabla.getEtiqueta();
        let tempR = tabla.getTemporal();
        codigo += tempR + " = 0;\n";
        tabla.agregarNoUsados(tempR);
        codigo += "if (" + op1 + " == 1) goto " + etqV1 + ";\n";
        codigo += "goto " + etqF1 + ";\n";
        tabla.quitarNoUsados(op1);
        codigo += etqV1 + ":\n";

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);
        let etqV2 = tabla.getEtiqueta();
        let etqF2 = tabla.getEtiqueta();
        codigo += "if (" + op2 + " == 1) goto " + etqV2 + ";\n";
        codigo += "goto " + etqF2 + ";\n";
        tabla.quitarNoUsados(op2);

        codigo += etqV2 + ":\n";
        codigo += tempR + " = 1;\n";
        codigo += etqF1 + ":\n";
        codigo += etqF2 + ":\n";
        let tempU = tabla.getTemporal();
        codigo += tempU + " = " + tempR + ";\n";
        tabla.quitarNoUsados(tempR);
        tabla.agregarNoUsados(tempU);
        return codigo;
    }
    get3DOr(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);

        let etqV1 = tabla.getEtiqueta();
        let etqF1 = tabla.getEtiqueta();
        let tempR = tabla.getTemporal();
        codigo += tempR + " = 0;\n";
        tabla.agregarNoUsados(tempR);
        codigo += "if (" + op1 + " == 1) goto " + etqV1 + ";\n";
        codigo += "goto " + etqF1 + ";\n";
        tabla.quitarNoUsados(op1);
        codigo += etqF1 + ":\n";

        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);
        let etqV2 = tabla.getEtiqueta();
        let etqF2 = tabla.getEtiqueta();
        codigo += "if (" + op2 + " == 1) goto " + etqV2 + ";\n";
        codigo += "goto " + etqF2 + ";\n";
        tabla.quitarNoUsados(op2);
        codigo += etqV1 + ":\n";
        codigo += etqV2 + ":\n";
        codigo += tempR + " = 1;\n";

        codigo += etqF2 + ":\n";
        let tempU = tabla.getTemporal();
        codigo += tempU + " = " + tempR + ";\n";
        tabla.quitarNoUsados(tempR);
        tabla.agregarNoUsados(tempU);
        return codigo;
    }
    get3DXor(tabla) {
        let codigo = "";
        codigo += this.operando1.get3D(tabla);
        let op1 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op1);
        codigo += this.operando2.get3D(tabla);
        let op2 = tabla.getTemporalActual();
        tabla.agregarNoUsados(op2);

        let tempR = tabla.getTemporal();
        let etq1 = tabla.getEtiqueta();
        let etq2 = tabla.getEtiqueta();
        let etq3 = tabla.getEtiqueta();
        let etq4 = tabla.getEtiqueta();
        let etq5 = tabla.getEtiqueta();
        let etq6 = tabla.getEtiqueta();
        codigo += tempR + " = 0;\n";

        codigo += "if (" + op1 + " == 1) goto " + etq1 + ";\n";
        codigo += "goto " + etq2 + ";\n";
        codigo += etq1 + ":\n";
        codigo += "if (" + op2 + " == 0) goto " + etq3 + ";\n";
        codigo += "goto " + etq4 + ";\n";
        codigo += etq2 + ":\n";
        codigo += "if (" + op2 + " == 1) goto " + etq5 + ";\n";
        codigo += "goto " + etq6 + ";\n";
        codigo += etq3 + ":\n";
        codigo += etq5 + ":\n";
        codigo += tempR + " = 1;\n";
        codigo += etq4 + ":\n";
        codigo += etq6 + ":\n";

        tabla.agregarNoUsados(tempR);
        tabla.quitarNoUsados(op1);
        tabla.quitarNoUsados(op2);
        return codigo;
    }
    get3DNot(tabla) {
        let codigo = "";
        codigo += this.operandoU.get3D(tabla);
        let temp = tabla.getTemporalActual();
        tabla.agregarNoUsados(temp);
        let tempR = tabla.getTemporal();
        let etqV = tabla.getEtiqueta();
        let etqF = tabla.getEtiqueta();

        codigo += "if (" + temp + " == 1) goto " + etqV + ";\n";
        codigo += tempR + " = 1;\n";
        codigo += "goto " + etqF + ";\n";
        codigo += etqV + ":\n";
        codigo += tempR + " = 0;\n";
        codigo += etqF + ":\n";
        tabla.quitarNoUsados(temp);
        tabla.agregarNoUsados(tempR);

        return codigo;
    }
    get3DMenosUnario(tabla) {
        let codigo = "";
        codigo += this.operandoU.get3D(tabla);
        let temp = tabla.getTemporalActual();
        tabla.agregarNoUsados(temp);

        let tempR = tabla.getTemporal();
        codigo += tempR + " = " + temp + " * -1;\n";
        tabla.quitarNoUsados(temp);
        tabla.agregarNoUsados(tempR);

        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(\"Operacion: " + this.operador + "\")\n";

        if (this.operandoU != null) {
            let nodoUni = this.operandoU.generarCuerpo(numero);
            cuerpo += nodoUni.cuerpo;
            numero = nodoUni.numero;
            cuerpo += nodo + " --> " + nodoUni.nombre + "\n";;
        } else {
            let nodoOp1 = this.operando1.generarCuerpo(numero);
            cuerpo += nodoOp1.cuerpo;
            numero = nodoOp1.numero;
            cuerpo += nodo + " --> " + nodoOp1.nombre + "\n";
            let nodoOp2 = this.operando2.generarCuerpo(numero);
            cuerpo += nodoOp2.cuerpo;
            numero = nodoOp2.numero;
            cuerpo += nodo + " --> " + nodoOp2.nombre + "\n";;
        }
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}

exports.OperacionAlto = OperacionAlto;