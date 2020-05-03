function generarToCharArray(tabla) {// tambien funciona para linealize de arreglos
    let codigo = "# Inicio Funcion ToCharArray y Linealize \n"
    // 0 reorno 1 posicion en heap 
    codigo += "proc toCharArray_15 begin\n"
    codigo += "Stack[p] = -1;\n"

    let temp = tabla.getTemporal();
    codigo += temp + " = p + 1;\n";

    let temp2 = tabla.getTemporal();
    codigo += temp2 + " = Stack[" + temp + "];\n";
    let etq = tabla.getEtiqueta();
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    let temp3 = tabla.getTemporal();
    codigo += temp3 + " = Heap[" + temp2 + "];\n"

    let tempApuntador = tabla.getTemporal();
    codigo += tempApuntador + " = h + 0;\n";

    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let etqV = tabla.getEtiqueta();
    let etqF = tabla.getEtiqueta();
    codigo += temp4 + " = 0;\n";
    codigo += etqF + ":\n";
    codigo += "if (" + temp4 + " > " + temp3 + ") goto " + etqV + ";\n";
    codigo += temp5 + " = " + temp2 + " + " + temp4 + ";\n";
    let temp6 = tabla.getTemporal();
    codigo += temp6 + " = Heap[" + temp5 + "];\n";
    codigo += "Heap[h] = " + temp6 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = " + temp4 + " + 1;\n";
    codigo += "goto " + etqF + ";\n";

    codigo += etq + ":\n";
    codigo += "e = 4;\n";
    let etqFin = tabla.getEtiqueta();
    codigo += "goto " + etqFin + ";\n";
    codigo += etqV + ":\n";
    codigo += "Stack[p] = " + tempApuntador + ";\n"
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "# Fin Funcion ToCharArray\n";
    return codigo;
}

function generarLength(tabla) {// tambien sirve para el tamaño de las estructuras
    let codigo = "# Inicio Funcion Length para Arreglos y String y Size para extructuras\n"
    // 0 reorno 1 posicion en heap 
    codigo += "proc length_15 begin\n"
    codigo += "Stack[p] = -1;\n"

    let temp = tabla.getTemporal();
    codigo += temp + " = p + 1;\n";

    let temp2 = tabla.getTemporal();
    codigo += temp2 + " = Stack[" + temp + "];\n";
    let etq = tabla.getEtiqueta();
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    let temp3 = tabla.getTemporal();
    codigo += temp3 + " = Heap[" + temp2 + "];\n"

    codigo += "Stack[p] = " + temp3 + ";\n"
    let etqFin = tabla.getEtiqueta();
    codigo += "goto " + etqFin + ";\n";
    codigo += etq + ":\n";
    codigo += "e = 4;\n";
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "# Fin Funcion Length\n";
    return codigo;
}

