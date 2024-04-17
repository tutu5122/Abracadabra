import express from 'express';
import { fileURLToPath } from 'url';
import { dirname  } from 'path';
const __filename = fileURLToPath(  import.meta.url  );
const __dirname = dirname(__filename);

const app = express();
const PUERTO = 3000;
const usuarios = ['Juan', 'jocelyn', 'Astrid', 'maria', 'Ignacia', 'javier', 'Brian'];

// Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static('public/assets'));

// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.send({usuarios});
});

// Creamos el Middleware
app.use('/abracadabra/juego/:usuario', (req, res, next) =>{
    console.log('salida', req.params)
    const usuario = req.params.usuario
    usuarios.includes(usuario) ? next() : res.redirect('/who.jpeg');

})

app.get ('/abracadabra/juego/:usuario', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

//Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria.
app.get('/abracadabra/conejo/:n', (req, res) =>{
    const numero = Math.floor(Math.random() * 4) + 1;
    const n = req.params.n 

    n == numero ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg');
})


// Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...”
app.get('*', (req, res) => {
    res.send('Esta página no existe...');
});


app.listen( PUERTO, () => console.log(`Servidor listo ${PUERTO}`))