const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// Configurar la base de datos SQLite3
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Crear la tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contactos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT,
        mensaje TEXT
    )`);
});

// Middleware para el manejo de formularios
app.use(express.urlencoded({ extended: true }));

// Ruta para mostrar el formulario de contacto
app.get('/contacto', (req, res) => {
    res.render('contacto');
});

// Ruta para manejar la solicitud POST del formulario de contacto
app.post('/contacto', (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    db.run('INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)', [nombre, correo, mensaje], (err) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.send('¡Gracias por contactarnos!');
        }
    });
});

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
