function generarReporteErrores(errores) {
    var hoy = new Date();
    var hora = hoy.getHours() + ' : ' + hoy.getMinutes() + ' : ' + hoy.getSeconds();
    var fecha = hoy.getUTCDate() + ' - ' + (hoy.getMonth() + 1) + ' - ' + hoy.getFullYear();
    let codigo = "<h3> Fechas y hora: " + fecha + ' | ' + hora + "</h3>\n";
    codigo += "<br>\n";
    codigo += "<h1> Errores Encontrados: </h1>\n";
    codigo += "<br>\n";
    codigo += "<table class=\"table table-bordered\" >\n";
    codigo += "<thead class=\"thead-dark\">\n";
    codigo += "<tr>\n";
    codigo += "<th scope=\"col\">#</th>\n";
    codigo += "<th scope=\"col\">Tipo</th>\n";
    codigo += "<th scope=\"col\">Descripcion</th>\n";
    codigo += "<th scope=\"col\">Linea</th>\n";
    codigo += "<th scope=\"col\">Columna</th>\n";
    codigo += "</tr>\n";
    codigo += "</thead>\n";
    codigo += "<tbody>\n";
    for (let x = 0; x < errores.length; x++) {
        let e = errores[x];
        codigo += "<tr class=\"bg-danger text-white\">\n";
        codigo += "<th scope=\"row\">" + (x + 1) + "</td>\n";
        codigo += "<td>" + e.tipo + "</td>\n";
        codigo += "<td>" + e.descripcion + "</td>\n";
        codigo += "<td>" + e.fila + "</td>\n";
        codigo += "<td>" + e.columna + "</td>\n";
        codigo += "</tr>\n";

    }
    codigo += "</tbody>\n";
    codigo += "</table>\n";
    codigo += "<br>\n";
    document.getElementById('divErrores').innerHTML = codigo;
}

function generarReporteTablaSimbolos(simbolos) {
    var hoy = new Date();
    var hora = hoy.getHours() + ' : ' + hoy.getMinutes() + ' : ' + hoy.getSeconds();
    var fecha = hoy.getUTCDate() + ' - ' + (hoy.getMonth() + 1) + ' - ' + hoy.getFullYear();
    let codigo = "<h3> Fechas y hora: " + fecha + ' | ' + hora + "</h3>\n";
    codigo += "<br>\n";
    codigo += "<h1> Tabla de Simbolos: </h1>\n";
    codigo += "<br>\n";
    codigo += "<table class=\"table table-bordered\" >\n";
    codigo += "<thead class=\"thead-dark\">\n";
    codigo += "<tr>\n";

    codigo += "<th scope=\"col\">#</th>\n";
    codigo += "<th scope=\"col\">Tipo</th>\n";
    codigo += "<th scope=\"col\">Nombre</th>\n";
    codigo += "<th scope=\"col\">Entorno</th>\n";
    codigo += "<th scope=\"col\">Apuntador</th>\n";
    codigo += "<th scope=\"col\">Arreglo</th>\n";
    codigo += "<th scope=\"col\">Ambito</th>\n";
    codigo += "<th scope=\"col\">Rol</th>\n";
    codigo += "<th scope=\"col\">Constante</th>\n";
    codigo += "</tr>\n";
    codigo += "</thead>\n";
    codigo += "<tbody>\n";


    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">1</td>\n";
    codigo += "<td>Arreglo de char</td>\n";
    codigo += "<td>toCharArray</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>toCharArray</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">2</td>\n";
    codigo += "<td>Integer</td>\n";
    codigo += "<td>length</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>length</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";


    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">3</td>\n";
    codigo += "<td>String</td>\n";
    codigo += "<td>toUpperCase</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>toUpperCase</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">4</td>\n";
    codigo += "<td>String</td>\n";
    codigo += "<td>toLowerCase</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>toLowerCase</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">5</td>\n";
    codigo += "<td>String</td>\n";
    codigo += "<td>charAt</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>charAt_15</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">6</td>\n";
    codigo += "<td>String</td>\n";
    codigo += "<td>linealize</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>toCharArray</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">7</td>\n";
    codigo += "<td>Integer</td>\n";
    codigo += "<td>Size</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td>length_15</td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    codigo += "<tr class=\"bg-success text-white\">\n";
    codigo += "<th scope=\"row\">8</td>\n";
    codigo += "<td>Boolean</td>\n";
    codigo += "<td>instanceOf</td>\n";
    codigo += "<td> global </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "<td> Funcion </td>\n";
    codigo += "<td> - </td>\n";
    codigo += "</tr>\n";

    for (let x = 0; x < simbolos.length; x++) {
        let sim = simbolos[x];
        codigo += "<tr class=\"bg-success text-white\">\n";
        codigo += "<th scope=\"row\">" + (x + 9) + "</td>\n";
        if (sim instanceof SimboloAlto) {
            if (sim.tipo[0] == "Tarry") {
                codigo += "<td> Arreglo de " + sim.tipo[1] + "</td>\n";
            } else {
                codigo += "<td>" + sim.tipo + "</td>\n";
            }
            codigo += "<td>" + sim.nombre + "</td>\n";
            codigo += "<td>" + sim.entorno + "</td>\n";
            codigo += "<td>" + sim.apuntador + "</td>\n";
            codigo += "<td>" + sim.arreglo + "</td>\n";
            codigo += "<td>" + sim.ambito + "</td>\n";
            codigo += "<td>" + sim.rol + "</td>\n";
            codigo += "<td>" + sim.constante + "</td>\n";
        } else if (sim instanceof SimboloFuncion) {
            if (sim.tipo[0] == "Tarry") {
                codigo += "<td> Arreglo de " + sim.tipo[1] + "</td>\n";
            } else {
                codigo += "<td>" + sim.tipo + "</td>\n";
            }
            codigo += "<td>" + sim.nombreReal + "</td>\n";
            codigo += "<td> global </td>\n";
            codigo += "<td> - </td>\n";
            codigo += "<td> - </td>\n";
            codigo += "<td>" + sim.nombre + "</td>\n";
            codigo += "<td> Funcion </td>\n";
            codigo += "<td> - </td>\n";
        }
        codigo += "</tr>\n";

    }
    codigo += "</tbody>\n";
    codigo += "</table>\n";
    codigo += "<br>\n";
    document.getElementById('divTabla').innerHTML = codigo;        
}