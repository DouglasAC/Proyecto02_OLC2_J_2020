function OptimizarMirilla()
{
    let number = tabActivaBajo.split(' ');
    let entrada = ace.edit(`editorBajo${number[1]}`).getValue();
    if (entrada=="") {
        alert("No hay entrada para Optimizar");
        return;
    }
    var result = GramaticaOp.parse(entrada);
    console.log(result);

    let codigo = "";

    for(let x = 0; x < result.instrucciones.length; x++)
    {
        codigo += result.instrucciones[x].getCodigo();
    }

    crearTabBajo();
    number = tabActivaBajo.split(' ');
    ace.edit(`editorBajo${number[1]}`).setValue(codigo);
}

