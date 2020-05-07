function TraducurAlto() {
    if (!editor.getValue()) {
        alert("NO HAY NADA PARA TRADUCIR");
        return;
    }
    var result = GramaticaAlto.parse(editor.getValue());
    editor3D.setValue("");
    var indexInstruccion = 0;
    this.tablaAlto = new TablaAlto(null);

    console.log(result);
    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        result.instrucciones[indexInstruccion].analizar(this.tablaAlto);
    }

    if (this.tablaAlto.errores.length == 0) {
        let codigo = "";


        let etq = tablaAlto.getEtiqueta();
        codigo += etq + ":\n";
        for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
            let trad = result.instrucciones[indexInstruccion].get3D(this.tablaAlto);
            if (!(trad instanceof ErrorAlto)) {
                codigo += trad;
            }

        }

        let funcionesPrimitivas = "";

        funcionesPrimitivas += generarToCharArray(tablaAlto);
        funcionesPrimitivas += generarLength(tablaAlto);
        funcionesPrimitivas += generarToUpperCase(tablaAlto);
        funcionesPrimitivas += generarToLowerrCase(tablaAlto);
        funcionesPrimitivas += generarCharAt(tablaAlto);
        funcionesPrimitivas += GenerarConcatenacion(tablaAlto);
        funcionesPrimitivas += GenerarDeBooleanAString(tablaAlto);
        funcionesPrimitivas += GenerarDeEnteroAString(tablaAlto);
        funcionesPrimitivas += GenearrDeDoubleAString(tablaAlto);

        let enc = "# Declaracion de temporales, punteros p & h y estructuras heap & stack\n";
        enc += "var ";
        console.log(this.tablaAlto)
        for (let x = 0; x < tablaAlto.indiceTemporal; x++) {
            if (x != 0) {
                enc += ", ";
            }
            enc += "t" + x;
        }
        enc += ";\n";

        enc += "var p, h;\n";
        enc += "var Heap[];\n";
        enc += "var Stack[];\n";
        for (let x = 0; x < tablaAlto.heap; x++) {
            enc += "Heap[" + x + "] = 0;\n";
        }
        enc += "h = " + tablaAlto.heap + ";\n";
        enc += "goto " + etq + ";\n";
        enc += "# Inicio Estructuras\n"
        for (let x = 0; x < tablaAlto.codigoEstructuras.length; x++) {
            enc += tablaAlto.codigoEstructuras[x];
        }
        enc += "# Fin Estructuras\n"

        enc += "# Inicio Funciones Primitivas\n"

        enc += funcionesPrimitivas;

        enc += "# Fin Funciones Primitivas\n"

        
        codigo = enc + codigo;

        editor3D.setValue(editor3D.getValue() + codigo);

        if (this.tablaAlto.errores.length != 0) {
            alert("hay erres");
            console.log(this.tablaAlto.errores);
            editor3D.setValue("");
        }

    } else {
        alert("hay erres");
        console.log(this.tablaAlto.errores);
    }

}

var tablaAlto = null;


