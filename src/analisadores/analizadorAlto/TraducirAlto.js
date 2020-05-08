function TraducurAlto() {
    if (!editor.getValue()) {
        alert("NO HAY NADA PARA TRADUCIR");
        return;
    }
    var result = GramaticaAlto.parse(editor.getValue());
    editor3D.setValue("");
    tablaAlto = new TablaAlto(null);

    console.log(result);

    // Hacer imports
    importares = [];
    for (let x = 0; x < result.instrucciones.length; x++) {
        if (result.instrucciones[x] instanceof ImportarAlto) {
            result.instrucciones[x].analizar(tablaAlto);
        }
    }

    // Obtener Estructuras
    obtenerEstructuras(tablaAlto, result.instrucciones);
    for (let x = 0; x < importares.length; x++) {
        obtenerEstructuras(tablaAlto, importares[x].instrucciones);
    }

    // Obtener Funciones
    obtenerFunciones(tablaAlto, result.instrucciones);
    for (let x = 0; x < importares.length; x++) {
        obtenerFunciones(tablaAlto, importares[x].instrucciones);
    }

    // Obtener Todas Las Globales
    obtenerGlobales(tablaAlto, result.instrucciones);
    for (let x = 0; x < importares.length; x++) {
        obtenerGlobales(tablaAlto, importares[x].instrucciones);
    }

    //Obtener Globales que estan adentro de funciones
    obtenerGlobalesDentro(tablaAlto, result.instrucciones);
    for (let x = 0; x < importares.length; x++) {
        obtenerGlobalesDentro(tablaAlto, importares[x].instrucciones);
    }

    console.log("------")
    console.log(this.tablaAlto);
    if (this.tablaAlto.errores.length == 0) {
        let codigo = "";


        let etq = tablaAlto.getEtiqueta();
        
        // Traducir 
        for (let x = 0; x < result.instrucciones.length; x++) {
            let trad = result.instrucciones[x].get3D(this.tablaAlto);
            if (!(trad instanceof ErrorAlto)) {
                codigo += trad;
            }
        }
        // Taducir imports
        for (let y = 0; y < importares.length; y++) {
            let arbolImport = importares[x];
            for (let x = 0; x < arbolImport.instrucciones.length; x++) {
                let trad = arbolImport.instrucciones[x].get3D(this.tablaAlto);
                if (!(trad instanceof ErrorAlto)) {
                    codigo += trad;
                }
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
        codigo += etq + ":\n";

        if(tablaAlto.existeFuncion("principal"))
        {
            codigo += "call principal;"
        }

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

function obtenerEstructuras(tabla, instrucciones) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instrucion = instrucciones[x];
        if (instrucion instanceof DefinirEstructura) {
            let val = instrucion.analizar(tabla);
        } else if (instrucion instanceof FuncionAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
        } else if (instrucion instanceof SiAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
            if (instrucion.sentenciasElse != null) {
                obtenerEstructuras(tabla, instrucion.sentenciasElse);
            }
        } else if (instrucion instanceof SeleccionarAlto) {
            for (let y = 0; y < instrucion.casos; y++) {
                let caso = instrucion.casos[y];
                obtenerEstructuras(tabla, caso.sentencias);
            }
            if (instrucion.defecto != null) {
                obtenerEstructuras(tabla, instrucion.defecto.sentencias);
            }
        } else if (instrucion instanceof TryCatchAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
            obtenerEstructuras(tabla, instrucion.sentenciasCatch);
        } else if (instrucion instanceof WhileAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
        } else if (instrucion instanceof DoWhileAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
        } else if (instrucion instanceof ForAlto) {
            obtenerEstructuras(tabla, instrucion.sentencias);
        }
    }
}

function obtenerFunciones(tabla, instrucciones) {
    console.log(instrucciones.length);
    for (let x = 0; x < instrucciones.length; x++) {
        let instrucion = instrucciones[x];
        console.log(instrucion);
        if (instrucion instanceof FuncionAlto) {
            let val = instrucion.analizar(tabla);
        }
    }
}

function obtenerGlobales(tabla, instrucciones) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instrucion = instrucciones[x];
        if (instrucion instanceof DeclaracionAlto) {
            let val = instrucion.analizar(tabla);
        } else if (instrucion instanceof DeclaracionSinTipoAlto) {
            if (instrucion.tipo != "global") {
                let val = instrucion.analizar(tabla);
            }
        }
    }
}

function obtenerGlobalesDentro(tabla, instrucciones) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instrucion = instrucciones[x];
        if (instrucion instanceof DeclaracionSinTipoAlto) {
            if (instrucion.tipo == "global") {
                let val = instrucion.analizar(tabla);
            }
        } else if (instrucion instanceof FuncionAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
        } else if (instrucion instanceof SiAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
            if (instrucion.sentenciasElse != null) {
                obtenerGlobalesDentro(tabla, instrucion.sentenciasElse);
            }
        } else if (instrucion instanceof SeleccionarAlto) {
            for (let y = 0; y < instrucion.casos; y++) {
                let caso = instrucion.casos[y];
                obtenerGlobalesDentro(tabla, caso.sentencias);
            }
            if (instrucion.defecto != null) {
                obtenerGlobalesDentro(tabla, instrucion.defecto.sentencias);
            }
        } else if (instrucion instanceof TryCatchAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
            obtenerGlobalesDentro(tabla, instrucion.sentenciasCatch);
        } else if (instrucion instanceof WhileAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
        } else if (instrucion instanceof DoWhileAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
        } else if (instrucion instanceof ForAlto) {
            obtenerGlobalesDentro(tabla, instrucion.sentencias);
        }
    }
}