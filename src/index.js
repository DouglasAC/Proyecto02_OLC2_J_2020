const express = require('express');
const morgan = require('morgan');
const path = require('path');
const v8 = require('v8');
const bodyParser = require('body-parser')
//"dev": "nodemon --max-old-space-size=4096 src/"
//console.log(v8.getHeapStatistics())
const total = v8.getHeapStatistics().total_available_size;
let total2 = (total / 1024 / 1024 / 1024).toFixed(2);
console.log('Total heap size (bytes) ' + total + ', (GB ' + total2 + ') ');
/// inicion
var app = express();

// ssetingss
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
//Variables globales
app.use((req, res, next) => {
  next();
});

//Rutas
app.use(require('./routes'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'archivos')));
app.use(express.static(path.join(__dirname, 'analisadores')));
// Iniciar servidor

app.listen(app.get('port'), () => {
  console.log('Aplicaion en puerto: ', app.get('port'))
});



/*app.get('/', function (req, res) {
  res.send('Hello World! cambio');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/