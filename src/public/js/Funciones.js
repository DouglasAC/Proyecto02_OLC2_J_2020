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

var contadorAlto = 1;
var tabActivaAlto = "";

function crearTabAlto() {
    // Obtner los links 
    var tabLinks = document.getElementById("tabslinksAlto");
    // Obtner el contenedor de los tabs
    var tabs = document.getElementById("tabsAlto");
    // El nombre para nuevo tab
    var nuevaTab = "Archivo " + contadorAlto;

    //Crear el nuevo tab link 
    var botonNuevo = document.createElement("BUTTON");
    botonNuevo.innerHTML = nuevaTab;
    botonNuevo.id = "button" + nuevaTab;
    botonNuevo.className = "tablinks";
    botonNuevo.onclick = function () { cambiarTabAlto(event, nuevaTab) };

    // agregar el nuevo tab link 
    tabLinks.appendChild(botonNuevo);

    var divNuevaTab = document.createElement("DIV");
    divNuevaTab.id = nuevaTab;
    divNuevaTab.className = "tabcontent"

    var editorNuevoTab = document.createElement("DIV");
    editorNuevoTab.id = `editor${contadorAlto}`;
    editorNuevoTab.className = "editorTexto"

    editorNuevoTab.style.height = "450px";
    divNuevaTab.appendChild(editorNuevoTab);
    tabs.appendChild(divNuevaTab);

    var editor = ace.edit(`editor${contadorAlto++}`);
    editor.setTheme("ace/theme/dracula");
    editor.session.setMode("ace/mode/java");
    editor.setFontSize(15);

    document.getElementById("button" + nuevaTab).click();
    tabActivaAlto = nuevaTab;
}

function cambiarTabAlto(evt, tabName) {
    if (tabActivaAlto != "") {
        
        let number = tabActivaAlto.split(' ');
        document.getElementById(tabActivaAlto).style.display = "none";
        document.getElementById("buttonArchivo " + number[1]).className = "tablinks";
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        tabActivaAlto = tabName;
    } else {
        
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        tabActivaAlto = tabName;
    }
}

function cerrarActualAltoTab() {
    var tabLinksAlto = document.getElementById("tabslinksAlto");
    var tabsALTO = document.getElementById("tabsAlto");
    let numeroTab = tabActivaAlto.split(' ');

    let buttonPane = document.getElementById("button" + tabActivaAlto);
    let tabPane = document.getElementById(tabActivaAlto);
    let textPane = document.getElementById("editor" + numeroTab[1]);

    tabPane.removeChild(textPane);
    tabsALTO.removeChild(tabPane);
    tabLinksAlto.removeChild(buttonPane);
    tabActivaAlto = "";
}


function guardarAlto() {
    let numeroTab = tabActivaAlto.split(' ');
    var textToWrite = ace.edit(`editor${numeroTab[1]}`).getValue();
    var textoB = new Blob([textToWrite], { type: 'text/plain' });

    var nombreArchivo = prompt("Por favor ingrese el nombre del archivo:", "Archivo.j");
    if (nombreArchivo == null) {
        return;
    }
    var descargarArchivo = document.createElement("a");
    descargarArchivo.download = nombreArchivo;
    descargarArchivo.innerHTML = "Descargar Archivo";
    if (window.webkitURL != null) {
        descargarArchivo.href = window.webkitURL.createObjectURL(textoB);
    }
    else {
        descargarArchivo.href = window.URL.createObjectURL(textoB);
        descargarArchivo.onclick = destroyClickedElement;
        descargarArchivo.style.display = "none";
        document.body.appendChild(descargarArchivo);
    }
    descargarArchivo.click();
}


function abrirArchivo() {
    var file = document.getElementById('archivoAlto').files[0];

    if (file) {
        crearTabAlto();
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            let number = tabActivaAlto.split(' ');
            ace.edit(`editor${number[1]}`).setValue(textFromFileLoaded);
        };
        fileReader.readAsText(file, "UTF-8");
    } else {
        alert('No se pudo abrir el archivo');
    }
}


var contadorBajo = 1;
var tabActivaBajo = "";

