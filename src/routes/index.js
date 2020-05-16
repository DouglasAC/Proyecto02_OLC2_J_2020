const express = require('express');
const router = express.Router();
const archivos = require('../archivos/direccion')
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

router.get('/', (req, res) => {
    return res.render('index')
});

router.post('/importar', (req, res) => {
    if (existeArchivo(req.body.texto)) {
        let texto = leerArchivo(req.body.texto);
        res.send(texto);
    } else {
        res.send("no");
    }
});

router.post('/ast', (req, res) => {
    let cuerpo = req.body.cuerpo;


    let inicio = "digraph G {\n node[shape=box, style=filled, color=Gray95];\n" + "edge[color=lightblue];\n rankdir=UD;\n";
    inicio += cuerpo + "}";

    fs.writeFileSync(path.join(archivos(), "cuerpo.txt"), inicio, { mode: 0o755 });

    let cmd = "dot.exe ";
    cmd += " -Tjpg ";
    cmd += path.join(archivos(), "cuerpo.txt");
    cmd += " -o ";
    cmd += path.join(archivos(), "ast.jpg");
    let comando = child_process.spawnSync("cmd", ['/c', cmd + "\n"]);

    res.send(path.join(archivos(), "ast.jpg"));
});

router.post('/bloques', (req, res) => {
    let cuerpo = req.body.cuerpo;


    let inicio = "digraph G {\n node[shape=box, style=filled, color=Gray95];\n" + "edge[color=lightblue];\n rankdir=UD;\n";
    inicio += cuerpo + "}";

    fs.writeFileSync(path.join(archivos(), "cuerpo.txt"), inicio, { mode: 0o755 });

    let cmd = "dot.exe ";
    cmd += " -Tjpg ";
    cmd += path.join(archivos(), "cuerpo.txt");
    cmd += " -o ";
    cmd += path.join(archivos(), "bloq.jpg");
    let comando = child_process.spawnSync("cmd", ['/c', cmd + "\n"]);

    res.send(comando.stderr);
});


function existeArchivo(nombre) {
    let texto = fs.existsSync(path.join(archivos(), nombre + '.j'));
    return texto;
}

function leerArchivo(nombre) {
    let texto = fs.readFileSync(path.join(archivos(), nombre + '.j'));
    return texto;
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

module.exports = router;
