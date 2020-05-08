function obtener(nombre) {
    si = false;
    let fun = $.ajax({
        async: false,
        contentType: 'application/json;  charset=utf-8',
        type: "POST",
        url: "/importar",
        data: JSON.stringify({
            texto: nombre
        }),
        si: false,
        success: function (data, textStatus, jqXHR) {
            if (data != "no") {
                let nuevo = GramaticaAlto.parse(data);
                importares.push(nuevo);
                si = true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            si = false;
        }
        
    });
    return si;
}
let si = false;
let importares = [];