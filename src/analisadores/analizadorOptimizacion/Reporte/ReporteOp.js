function ReporteOptimizacion(reporte)
{
    var hoy = new Date();
    var hora = hoy.getHours() + ' : ' + hoy.getMinutes() + ' : ' + hoy.getSeconds();
    var fecha = hoy.getUTCDate() + ' - ' + (hoy.getMonth() + 1) + ' - ' + hoy.getFullYear();
    let codigo = "<h3> Fechas y hora: " + fecha + ' | ' + hora + "</h3>\n";
    codigo += "<br>\n";
    codigo += "<h1> Reglas Aplicadas: </h1>\n";
    codigo += "<br>\n";
    codigo += "<table class=\"table table-bordered\" >\n";
    codigo += "<thead class=\"thead-dark\">\n";
    codigo += "<tr>\n";
    codigo += "<th scope=\"col\">#</th>\n";
    codigo += "<th scope=\"col\">Regla</th>\n";
    codigo += "<th scope=\"col\">Codigo</th>\n";
    codigo += "<th scope=\"col\">Optimizacion</th>\n";
    codigo += "<th scope=\"col\">Fila</th>\n";
    codigo += "</tr>\n";
    codigo += "</thead>\n";
    codigo += "<tbody>\n";
    for (let x = 0; x < reporte.length; x++) {
        let e = reporte[x];
        codigo += "<tr class=\"bg-secondary text-white\">\n";
        codigo += "<th scope=\"row\">" + (x + 1) + "</td>\n";
        codigo += "<td>" + e.regla + "</td>\n";
        codigo += "<td>" + e.expresion + "</td>\n";
        codigo += "<td>" + e.resultado + "</td>\n";
        codigo += "<td>" + e.fila + "</td>\n";
        codigo += "</tr>\n";

    }
    codigo += "</tbody>\n";
    codigo += "</table>\n";
    codigo += "<br>\n";
    document.getElementById('divOpt').innerHTML = codigo;
}