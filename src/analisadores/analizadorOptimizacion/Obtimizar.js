

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