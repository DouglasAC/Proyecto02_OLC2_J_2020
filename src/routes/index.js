const express = require('express');
const router = express.Router();
const archivos = require('../archivos/direccion')
const path = require('path');
const fs = require('fs');

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

function existeArchivo(nombre) {
    let texto = fs.existsSync(path.join(archivos(), nombre + '.j'));
    return texto;
}

function leerArchivo(nombre) {
    let texto = fs.readFileSync(path.join(archivos(), nombre + '.j'));
    return texto;
}

module.exports = router;
