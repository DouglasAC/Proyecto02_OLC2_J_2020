function ejecutar3D() {
    let number = tabActivaBajo.split(' ');
    let entrada = ace.edit(`editorBajo${number[1]}`).getValue();
    if (entrada=="") {
        alert("No hay entrada para ejecutar");
        return;
    }
    var result = gramatica3d.parse(entrada);
    document.getElementById("consola").value = "";
    var indexInstruccion = 0;
    var tabla;
    this.tabla = new Tabla();
    this.tabla.isDebugger = false;

    console.log(result);
    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta ||
            result.instrucciones[indexInstruccion] instanceof InicioMetodo ||
            result.instrucciones[indexInstruccion] instanceof FinMetodo ||
            result.instrucciones[indexInstruccion] instanceof Metodo) {
            result.instrucciones[indexInstruccion].ejecutar(this.tabla);
        }
    }

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta) {
            continue;
        }
        if (result.instrucciones[indexInstruccion] instanceof SaltoCondicional ||
            result.instrucciones[indexInstruccion] instanceof SaltoCondicionalFalso  ||
            result.instrucciones[indexInstruccion] instanceof Goto) {
            let temp = result.instrucciones[indexInstruccion].ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof Llamada) {
            let temp = result.instrucciones[indexInstruccion].ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                this.tabla.listaRetornosCall.push(indexInstruccion);
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof InicioMetodo) {
            let temp = result.instrucciones[indexInstruccion];
            temp = temp.index + temp.cantidadIns + 1;
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof FinMetodo) {

            let temp = this.tabla.listaRetornosCall.pop();
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else {
            result.instrucciones[indexInstruccion].ejecutar(this.tabla);
        }
    }
}

var instruccionesDebugger = null;
var tabla = null;
var listaBreakpoints = [];

