function GenerarConcatenacion(tabla) {
    let codigo = "# Funcion concatenar dos Strings\n";
    codigo += "proc concatenar_15 begin\n"
    let temp = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();// tamaño
    let tempApuntador = tabla.getTemporal();
    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let temp7 = tabla.getTemporal();
    let temp8 = tabla.getTemporal();
    let temp9 = tabla.getTemporal();
    let temp10 = tabla.getTemporal();
    let temp11 = tabla.getTemporal();
    let temp12 = tabla.getTemporal();
    let temp13 = tabla.getTemporal();
    let etq = tabla.getEtiqueta();
    let etqV = tabla.getEtiqueta();
    let etqV2 = tabla.getEtiqueta();
    let etqV3 = tabla.getEtiqueta();
    let etqF = tabla.getEtiqueta();
    let etqF2 = tabla.getEtiqueta();
    let etqFin = tabla.getEtiqueta();


    codigo += "Stack[p] = -1;\n"
    codigo += temp + " = p + 1;\n";
    codigo += temp2 + " = Stack[" + temp + "];\n";
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    codigo += temp3 + " = Heap[" + temp2 + "];\n"
    codigo += tempApuntador + " = h + 0;\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = 1;\n";
    codigo += etqF + ":\n";
    codigo += "if (" + temp4 + " > " + temp3 + ") goto " + etqV2 + ";\n";
    codigo += temp5 + " = " + temp2 + " + " + temp4 + ";\n";
    codigo += temp6 + " = Heap[" + temp5 + "];\n";
    codigo += "Heap[h] = " + temp6 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = " + temp4 + " + 1;\n";
    codigo += "goto " + etqF + ";\n";

    codigo += etqV2 + ":\n";
    codigo += temp7 + " = p + 2;\n";
    codigo += temp8 + " = Stack[" + temp7 + "];\n";
    codigo += "if (" + temp8 + " == -1) goto " + etq + ";\n";
    codigo += temp9 + " = Heap[" + temp8 + "];\n"
    codigo += temp10 + " = 1;\n";
    codigo += etqF2 + ":\n";
    codigo += "if (" + temp10 + " > " + temp9 + ") goto " + etqV3 + ";\n";
    codigo += temp11 + " = " + temp8 + " + " + temp10 + ";\n";
    codigo += temp12 + " = Heap[" + temp11 + "];\n";
    codigo += "Heap[h] = " + temp12 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp10 + " = " + temp10 + " + 1;\n";
    codigo += "goto " + etqF2 + ";\n";
    codigo += etqV3 + ":\n";

    codigo += temp13 + " = " + temp3 + " + " + temp9 + ";\n";
    codigo += "Heap[" + tempApuntador + "] = " + temp13 + ";\n";
    codigo += "goto " + etqV + ";\n";
    codigo += etq + ":\n";
    codigo += "e = 4;\n";

    codigo += "goto " + etqFin + ";\n";
    codigo += etqV + ":\n";
    codigo += "Stack[p] = " + tempApuntador + ";\n"
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "#Fin funcion concatenar dos Strings\n";
    return codigo;
}

function GenerarDeBooleanAString(tabla) {
    let codigo = "# Incio Funcion BooleanAString\n";
    codigo += "proc booleanastring_15 begin\n";
    let temp = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let tempApuntador = tabla.getTemporal();
    let etqV = tabla.getEtiqueta();
    let etqF = tabla.getEtiqueta();
    codigo += temp + " = p + 1;\n";
    codigo += temp2 + " = Stack[" + temp + "];\n";
    codigo += tempApuntador + " = h;\n";
    codigo += "if (" + temp2 + " == 1) goto " + etqV + ";\n";
    codigo += "Heap[h] = 5;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 102;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 97;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 108;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 115;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 101;\n";
    codigo += "h = h + 1;\n";
    codigo += "goto " + etqF + ";\n"
    codigo += etqV + ":\n";
    codigo += "Heap[h] = 4;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 116;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 114;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 117;\n";
    codigo += "h = h + 1;\n";
    codigo += "Heap[h] = 101;\n";
    codigo += "h = h + 1;\n";
    codigo += etqF + ":\n"
    codigo += "Stack[p] = " + tempApuntador + ";\n";
    codigo += "end\n";
    codigo += "# Fin Funcion BooleanAString\n";
    return codigo;
}