function crearTabBajo() {
    // Obtner los links 
    var tabLinks = document.getElementById("tabsLinksBajo");
    // Obtner el contenedor de los tabs
    var tabs = document.getElementById("tabsBajo");
    // El nombre para nuevo tab
    var nuevaTab = "C3D " + contadorBajo;

    //Crear el nuevo tab link 
    var botonNuevo = document.createElement("BUTTON");
    botonNuevo.innerHTML = nuevaTab;
    botonNuevo.id = "button" + nuevaTab;
    botonNuevo.className = "tablinks";
    botonNuevo.onclick = function () { cambiarTabBajo(event, nuevaTab) };

    // agregar el nuevo tab link 
    tabLinks.appendChild(botonNuevo);

    var divNuevaTab = document.createElement("DIV");
    divNuevaTab.id = nuevaTab;
    divNuevaTab.className = "tabcontent"

    var editorNuevoTab = document.createElement("DIV");
    editorNuevoTab.id = `editorBajo${contadorBajo}`;
    editorNuevoTab.className = "editorTexto"

    editorNuevoTab.style.height = "450px";
    divNuevaTab.appendChild(editorNuevoTab);
    tabs.appendChild(divNuevaTab);

    var editor = ace.edit(`editorBajo${contadorBajo++}`);
    editor.setTheme("ace/theme/dracula");
    editor.session.setMode("ace/mode/ada");
    editor.setFontSize(15);

    document.getElementById("button" + nuevaTab).click();
    tabActivaBajo = nuevaTab;
}

function cambiarTabBajo(evt, tabName) {
    if (tabActivaBajo != "") {
        
        let numeroTab = tabActivaBajo.split(' ');
        document.getElementById(tabActivaBajo).style.display = "none";
        document.getElementById("buttonC3D " + numeroTab[1]).className = "tablinks";
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        tabActivaBajo = tabName;
    } else {
       
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        tabActivaBajo = tabName;
    }
}


function cerrarActualBajoTab() {
    var tabLinks = document.getElementById("tabsLinksBajo");
    var tabs = document.getElementById("tabsBajo");
    let numeroTab = tabActivaBajo.split(' ');

    let buttonPane = document.getElementById("button" + tabActivaBajo);
    let tabPane = document.getElementById(tabActivaBajo);
    let textPane = document.getElementById("editorBajo" + numeroTab[1]);

    tabPane.removeChild(textPane);
    tabs.removeChild(tabPane);
    tabLinks.removeChild(buttonPane);
    tabActivaBajo = "";
}



function guardarBajo() {
    let numeroTab = tabActivaBajo.split(' ');
    var textToWrite = ace.edit(`editorBajo${numeroTab[1]}`).getValue();
    var textoB = new Blob([textToWrite], { type: 'text/plain' });

    var nombreArchivo = prompt("Por favor ingrese el nombre del archivo:", "Archivo.j");
    if (nombreArchivo == null) {
        return;
    }
    var descargarArchivo = document.createElement("a");
    descargarArchivo.download = nombreArchivo;
    descargarArchivo.innerHTML = "Descargar Archivo";
    if (window.webkitURL != null) {
        descargarArchivo.href = window.webkitURL.createObjectURL(textoB);
    }
    else {
        descargarArchivo.href = window.URL.createObjectURL(textoB);
        descargarArchivo.onclick = destroyClickedElement;
        descargarArchivo.style.display = "none";
        document.body.appendChild(descargarArchivo);
    }
    descargarArchivo.click();
}


function abrirArchivoBajo() {
    var file = document.getElementById('archivoBajo').files[0];

    if (file) {
        crearTabBajo()
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            let number = tabActivaBajo.split(' ');
            ace.edit(`editorBajo${number[1]}`).setValue(textFromFileLoaded);
        };
        fileReader.readAsText(file, "UTF-8");
    } else {
        alert('No se pudo abrir el archivo');
    }
}

function cambiarReporte(reporte) {
    var reportes = document.getElementsByClassName("reporte");
    for (let i = 0; i < reportes.length; i++) {
        if (reporte == reportes[i].id) {
            reportes[i].style.display = "block";
        } else {
            reportes[i].style.display = "none";
        }
    }
    
}