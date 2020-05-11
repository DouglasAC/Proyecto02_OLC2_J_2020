function TraducurAlto() {
    let number = tabActivaAlto.split(' ');
    let entrada = ace.edit(`editor${number[1]}`).getValue();
    if (entrada=="") {
        alert("No hay entrada para traducir");
        return;
    }
    var result = GramaticaAlto.parse(entrada);
    
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

        // Traducir globales 
        let codigoGlobales = "";
        codigoGlobales += traducirGlobales(tablaAlto, result.instrucciones);
        // Traducir globales import
        for (let y = 0; y < importares.length; y++) {
            let arbolImport = importares[x];
            codigoGlobales += traducirGlobales(arbolImport.instrucciones);
        }

        // Traducir funciones y estructuras 
        codigo += traducirFuncionesyEstructuras(tablaAlto, result.instrucciones);
        // Taducir imports
        for (let y = 0; y < importares.length; y++) {
            let arbolImport = importares[x];
            codigo += traducirFuncionesyEstructuras(tablaAlto, arbolImport.instrucciones);
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
        codigo += codigoGlobales;
        if (tablaAlto.existeFuncion("principal")) {
            codigo += "call principal;"
        }

        

        if (this.tablaAlto.errores.length != 0) {
            alert("hay erres");
            console.log(this.tablaAlto.errores);
            generarReporteErrores(tablaAlto.errores);
            generarReporteTablaSimbolos(tablaAlto.simbolos);
            generarReporteAst(result, importares);
        }else{
            
            crearTabBajo();
            let number = tabActivaBajo.split(' ');
            ace.edit(`editorBajo${number[1]}`).setValue(codigo);

            generarReporteErrores(tablaAlto.errores);
            generarReporteTablaSimbolos(tablaAlto.simbolos);
            generarReporteAst(result, importares);
        }

    } else {
        alert("hay erres");
        console.log(this.tablaAlto.errores);
        generarReporteErrores(tablaAlto.errores);
        generarReporteTablaSimbolos(tablaAlto.simbolos);
        generarReporteAst(result, importares);
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
        let instruccion = instrucciones[x];
        console.log(instruccion);
        if (instruccion instanceof FuncionAlto) {
            let val = instruccion.analizar(tabla);
        }
    }
}

function obtenerGlobales(tabla, instrucciones) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof DeclaracionAlto || instruccion instanceof DeclararArregloAlto) {
            let val = instruccion.analizar(tabla);
        } else if (instruccion instanceof DeclaracionSinTipoAlto) {
            if (instruccion.tipo != "global") {
                let val = instruccion.analizar(tabla);
            }
        }
    }
}

function obtenerGlobalesDentro(tabla, instrucciones) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof DeclaracionSinTipoAlto) {
            if (instruccion.tipo == "global") {
                let val = instruccion.analizar(tabla);
            }
        } else if (instruccion instanceof FuncionAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
        } else if (instruccion instanceof SiAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
            if (instruccion.sentenciasElse != null) {
                obtenerGlobalesDentro(tabla, instruccion.sentenciasElse);
            }
        } else if (instruccion instanceof SeleccionarAlto) {
            for (let y = 0; y < instruccion.casos; y++) {
                let caso = instruccion.casos[y];
                obtenerGlobalesDentro(tabla, caso.sentencias);
            }
            if (instruccion.defecto != null) {
                obtenerGlobalesDentro(tabla, instruccion.defecto.sentencias);
            }
        } else if (instruccion instanceof TryCatchAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
            obtenerGlobalesDentro(tabla, instruccion.sentenciasCatch);
        } else if (instruccion instanceof WhileAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
        } else if (instruccion instanceof DoWhileAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
        } else if (instruccion instanceof ForAlto) {
            obtenerGlobalesDentro(tabla, instruccion.sentencias);
        }
    }
}

function traducirGlobales(tabla, instrucciones) {
    let codigo = "";
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof DeclaracionAlto || instruccion instanceof DeclararArregloAlto) {
            let val = instruccion.get3D(tabla);
            if (!(val instanceof ErrorAlto)) {
                codigo += val;
            }
        } else if (instruccion instanceof DeclaracionSinTipoAlto) {
            if (instruccion.tipo != "global") {
                let val = instruccion.get3D(tabla);
                if (!(val instanceof ErrorAlto)) {
                    codigo += val;
                }
            }
        }
    }
    return codigo;
}

function traducirFuncionesyEstructuras(tabla, instrucciones) {
    let codigo = "";
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof FuncionAlto || instruccion instanceof DefinirEstructura) {
            let val = instruccion.get3D(tabla);
            if (!(val instanceof ErrorAlto)) {
                codigo += val;
            }
        }
    }
    return codigo;
}