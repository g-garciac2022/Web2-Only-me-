/* Fallos detectados





Arreglar el error que sale cada vez que editamos (no terminal)

Arreglar metodo de subida de subposts





*/

/* Apuntes:

Codifgos de estado HTTP:
1XX = respuestas informativas
2XX = respuestas satisfactorias
3XX = redirecciones
4XX = errores del cliente
5XX = errores del servidor

web de desarrollo: https://developer.mozilla.org/es/docs/Web/HTTP/Status

*/


import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import zarmaRouter from './zarmaRouter.js';
import { __dirname } from './dirname.js';
const app = express();








// Configuración de Mustache
app.engine('html', mustacheExpress(), '.html');

// Indicar el directorio de las vistas
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

app.use(bodyParser.urlencoded({ extended: true })); 
//para que pueda leer los datos del formulario y los convierta en un objeto javascript



// Configuración para servir archivos estáticos
app.use(express.static(__dirname + '/../public'));


app.use('/', zarmaRouter); //para que use el router de zarma


// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});