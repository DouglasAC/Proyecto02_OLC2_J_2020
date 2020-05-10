class AsignacionAccesos {
    constructor(nombre, accesos, expresion, fila, columna) {
        this.nombre = nombre;
        this.accessos = accesos;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    analizar(tabla) {
        let ide = new IdentificadorAlto(this.nombre, this.fila, this.columna);
        let tipo = ide.analizar(tabla);
        console.log(tipo);
        if (tipo instanceof ErrorAlto) {
            return tipo;
        }
        for (let x = 0; x < this.accessos.length; x++) {
            let acceso = this.accessos[x];
            if (acceso.tipo == "arreglo") {
                if (tipo[0] == "Tarry") {
                    tipo = [tipo[1]];
                } else {
                    let err = new ErrorAlto("Semantico", "No es un arreglo por lo tanto no se puede acceder", acceso.fila, acceso.columna);
                    tabla.errores.push(err);
                    return err;
                }
                let tipoPos = acceso.posicion.analizar(tabla);
                if (tipoPos instanceof ErrorAlto) {
                    return tipoPos;
                }
                if (!(tipoPos[0] == "int" || tipoPos[0] == "char")) {
                    let err = new ErrorAlto("Semantico", "La posicion que se desea acceder debe tipo Integer, se encontro " + tipoPos[0], acceso.fila, acceso.columna);
                    tabla.errores.push(err);
                    return err;
                }
            } else if (acceso.tipo == "atributo") {
                if (acceso.nombre == "length" && tipo[0] == "Tarry") {
                    tipo = ["int"];
                } else {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    let estru = tabla.getEstructura(tipo[0]);
                    if (!estru.entorno.existe(acceso.nombre)) {
                        let err = new ErrorAlto("Semantico", "El atributo " + acceso.nombre + " no existe en la estructura " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    let at = estru.entorno.getSimbolo(acceso.nombre);
                    tipo = at.tipo;
                }
            } else if (acceso.tipo == "funcion") {
                if (acceso.nombre == "tochararray") {
                    if (tipo[0] == "string") {
                        tipo = ["Tarry", "char"];
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toCharArray solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "length") {
                    if (tipo[0] == "string") {
                        tipo = ["int"];
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion length solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "touppercase") {
                    if (tipo[0] == "string") {
                        tipo = ["string"];
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toUpperCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "tolowercase") {
                    if (tipo[0] == "string") {
                        tipo = ["string"];
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toLowerCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "charat") {
                    if (tipo[0] == "string") {
                        tipo = ["char"];
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toLowerCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    let tipoPos = acceso.parametros[0].analizar(tabla);
                    if (!(tipoPos[0] == "int" || tipoPos[0] == "char")) {
                        let err = new ErrorAlto("Semantico", "La posicion que se desea acceder debe tipo Integer, se encontro " + tipoPos[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "linealize") {
                    if (tipo[0] == "Tarry") {
                        tipo = tipo;
                    } else {
                        let err = new ErrorAlto("Semantico", "La funcion linealize solo es para arreglos, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "size") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, this.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    tipo = ["int"];
                } else if (acceso.nombre == "getreference") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, this.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    tipo = ["int"];
                } else if (acceso.nombre == "instanceof") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, this.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    if (!tabla.existeEstructura(acceso.parametros[0].nombre)) {
                        let err = new ErrorAlto("Semantico", "La estructura, no existe " + acceso.parametros[0].nombre, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    tipo = ["boolean"];
                }
            }
        }


        let val = this.expresion.analizar(tabla);
        if (val instanceof ErrorAlto) {
            return val;
        }

        if (tipo[0] != val[0]) {
            if (!((tipo[0] == "int" && val[0] == "char") || (tipo[0] == "double" && val[0] == "int") || (tipo[0] == "double" && val[0] == "char") || (tabla.existeEstructura(tipo[0]) && val[0] == "null") || (tipo[0] == "Tarry" && val[0] == "null"))) {
                let erro = new ErrorAlto("Semantico", "El tipo es " + tipo[0] + " no es igual al valor a asignar de tipo" + val[0], this.fila, this.columna);
                tabla.agregarError(erro);
                return erro;
            }
        } else {
            if (tipo[0] == "Tarry" && val[0] == "Tarry") {
                if (tipo[1] != val[0]) {
                    let erro = new ErrorAlto("Semantico", "Se intenta asignar un arreglo de tipo " + val[1] + " en un arreglo de tipo " + tipo[1], this.fila, this.columna);
                    tabla.agregarError(erro);
                    return erro;
                }
            }
        }
    }
    get3D(tabla) {
        let codigo = "# Inicio Traduccion Asignacion con Accesos fila: " + this.fila + " columna: " + this.columna + "\n";
        let ide = new IdentificadorAlto(this.nombre, this.fila, this.columna);
        let tipo = ide.analizar(tabla);
        codigo += ide.get3D(tabla);
        let temp = tabla.getTemporalActual();

        for (let x = 0; x < this.accessos.length - 1; x++) {
            let acceso = this.accessos[x];
            if (acceso.tipo == "arreglo") {
                if (tipo[0] == "Tarry") {
                    codigo += "# Inicio Traduccion Acceso arreglo fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                    tipo = [tipo[1]];
                    let tempTam = tabla.getTemporal();
                    let tempPosReal = tabla.getTemporal();
                    let tempValor = tabla.getTemporal();
                    let etq = tabla.getEtiqueta();// exepcion error null pointer 
                    let etq1 = tabla.getEtiqueta();// exepcion error index out of bound
                    let etq2 = tabla.getEtiqueta();// no exepcion 
                    codigo += acceso.posicion.get3D(tabla);
                    let tempPos = tabla.getTemporalActual();
                    codigo += "if (" + temp + " == -1) goto " + etq + ";\n";/// null pointe exception verificar antes de acceder
                    codigo += tempTam + " = Heap[" + temp + "];\n";
                    codigo += "if (" + tempPos + " < 0) goto " + etq1 + ";\n";
                    codigo += "if (" + tempPos + " >= " + tempTam + ") goto " + etq1 + ";\n";
                    codigo += tempPos + " = " + tempPos + " + 1;\n";
                    codigo += tempPosReal + " = " + temp + " + " + tempPos + ";\n";
                    codigo += tempValor + " = Heap[" + tempPosReal + "];\n";
                    tabla.quitarNoUsados(temp);
                    temp = tempValor;
                    tabla.agregarNoUsados(temp);
                    codigo += "goto " + etq2 + ";\n";
                    codigo += etq + ":\n";
                    codigo += "e = 4;\n";
                    codigo += "goto " + etq1 + ";\n";
                    codigo += etq1 + ":\n";
                    codigo += "e = 2;\n";
                    codigo += etq2 + ":\n";
                    codigo += "# Fin Acceso Arreglo\n";
                } else {
                    let err = new ErrorAlto("Semantico", "No es un arreglo por lo tanto no se puede acceder", acceso.fila, this.columna);
                    tabla.errores.push(err);
                    return err;
                }
            } else if (acceso.tipo == "atributo") {
                if (acceso.nombre == "length" && tipo[0] == "Tarry") {
                    codigo += "# Inicio Traduccion Atributo lenght fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                    tipo = ["int"];
                    let tempPar1 = tabla.getTemporal();
                    let tempR = tabla.getTemporal();
                    let tempR2 = tabla.getTemporal();
                    codigo += "p = p + " + tabla.stack + ";\n";
                    codigo += tempPar1 + " = p + 1;\n"
                    codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                    codigo += "call length_15;\n"
                    codigo += tempR + " = p + 0;\n";
                    codigo += tempR2 + " = Stack[" + tempR + "];\n";
                    tabla.quitarNoUsados(temp);
                    temp = tempR2;
                    tabla.agregarNoUsados(temp);
                    codigo += "p = p - " + tabla.stack + ";\n";
                    codigo += "# Fin Traduccion Atributo lenght \n";
                } else {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    let estru = tabla.getEstructura(tipo[0]);
                    if (!estru.entorno.existe(acceso.nombre)) {
                        let err = new ErrorAlto("Semantico", "El atributo " + acceso.nombre + " no existe en la estructura " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    let at = estru.entorno.getSimbolo(acceso.nombre);
                    tipo = at.tipo;

                    let tempPosReal = tabla.getTemporal();
                    let tempValor = tabla.getTemporal();
                    let etq = tabla.getEtiqueta();// exepcion error null pointer 
                    let etq2 = tabla.getEtiqueta();// no exepcion 
                    codigo += "# Inicio traduccion Acceso Estructura fila: " + acceso.fila + " columna: " + acceso.columna + "\n";

                    /// null pointe exception verificar antes de acceder
                    codigo += "if (" + temp + " == -1) goto " + etq + ";\n";
                    codigo += tempPosReal + " = " + temp + " + " + at.apuntador + ";\n";
                    codigo += tempValor + " = Heap[" + tempPosReal + "];\n";
                    tabla.agregarNoUsados(tempValor);
                    tabla.quitarNoUsados(temp);
                    temp = tempValor;
                    codigo += "goto " + etq2 + ";\n";
                    codigo += etq + ":\n";
                    codigo += "e = 4;\n";
                    codigo += etq2 + ":\n";
                    codigo += "# Fin traduccion Acceso Estructura\n";
                }
            } else if (acceso.tipo == "funcion") {
                if (acceso.nombre == "tochararray") {
                    if (tipo == "string") {
                        tipo = ["Tarry", "char"];
                        let tempPar1 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();
                        codigo += "# Inicio Traduccion llamada a tocharArray fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += "call toCharArray_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada a tocharArray\n";
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toCharArray solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "length") {
                    if (tipo[0] == "string") {
                        tipo = ["int"];
                        let tempPar1 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();
                        codigo += "# Inicio Traduccion llamada a length fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += "call length_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada Lenght \n";
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion length solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "touppercase") {
                    if (tipo[0] == "string") {
                        tipo = ["string"];
                        let tempPar1 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();
                        codigo += "# Inicio Traduccion llamada a toUpperCase fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += "call toUpperCase_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada a toUpperCase\n";
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toUpperCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "tolowercase") {
                    if (tipo[0] == "string") {
                        tipo = ["string"];
                        let tempPar1 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();
                        codigo += "# Inicio Traduccion llamada a toLowerCase fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += "call toLowerrCase_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada a toLowerCase\n";
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toLowerCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "charat") {
                    if (tipo[0] == "string") {
                        tipo = ["char"];
                        codigo += "# Inicio Traduccion llamada a charAt fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += acceso.parametros[0].get3D(tabla);
                        let tempPos = tabla.getTemporalActual();
                        tabla.quitarNoUsados(tempPos);
                        let tempPar1 = tabla.getTemporal();
                        let tempPar2 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();

                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += tempPar2 + " = p + 2;\n"
                        codigo += "Stack[" + tempPar2 + "] = " + tempPos + ";\n"
                        codigo += "call charAt_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada a charAt\n";
                    } else {
                        let err = ErrorAlto("Semantico", "La funcion toLowerCase solo es para Strings, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }

                } else if (acceso.nombre == "linealize") {
                    if (tipo[0] == "Tarry") {
                        tipo = tipo;
                        let tempPar1 = tabla.getTemporal();
                        let tempR = tabla.getTemporal();
                        let tempR2 = tabla.getTemporal();
                        codigo += "# Inicio Traduccion llamada a linealize fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                        codigo += "p = p + " + tabla.stack + ";\n";
                        codigo += tempPar1 + " = p + 1;\n"
                        codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                        codigo += "call toCharArray_15;\n"
                        codigo += tempR + " = p + 0;\n";
                        codigo += tempR2 + " = Stack[" + tempR + "];\n";
                        tabla.quitarNoUsados(temp);
                        temp = tempR2;
                        tabla.agregarNoUsados(temp);
                        codigo += "p = p - " + tabla.stack + ";\n";
                        codigo += "# Fin Traduccion llamada a linealize\n";
                    } else {
                        let err = new ErrorAlto("Semantico", "La funcion linealize solo es para arreglos, se encontro tipo " + tipo, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                } else if (acceso.nombre == "size") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    tipo = ["int"];
                    let tempPar1 = tabla.getTemporal();
                    let tempR = tabla.getTemporal();
                    let tempR2 = tabla.getTemporal();
                    codigo += "# Inicio Traduccion llamada a size fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                    codigo += "p = p + " + tabla.stack + ";\n";
                    codigo += tempPar1 + " = p + 1;\n"
                    codigo += "Stack[" + tempPar1 + "] = " + temp + ";\n"
                    codigo += "call length_15;\n"
                    codigo += tempR + " = p + 0;\n";
                    codigo += tempR2 + " = Stack[" + tempR + "];\n";
                    tabla.quitarNoUsados(temp);
                    temp = tempR2;
                    tabla.agregarNoUsados(temp);
                    codigo += "p = p - " + tabla.stack + ";\n";
                    codigo += "# Fin Traduccion llamada a size\n";
                } else if (acceso.nombre == "getreference") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    tipo = ["int"];

                } else if (acceso.nombre == "instanceof") {
                    if (!tabla.existeEstructura(tipo[0])) {
                        let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    if (!tabla.existeEstructura(acceso.parametros[0].nombre)) {
                        let err = new ErrorAlto("Semantico", "La estructura, no existe " + acceso.parametros[0].nombre, acceso.fila, acceso.columna);
                        tabla.errores.push(err);
                        return err;
                    }
                    codigo += "# Inicio traduccion llamada a instanceof fila: " + acceso.fila + " columna: " + acceso.columna + "\n";
                    let tempIgual = tabla.getTemporal();
                    if (tipo[0] == acceso.parametros[0].nombre) {
                        codigo += tempIgual + " = 1;\n"
                    } else {
                        codigo += tempIgual + " = 0;\n"
                    }
                    tabla.quitarNoUsados(temp);
                    temp = tempIgual;
                    tabla.agregarNoUsados(temp);
                    tipo = ["boolean"];
                    codigo += "# Fin Traduccion llamada a instanceof\n";
                }
            }
        }

        let val_cod = this.expresion.get3D(tabla);
        if (val_cod instanceof ErrorAlto) {
            return val_cod;
        }
        else {
            codigo += val_cod;
        }

        let tempVal = tabla.getTemporalActual();
        tabla.agregarNoUsados(tempVal);

        let ultimo = this.accessos[this.accessos.length - 1];
        if (ultimo.tipo == "arreglo") {
            codigo += "# Inicio Traduccion Asignacion arreglo fila: " + ultimo.fila + " columna: " + ultimo.columna + "\n";
            tipo = [tipo[1]];
            let tempTam = tabla.getTemporal();
            let tempPosReal = tabla.getTemporal();
            let etq = tabla.getEtiqueta();// exepcion error null pointer 
            let etq1 = tabla.getEtiqueta();// exepcion error index out of bound
            let etq2 = tabla.getEtiqueta();// no exepcion 
            codigo += ultimo.posicion.get3D(tabla);
            let tempPos = tabla.getTemporalActual();
            codigo += "if (" + temp + " == -1) goto " + etq + ";\n";/// null pointe exception verificar antes de acceder
            codigo += tempTam + " = Heap[" + temp + "];\n";
            codigo += "if (" + tempPos + " < 0) goto " + etq1 + ";\n";
            codigo += "if (" + tempPos + " >= " + tempTam + ") goto " + etq1 + ";\n";
            codigo += tempPos + " = " + tempPos + " + 1;\n";
            codigo += tempPosReal + " = " + temp + " + " + tempPos + ";\n";
            codigo += "Heap[" + tempPosReal + "] = " + tempVal + ";\n";

            codigo += "goto " + etq2 + ";\n";
            codigo += etq + ":\n";
            codigo += "e = 4;\n";
            codigo += "goto " + etq1 + ";\n";
            codigo += etq1 + ":\n";
            codigo += "e = 2;\n";
            codigo += etq2 + ":\n";
            codigo += "# Fin Asignacion Arreglo\n";
        } else if (ultimo.tipo == "atributo") {
            if (!tabla.existeEstructura(tipo[0])) {
                let err = new ErrorAlto("Semantico", "La variable no es una estructura, es de tipo " + tipo[0], ultimo.fila, ultimo.columna);
                tabla.errores.push(err);
                return err;
            }
            let estru = tabla.getEstructura(tipo[0]);
            if (!estru.entorno.existe(ultimo.nombre)) {
                let err = new ErrorAlto("Semantico", "El atributo " + ultimo.nombre + " no existe en la estructura " + tipo[0], ultimo.fila, ultimo.columna);
                tabla.errores.push(err);
                return err;
            }
            let at = estru.entorno.getSimbolo(ultimo.nombre);
            tipo = at.tipo;

            let tempPosReal = tabla.getTemporal();

            let etq = tabla.getEtiqueta();// exepcion error null pointer 
            let etq2 = tabla.getEtiqueta();// no exepcion 
            codigo += "# Inicio Traduccion Asignacion Estructura fila: " + ultimo.fila + " columna: " + ultimo.columna + "\n";

            /// null pointe exception verificar antes de acceder
            codigo += "if (" + temp + " == -1) goto " + etq + ";\n";
            codigo += tempPosReal + " = " + temp + " + " + at.apuntador + ";\n";
            codigo += "Heap[" + tempPosReal + "] = " + tempVal + ";\n";

            codigo += "goto " + etq2 + ";\n";
            codigo += etq + ":\n";
            codigo += "e = 4;\n";
            codigo += etq2 + ":\n";
            codigo += "# Fin Traduccion Asignacion Estructura\n";
        }

        tabla.quitarNoUsados(temp);
        tabla.quitarNoUsados(tempVal);

        codigo += "# Fin Traduccion Asignacion con acceso Acceso\n";
        return codigo;
    }
    generarCuerpo(numero) {
        let nodo = "node" + numero++;
        let cuerpo = nodo + "(Asignacion con Accesos)\n";
        let nodoAccesos = "node" + numero++;
        cuerpo += nodo + "(Accesos)\n";
        cuerpo += nodo + " --> " + nodoAccesos + "\n";
        for (let x = 0; x < this.accessos.length; x++) {
            let acceso = this.accessos[x];
            let nodoAcceso = "nodo" + numero++;
            if (acceso.tipo == "arreglo") {
                cuerpo += nodoAcceso + "(Acceso Arreglo posicion:)\n";
                let nodoPos = acceso.posicion.generarCuerpo(numero);
                cuerpo += nodoPos.cuerpo;
                numero = nodoPos.numero;
                cuerpo += nodoAcceso + " --> " + nodoPos.cuerpo + "\n";
            } else if (acceso.tipo == "atributo") {
                cuerpo += nodoAcceso + "(Acceso Atributo: " + acceso.nombre + ")\n";
            } else if (acceso.tipo == "funcion") {
                cuerpo += nodoAcceso + "(Acceso Funcion: " + acceso.nombre + ")\n";
            }
        }

        let valorNodo = this.valor.generarDot(numero);
        cuerpo += valorNodo.cuerpo;
        cuerpo += nodo + " --> " + valorNodo.nombre + ";\n";
        numero = valorNodo.numero;
        let nuevo = new NodoDot(nodo, cuerpo, numero + 1);
        return nuevo;
    }
}
exports.AsignacionAccesos = AsignacionAccesos;