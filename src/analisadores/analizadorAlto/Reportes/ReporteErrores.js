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