function OptimizarMirilla() {
    let number = tabActivaBajo.split(' ');
    let entrada = ace.edit(`editorBajo${number[1]}`).getValue();
    if (entrada == "") {
        alert("No hay entrada para Optimizar");
        return;
    }
    var result = GramaticaOp.parse(entrada);
    console.log(result);


    let reporte = [];
    mirillaRegla1(result.instrucciones, reporte);
    mirillaRegla2(result.instrucciones, reporte);
    mirillaRegla3(result.instrucciones, reporte);
    mirillaRegla4(result.instrucciones, reporte);
    mirillaRegla5(result.instrucciones, reporte);
    mirillaRegla6(result.instrucciones, reporte);
    mirillaRegla7(result.instrucciones, reporte);
    mirillaRegla8(result.instrucciones, reporte);
    mirillaRegla9(result.instrucciones, reporte);
    mirillaRegla10(result.instrucciones, reporte);
    mirillaRegla11(result.instrucciones, reporte);
    mirillaRegla12(result.instrucciones, reporte);
    mirillaRegla13(result.instrucciones, reporte);
    mirillaRegla14(result.instrucciones, reporte);
    mirillaRegla15(result.instrucciones, reporte);
    mirillaRegla16(result.instrucciones, reporte);
    mirillaRegla17(result.instrucciones, reporte);
    mirillaRegla18(result.instrucciones, reporte);

    ReporteOptimizacion(reporte);
    let codigo = "";
    for (let x = 0; x < result.instrucciones.length; x++) {
        codigo += result.instrucciones[x].getCodigo();
    }

    crearTabBajo();
    number = tabActivaBajo.split(' ');
    ace.edit(`editorBajo${number[1]}`).setValue(codigo);
}

function mirillaRegla1(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarSimpleOp) {
            let y = x + 1;
            if (y < instrucciones.length) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof AsignarSimpleOp) {
                    let temp = instruccion.temp;
                    let val = instruccion.valor;
                    let temp2 = siguiente.temp;
                    let val2 = siguiente.valor;
                    if (temp == val2 && val == temp2) {
                        let nuevo = new NodoOp(1, instruccion.getExpresion() + "<br>" + siguiente.getExpresion(), instruccion.getExpresion(), instruccion.fila);
                        reporte.push(nuevo);
                        siguiente.avilitado = false;
                    }
                }
            }
        }
    }
}

function mirillaRegla2(instrucciones, reporte) {
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
                let nuevo = new NodoOp(2, anterior + actual, actual, instruccion.fila);
                reporte.push(nuevo);
            }
        }
    }
}

function mirillaRegla3(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoCondicionalOp) {
            let y = x + 1;
            let z = x + 2;
            if (y < instrucciones.length && z < instrucciones.length) {
                let siguiente = instrucciones[y];
                let siguiente2 = instrucciones[z];
                if (siguiente instanceof SaltoIncondicionalOp && siguiente2 instanceof EtiquetaOp) {
                    let etiqueta = instruccion.etiqueta;
                    let etiqueta2 = siguiente.etiqueta;
                    let etiqueta3 = siguiente2.etiqueta;
                    if (etiqueta == etiqueta3) {
                        let tipo = instruccion.tipo;
                        if (tipo == "<") {
                            tipo = ">="
                        } else if (tipo == ">") {
                            tipo = "<="
                        } else if (tipo == "<=") {
                            tipo = ">"
                        } else if (tipo == ">") {
                            tipo = "<="
                        } else if (tipo == "==") {
                            tipo = "<>"
                        } else if (tipo == "<>") {
                            tipo = "=="
                        }
                        let anterior = instruccion.getExpresion() + "<br>" + siguiente.getExpresion() + "<br>" + siguiente2.getExpresion();
                        instruccion.tipo = tipo;
                        instruccion.etiqueta = etiqueta2;
                        siguiente.avilitado = false;
                        let actual = instruccion.getExpresion();
                        let nuevo = new NodoOp(3, anterior, actual, instruccion.fila);
                        reporte.push(nuevo);
                    }

                }
            }
        }
    }
}