function generarToUpperCase(tabla) {
    let codigo = "# Inicio Funcion ToUpperCase\n"
    // 0 reorno 1 posicion en heap 
    codigo += "proc toUpperCase_15 begin\n"
    codigo += "Stack[p] = -1;\n"

    let temp = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();
    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let tempApuntador = tabla.getTemporal();
    let etq = tabla.getEtiqueta();
    let etqV = tabla.getEtiqueta();
    let etqF = tabla.getEtiqueta();
    let etqFin = tabla.getEtiqueta();
    let etqAsig = tabla.getEtiqueta();
    let etqV2 = tabla.getEtiqueta();
    let etqV3 = tabla.getEtiqueta();
    let etqV4 = tabla.getEtiqueta();
    let etqV5 = tabla.getEtiqueta();
    let etqV6 = tabla.getEtiqueta();
    let etqV7 = tabla.getEtiqueta();

    codigo += temp + " = p + 1;\n";
    codigo += temp2 + " = Stack[" + temp + "];\n";
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    codigo += temp3 + " = Heap[" + temp2 + "];\n"
    codigo += tempApuntador + " = h + 0;\n";
    codigo += "Heap[" + tempApuntador + "] = " + temp3 + ";\n";
    codigo += "h = h + 1;\n";

    codigo += temp4 + " = 1;\n";
    codigo += etqF + ":\n";
    codigo += "if (" + temp4 + " > " + temp3 + ") goto " + etqV + ";\n";
    codigo += temp5 + " = " + temp2 + " + " + temp4 + ";\n";
    codigo += temp6 + " = Heap[" + temp5 + "];\n";


    codigo += "if (" + temp6 + " < 97) goto " + etqAsig + ";\n";
    codigo += "if (" + temp6 + " > 122) goto " + etqV2 + ";\n";
    codigo += temp6 + " = " + temp6 + " - 32;\n";
    codigo += "goto " + etqAsig + ";\n"

    //ñ = 241; Ñ = 209
    codigo += etqV2 + ":\n";
    codigo += "if (" + temp6 + " <> 241) goto " + etqV3 + ";\n";
    codigo += temp6 + " = 209;\n";
    codigo += "goto " + etqAsig + ";\n"
    //á = 225; Á = 193
    codigo += etqV3 + ":\n";
    codigo += "if (" + temp6 + " <> 225) goto " + etqV4 + ";\n";
    codigo += temp6 + " = 193;\n";
    codigo += "goto " + etqAsig + ";\n"
    //é = 233; É = 201
    codigo += etqV4 + ":\n";
    codigo += "if (" + temp6 + " <> 233) goto " + etqV5 + ";\n";
    codigo += temp6 + " = 201;\n";
    codigo += "goto " + etqAsig + ";\n"
    //í = 237; Í = 205
    codigo += etqV5 + ":\n";
    codigo += "if (" + temp6 + " <> 237) goto " + etqV6 + ";\n";
    codigo += temp6 + " = 205;\n";
    codigo += "goto " + etqAsig + ";\n"
    //ó = 243; Ó = 211
    codigo += etqV6 + ":\n";
    codigo += "if (" + temp6 + " <> 243) goto " + etqV7 + ";\n";
    codigo += temp6 + " = 211;\n";
    codigo += "goto " + etqAsig + ";\n"
    //ú = 250; Ú = 218
    codigo += etqV7 + ":\n";
    codigo += "if (" + temp6 + " <> 250) goto " + etqAsig + ";\n";
    codigo += temp6 + " = 218;\n";
    codigo += "goto " + etqAsig + ";\n"


    codigo += etqAsig + ":\n";
    codigo += "Heap[h] = " + temp6 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = " + temp4 + " + 1;\n";
    codigo += "goto " + etqF + ";\n";

    codigo += etq + ":\n";
    codigo += "e = 4;\n";

    codigo += "goto " + etqFin + ";\n";
    codigo += etqV + ":\n";
    codigo += "Stack[p] = " + tempApuntador + ";\n"
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "# Fin Funcion ToUpperCase\n";
    return codigo;
}