function GenerarDeEnteroAString(tabla) {
    let codigo = "# Inicio Funcion de Entero a String\n";
    codigo += "proc enteroastring_15 begin\n";
    let temp1 = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();
    let tempTam = tabla.getTemporal();
    let tempApuntador = tabla.getTemporal();
    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let temp7 = tabla.getTemporal();
    let temp8 = tabla.getTemporal();
    let temp9 = tabla.getTemporal();
    let temp10 = tabla.getTemporal();
    let temp11 = tabla.getTemporal();
    let temp12 = tabla.getTemporal();
    let temp13 = tabla.getTemporal();
    let etq1 = tabla.getEtiqueta();
    let etq2 = tabla.getEtiqueta();
    let etq3 = tabla.getEtiqueta();

    codigo += temp1 + " = p + 1;\n"
    codigo += temp2 + " = Stack[" + temp1 + "];\n";
    codigo += tempApuntador + " = h;\n";
    codigo += temp3 + " = " + temp2 + ";\n";
    codigo += tempTam + " = 0;\n";
    codigo += "h = h + 1;\n";
    codigo += "if(" + temp2 + " > 0) goto " + etq1 + ";\n";
    codigo += temp3 + " = " + temp2 + " * -1;\n";
    codigo += "Heap[h] = 45;\n";
    codigo += "h = h + 1;\n";
    codigo += tempTam + " = 1;\n";
    codigo += etq1 + ":\n";

    codigo += temp4 + " = 0;\n";

    codigo += etq2 + ":\n";
    codigo += temp5 + " = " + temp3 + " % 10;\n";
    codigo += temp6 + " = " + temp5 + " + 48;\n";
    codigo += temp7 + " = p + " + temp4 + ";\n";
    codigo += temp8 + " = " + temp7 + "+ 2;\n";
    codigo += "Stack[" + temp8 + "] = " + temp6 + ";\n";
    codigo += temp3 + " = " + temp3 + " / 10;\n";
    codigo += temp9 + " = " + temp3 + " % 1;\n";
    codigo += temp3 + " = " + temp3 + " - " + temp9 + ";\n";
    codigo += temp4 + " = " + temp4 + " + 1;\n";
    codigo += "if (" + temp3 + " > 0) goto " + etq2 + ";\n";
    codigo += tempTam + " = " + tempTam + " + " + temp4 + ";\n";
    codigo += etq3 + ":\n";
    codigo += temp10 + " = p + " + temp4 + ";\n";
    codigo += temp11 + " = " + temp10 + " + 1;\n";
    codigo += temp12 + " = Stack[" + temp11 + "];\n";
    codigo += "Heap[h] = " + temp12 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = " + temp4 + " - 1;\n";
    codigo += "if (" + temp4 + " > 0) goto " + etq3 + ";\n";
    codigo += "Heap[" + tempApuntador + "] = " + tempTam + ";\n";
    codigo += "Stack[p] = " + tempApuntador + ";\n";
    codigo += "end\n";
    codigo += "# Fin Funcion de Entero a String\n";
    return codigo;
}

function GenearrDeDoubleAString(tabla) {
    let codigo = "# Inicio Funcion de Double a String\n";
    codigo += "proc doubleastring_15 begin\n";
    let temp1 = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();

    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let temp7 = tabla.getTemporal();

    let etq1 = tabla.getEtiqueta();
    let etq2 = tabla.getEtiqueta();


    codigo += temp1 + " = p + 1;\n"
    codigo += temp2 + " = Stack[" + temp1 + "];\n";
    codigo += temp3 + " = " + temp2 + ";\n";

    codigo += temp4 + " = " + temp3 + " % 1;\n";
    codigo += temp5 + " = " + temp3 + " - " + temp4 + ";\n"

    codigo += "# Inicio Traduccion llamada a entro a string fila: " + this.fila + " columna: " + this.columna + "\n";
    let tempPar1 = tabla.getTemporal();
    let tempR = tabla.getTemporal();
    let tempR2 = tabla.getTemporal();
    codigo += "p = p + 2;\n";
    codigo += tempPar1 + " = p + 1;\n";
    codigo += "Stack[" + tempPar1 + "] = " + temp5 + ";\n";
    codigo += "call enteroastring_15;\n";
    codigo += tempR + " = p + 0;\n";
    codigo += tempR2 + " = Stack[" + tempR + "];\n";
    codigo += "p = p - 2;\n";
    codigo += "# Fin Traduccion llamada a entero a string\n";

    codigo += temp6 + " = Heap[" + tempR2 + "];\n";
    codigo += temp6 + " = " + temp6 + " + 1;\n";
    codigo += "Heap[" + tempR2 + "] = " + temp6 + ";\n";
    codigo += "Heap[h] = 46;\n";
    codigo += "h = h + 1;\n";

    codigo += "if (" + temp4 + " > 0) goto " + etq1 + ";\n";
    codigo += temp4 + " = " + temp4 + " * -1;\n";
    codigo += etq1 + ":\n";
    codigo += etq2 + ":\n";
    codigo += temp4 + " = " + temp4 + " * 10;\n";
    codigo += temp7 + " = " + temp4 + " % 1;\n";
    codigo += "if (" + temp7 + " >  0) goto " + etq2 + ";\n";

    codigo += "# Inicio Traduccion llamada a entro a string fila: " + this.fila + " columna: " + this.columna + "\n";
    let tempPar2 = tabla.getTemporal();
    let tempR3 = tabla.getTemporal();
    let tempR4 = tabla.getTemporal();
    codigo += "p = p + 2;\n";
    codigo += tempPar2 + " = p + 1;\n";
    codigo += "Stack[" + tempPar2 + "] = " + temp4 + ";\n";
    codigo += "call enteroastring_15;\n";
    codigo += tempR3 + " = p + 0;\n";
    codigo += tempR4 + " = Stack[" + tempR3 + "];\n";
    codigo += "p = p - 2;\n";
    codigo += "# Fin Traduccion llamada a entero a string\n";

    codigo += "# Inicio Traduccion llamada a concatenar_15 fila: " + this.fila + " columna: " + this.columna + "\n";
    let tempPar3 = tabla.getTemporal();
    let tempPar4 = tabla.getTemporal();
    let tempR5 = tabla.getTemporal();
    let tempR6 = tabla.getTemporal();

    codigo += "p = p + 2;\n";
    codigo += tempPar3 + " = p + 1;\n";
    codigo += "Stack[" + tempPar3 + "] = " + tempR2 + ";\n";
    codigo += tempPar4 + " = p + 2;\n";
    codigo += "Stack[" + tempPar4 + "] = " + tempR4 + ";\n";
    codigo += "call concatenar_15;\n";
    codigo += tempR5 + " = p + 0;\n";
    codigo += tempR6 + " = Stack[" + tempR5 + "];\n";

    codigo += "p = p - 2;\n";
    codigo += "# Fin Traduccion llamada a concatenar_15 \n";

    codigo += "Stack[p] = " + tempR6 + ";\n";
    codigo += "end\n";
    codigo += "# Fin Funcion de Double a String\n";
    return codigo;
}