function mirillaRegla4(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoCondicionalOp) {
            let y = x + 1;
            if (y < instrucciones.length) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof SaltoIncondicionalOp) {
                    let ope1 = instruccion.ope1;
                    let ope2 = instruccion.ope2;
                    let signo = instruccion.tipo;

                    if (!isNaN(ope1) && !isNaN(ope2)) {
                        let dato1 = parseFloat(ope1);
                        let dato2 = parseFloat(ope2);
                        let cambiar = false;
                        if (signo == "==") {
                            if (dato1 == dato2) {
                                cambiar = true;
                            }
                        } else if (signo == "<>") {
                            if (dato1 != dato2) {
                                cambiar = true;
                            }
                        } else if (signo == "<") {
                            if (dato1 < dato2) {
                                cambiar = true;
                            }
                        } else if (signo == ">") {
                            if (dato1 > dato2) {
                                cambiar = true;
                            }
                        } else if (signo == "<=") {
                            if (dato1 <= dato2) {
                                cambiar = true;
                            }
                        } else if (signo == ">=") {
                            if (dato1 >= dato2) {
                                cambiar = true;
                            }
                        }
                        if (cambiar) {
                            let anterior = instruccion.getExpresion() + "<br>" + siguiente.getExpresion();
                            let salto = new SaltoIncondicionalOp(instruccion.etiqueta, instruccion.fila, instruccion.columna);
                            salto.avilitado = instruccion.avilitado;
                            instrucciones[x] = salto;
                            let nueva = new NodoOp(4, anterior, salto.getExpresion(), instruccion.fila);
                            reporte.push(nueva);
                            siguiente.avilitado = false;
                        }

                    }
                }
            }
        }
    }
}

function mirillaRegla5(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoCondicionalOp) {
            let y = x + 1;
            if (y < instrucciones.length) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof SaltoIncondicionalOp) {
                    let ope1 = instruccion.ope1;
                    let ope2 = instruccion.ope2;
                    let signo = instruccion.tipo;

                    if (!isNaN(ope1) && !isNaN(ope2)) {
                        let dato1 = parseFloat(ope1);
                        let dato2 = parseFloat(ope2);
                        let cambiar = false;
                        if (signo == "==") {
                            if (!(dato1 == dato2)) {
                                cambiar = true;
                            }
                        } else if (signo == "<>") {
                            if (!(dato1 != dato2)) {
                                cambiar = true;
                            }
                        } else if (signo == "<") {
                            if (!(dato1 < dato2)) {
                                cambiar = true;
                            }
                        } else if (signo == ">") {
                            if (!(dato1 > dato2)) {
                                cambiar = true;
                            }
                        } else if (signo == "<=") {
                            if (!(dato1 <= dato2)) {
                                cambiar = true;
                            }
                        } else if (signo == ">=") {
                            if (!(dato1 >= dato2)) {
                                cambiar = true;
                            }
                        }
                        if (cambiar) {
                            let anterior = instruccion.getExpresion() + "<br>" + siguiente.getExpresion();
                            let salto = new SaltoIncondicionalOp(siguiente.etiqueta, instruccion.fila, instruccion.columna);
                            salto.avilitado = instruccion.avilitado;
                            instrucciones[x] = salto;
                            let nueva = new NodoOp(5, anterior, salto.getExpresion(), instruccion.fila);
                            reporte.push(nueva);
                            siguiente.avilitado = false;
                        }

                    }
                }
            }
        }
    }
}

function mirillaRegla6(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoIncondicionalOp) {
            let etiqueta = instruccion.etiqueta;
            for (let y = 0; y < instrucciones.length; y++) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof EtiquetaOp) {
                    let etiqueta2 = siguiente.etiqueta;
                    if (etiqueta == etiqueta2) {
                        let z = y + 1;
                        if (z < instrucciones.length) {
                            let siguiente2 = instrucciones[z];
                            if (siguiente2 instanceof SaltoIncondicionalOp) {
                                let anterior = instruccion.getExpresion() + "<br>-------<br>" + siguiente.getExpresion() + "<br>" + siguiente2.getExpresion();
                                instruccion.etiqueta = siguiente2.etiqueta;
                                let actual = instruccion.getExpresion() + "<br>-------<br>" + siguiente.getExpresion() + "<br>" + siguiente2.getExpresion();
                                let nueva = new NodoOp(6, anterior, actual, instruccion.fila);
                                reporte.push(nueva);
                            }
                        }
                    }
                }
            }
        }
    }
}