function generarToLowerrCase(tabla) {
    let codigo = "# Inicio Funcion ToLowerrCase\n"
    // 0 reorno 1 posicion en heap 
    codigo += "proc toLowerrCase_15 begin\n"
    codigo += "Stack[p] = -1;\n"

    let temp = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();
    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let tempApuntador = tabla.getTemporal();
    let etq = tabla.getEtiqueta();
    let etqV = tabla.getEtiqueta();
    let etqF = tabla.getEtiqueta();
    let etqFin = tabla.getEtiqueta();
    let etqAsig = tabla.getEtiqueta();
    let etqV2 = tabla.getEtiqueta();
    let etqV3 = tabla.getEtiqueta();
    let etqV4 = tabla.getEtiqueta();
    let etqV5 = tabla.getEtiqueta();
    let etqV6 = tabla.getEtiqueta();
    let etqV7 = tabla.getEtiqueta();

    codigo += temp + " = p + 1;\n";
    codigo += temp2 + " = Stack[" + temp + "];\n";
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    codigo += temp3 + " = Heap[" + temp2 + "];\n"
    codigo += tempApuntador + " = h + 0;\n";
    codigo += "Heap[" + tempApuntador + "] = " + temp3 + ";\n";
    codigo += "h = h + 1;\n";

    codigo += temp4 + " = 1;\n";
    codigo += etqF + ":\n";
    codigo += "if (" + temp4 + " > " + temp3 + ") goto " + etqV + ";\n";
    codigo += temp5 + " = " + temp2 + " + " + temp4 + ";\n";
    codigo += temp6 + " = Heap[" + temp5 + "];\n";


    codigo += "if (" + temp6 + " < 65) goto " + etqAsig + ";\n";
    codigo += "if (" + temp6 + " > 90) goto " + etqV2 + ";\n";
    codigo += temp6 + " = " + temp6 + " + 32;\n";
    codigo += "goto " + etqAsig + ";\n"

    //ñ = 241; Ñ = 209
    codigo += etqV2 + ":\n";
    codigo += "if (" + temp6 + " <> 209) goto " + etqV3 + ";\n";
    codigo += temp6 + " = 241;\n";
    codigo += "goto " + etqAsig + ";\n"
    //á = 225; Á = 193
    codigo += etqV3 + ":\n";
    codigo += "if (" + temp6 + " <> 193) goto " + etqV4 + ";\n";
    codigo += temp6 + " = 225;\n";
    codigo += "goto " + etqAsig + ";\n"
    //é = 233; É = 201
    codigo += etqV4 + ":\n";
    codigo += "if (" + temp6 + " <> 201) goto " + etqV5 + ";\n";
    codigo += temp6 + " = 233;\n";
    codigo += "goto " + etqAsig + ";\n"
    //í = 237; Í = 205
    codigo += etqV5 + ":\n";
    codigo += "if (" + temp6 + " <> 205) goto " + etqV6 + ";\n";
    codigo += temp6 + " = 237;\n";
    codigo += "goto " + etqAsig + ";\n"
     //ó = 243; Ó = 211
    codigo += etqV6 + ":\n";
    codigo += "if (" + temp6 + " <> 211) goto " + etqV7 + ";\n";
    codigo += temp6 + " = 243;\n";
    codigo += "goto " + etqAsig + ";\n"
    //ú = 250; Ú = 218
    codigo += etqV7 + ":\n";
    codigo += "if (" + temp6 + " <> 218) goto " + etqAsig + ";\n";
    codigo += temp6 + " = 250;\n";
    codigo += "goto " + etqAsig + ";\n"


    codigo += etqAsig + ":\n";
    codigo += "Heap[h] = " + temp6 + ";\n";
    codigo += "h = h + 1;\n";
    codigo += temp4 + " = " + temp4 + " + 1;\n";
    codigo += "goto " + etqF + ";\n";

    codigo += etq + ":\n";
    codigo += "e = 4;\n";

    codigo += "goto " + etqFin + ";\n";
    codigo += etqV + ":\n";
    codigo += "Stack[p] = " + tempApuntador + ";\n"
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "# Fin Funcion ToLowerrCase\n";
    return codigo;
}

function generarCharAt(tabla) {
    let codigo = "# Inicio Funcion CharAt\n"
    // 0 retorno 1 posicion en heap string 2 posicion  
    codigo += "proc charAt_15 begin\n"
    codigo += "Stack[p] = -1;\n"

    let temp = tabla.getTemporal();
    let temp2 = tabla.getTemporal();
    let temp3 = tabla.getTemporal();
    let temp4 = tabla.getTemporal();
    let temp5 = tabla.getTemporal();
    let temp6 = tabla.getTemporal();
    let temp7 = tabla.getTemporal();
    let etq = tabla.getEtiqueta();
    let etqFin = tabla.getEtiqueta();
    let etq2 = tabla.getEtiqueta();
    let etq3 = tabla.getEtiqueta();
    codigo += temp + " = p + 1;\n";

    codigo += temp2 + " = Stack[" + temp + "];\n";
    codigo += "if (" + temp2 + " == -1) goto " + etq + ";\n";
    codigo += temp3 + " = Heap[" + temp2 + "];\n"

    codigo += temp4 + " = p + 2;\n";
    codigo += temp5 + " = Stack[" + temp4 + "];\n";
    codigo += temp5 + " = " + temp5 + " + 1;\n";
    codigo += "if (" + temp5 + " > " + temp3 + ") goto " + etq2 + ";\n";
    codigo += "if (" + temp5 + " <= 0) goto " + etq2 + ";\n";
    codigo += temp6 + " = " + temp2 + " + " + temp5 + ";\n";
    codigo += temp7 + " = Heap[" + temp6 + "];\n"
    codigo += "Stack[p] = " + temp7 + ";\n"

    codigo += "goto " + etqFin + ";\n";
    codigo += etq + ":\n";
    codigo += "e = 4;\n";
    codigo += "goto " + etqFin + ";\n";
    codigo += etq2 + ":\n";
    codigo += "e = 2;\n";
    codigo += etqFin + ":\n";
    codigo += "end\n";
    codigo += "# Fin Funcion CharAt\n";
    return codigo;

}