function ObtimizarBloques() {
    let number = tabActivaBajo.split(' ');
    let entrada = ace.edit(`editorBajo${number[1]}`).getValue();
    if (entrada == "") {
        alert("No hay entrada para Optimizar");
        return;
    }
    var result = GramaticaOp.parse(entrada);
    
    let bloques = [];
    GenerarBloques(result.instrucciones, bloques);

    GenerarDiagrama(bloques);

    let reporte = [];
    bloquesRegla20(result.instrucciones, reporte);
    ReporteOptimizacion(reporte);
    let codigo = "";
    for (let x = 0; x < result.instrucciones.length; x++) {
        codigo += result.instrucciones[x].getCodigo();
    }

    crearTabBajo();
    number = tabActivaBajo.split(' ');
    ace.edit(`editorBajo${number[1]}`).setValue(codigo);
}

function GenerarBloques(instrucciones, bloques) {
    let insBloque = [];
    
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoCondicionalOp || instruccion instanceof SaltoIncondicionalOp) {
            insBloque.push(instruccion);
            let nuevo = new NodoBloque(insBloque);
            bloques.push(nuevo);
            insBloque = [];
        } else if (instruccion instanceof EtiquetaOp) {
            if (insBloque.length != 0) {
                let nuevo = new NodoBloque(insBloque);
                bloques.push(nuevo);
            }
            insBloque = [];
            insBloque.push(instruccion);
        } else {
            insBloque.push(instruccion);
        }
    }
    if (insBloque.length != 0) {
        let nuevo = new NodoBloque(insBloque);
        bloques.push(nuevo);
    }
}

function GenerarDiagrama(bloques) {
    let cuerpo = "graph TD\n";
    let anterior = "";
    for (let x = 0; x < bloques.length; x++) {
        let bloque = bloques[x];
        let instruccion = bloque.instrucciones[0];
        let nombre = "";
        if (instruccion instanceof EtiquetaOp) {
            nombre = "node" + instruccion.etiqueta;
        } else {
            nombre = "node" + (x + 1);
        }
        let dentro = "";
       
        for (let y = 0; y < bloque.instrucciones.length; y++) {
            let a = "";
            dentro += bloque.instrucciones[y].getExpresion()+ "<br>";
        }
        
        cuerpo += `${nombre}(\"${dentro}\")\n`;
        if (anterior != "") {
            cuerpo += `${anterior} --> ${nombre}\n`;
        }
        if (bloque.instrucciones[bloque.instrucciones.length - 1] instanceof SaltoCondicionalOp
            || bloque.instrucciones[bloque.instrucciones.length - 1] instanceof SaltoIncondicionalOp
        ) {
            let ultima = bloque.instrucciones[bloque.instrucciones.length - 1];
            cuerpo += `${nombre} --> node${ultima.etiqueta}\n`;
        }
        anterior = nombre;
    }


    mermaid.render('GraphBlo', cuerpo, (svg) => {
        document.getElementById('divBloques').innerHTML = svg;
    });
}

function bloquesRegla20(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoIncondicionalOp) {
            let etiqueta = instruccion.etiqueta;
            let eliminar = true;
            for (let y = x + 1; y < instrucciones.length; y++) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof InicioProcOp || siguiente instanceof FinProcOp) {
                    eliminar = false;
                    break;
                } else if (siguiente instanceof EtiquetaOp) {
                    let etiqueta2 = siguiente.etiqueta;
                    if (etiqueta != etiqueta2) {
                        eliminar = false;
                    }
                    break;
                }
            }
            if (eliminar && (x + 1) < instrucciones.length) {
                let anterior = "";
                let actual = "";
                for (let y = x; y < instrucciones.length; y++) {
                    let siguiente = instrucciones[y];
                    if (siguiente instanceof InicioProcOp || siguiente instanceof FinProcOp) {
                        break;
                    } else if (siguiente instanceof EtiquetaOp) {
                        let etiqueta2 = siguiente.etiqueta;
                        if (etiqueta == etiqueta2) {
                            actual = siguiente.getExpresion();
                        }
                        break;
                    } else {
                        anterior += siguiente.getExpresion() + "<br>";
                        siguiente.avilitado = false;
                    }
                }
                let nuevo = new NodoOp(20, anterior + actual, actual, instruccion.fila);
                reporte.push(nuevo);
            }
        }
    }
}