function mirillaRegla7(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof SaltoCondicionalOp) {
            let etiqueta = instruccion.etiqueta;
            for (let y = 0; y < instrucciones.length; y++) {
                let siguiente = instrucciones[y];
                if (siguiente instanceof EtiquetaOp) {
                    let etiqueta2 = siguiente.etiqueta;
                    if (etiqueta == etiqueta2) {
                        let z = y + 1;
                        if (z < instrucciones.length) {
                            let siguiente2 = instrucciones[z];
                            if (siguiente2 instanceof SaltoIncondicionalOp) {
                                let anterior = instruccion.getExpresion() + "<br>-------<br>" + siguiente.getExpresion() + "<br>" + siguiente2.getExpresion();
                                instruccion.etiqueta = siguiente2.etiqueta;
                                let actual = instruccion.getExpresion() + "<br>-------<br>" + siguiente.getExpresion() + "<br>" + siguiente2.getExpresion();
                                let nueva = new NodoOp(7, anterior, actual, instruccion.fila);
                                reporte.push(nueva);
                            }
                        }
                    }
                }
            }
        }
    }
}

function mirillaRegla8(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "+") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (temp == ope1 && ope2 == '0') {
                    let nuevo = new NodoOp(8, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                } else if (temp == ope2 && ope1 == '0') {
                    let nuevo = new NodoOp(8, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                }
            }
        }
    }
}

function mirillaRegla9(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "-") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (temp == ope1 && ope2 == '0') {
                    let nuevo = new NodoOp(9, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                }
            }
        }
    }
}

function mirillaRegla10(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "*") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (temp == ope1 && ope2 == '1') {
                    let nuevo = new NodoOp(10, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                } else if (temp == ope2 && ope1 == '1') {
                    let nuevo = new NodoOp(10, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                }
            }
        }
    }
}

function mirillaRegla11(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "/") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (temp == ope1 && ope2 == '1') {
                    let nuevo = new NodoOp(11, instruccion.getExpresion(), "#Se elimina la instruccion", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.avilitado = false;
                }
            }
        }
    }
}

function mirillaRegla12(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "+") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '0') {
                    let nueva = new AsignarSimpleOp(temp, ope1, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(12, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                } else if (ope1 == '0') {
                    let nueva = new AsignarSimpleOp(temp, ope2, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(12, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}

function mirillaRegla13(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "-") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '0') {
                    let nueva = new AsignarSimpleOp(temp, ope1, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(13, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                } else if (ope1 == '0') {
                    let nueva = new AsignarSimpleOp(temp, '-' + ope2, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(13, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}

function mirillaRegla14(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "*") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '1') {
                    let nueva = new AsignarSimpleOp(temp, ope1, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(14, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                } else if (ope1 == '1') {
                    let nueva = new AsignarSimpleOp(temp, ope2, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(14, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}

function mirillaRegla15(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "/") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '1') {
                    let nueva = new AsignarSimpleOp(temp, ope1, instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(15, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}

function mirillaRegla16(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "*") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '2') {
                    let nuevo = new NodoOp(16, instruccion.getExpresion(), temp + " = " + ope1 + " + " + ope1 + ";", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.signo = "+";
                    instruccion.ope2 = ope1;
                } else if (ope1 == '2') {
                    let nuevo = new NodoOp(16, instruccion.getExpresion(), temp + " = " + ope2 + " + " + ope2 + ";", instruccion.fila);
                    reporte.push(nuevo);
                    instruccion.signo = "+";
                    instruccion.ope1 = ope2;
                }
            }
        }
    }
}

function mirillaRegla17(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "*") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                let ope2 = instruccion.ope2;
                if (ope2 == '0') {
                    let nueva = new AsignarSimpleOp(temp, '0', instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(17, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                } else if (ope1 == '0') {
                    let nueva = new AsignarSimpleOp(temp, '0', instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(17, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}

function mirillaRegla18(instrucciones, reporte) {
    for (let x = 0; x < instrucciones.length; x++) {
        let instruccion = instrucciones[x];
        if (instruccion instanceof AsignarOperacionOp) {

            let signo = instruccion.signo;
            if (signo == "/") {
                let temp = instruccion.temp;
                let ope1 = instruccion.ope1;
                if (ope1 == '0') {
                    let nueva = new AsignarSimpleOp(temp, '0', instruccion.fila, instruccion.columna);
                    nueva.avilitado = instruccion.avilitado;
                    let nuevo = new NodoOp(18, instruccion.getExpresion(), nueva.getExpresion(), instruccion.fila);
                    reporte.push(nuevo);
                    instrucciones[x] = nueva;
                }
            }
        }
    }
}