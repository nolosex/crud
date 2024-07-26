const express = require('express');
const app = express();
const cors = require('cors');
const empleadosController = require('./controllers/empleadosController.js');
const db = require('./db/dbconnection.js'); // Importar la conexión a la base de datos
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);

// Ruta para crear un empleado
app.post("/create", empleadosController.createEmpleado(db)); // Pasar la conexión db al controlador

app.get("/obtener", empleadosController.obtenerEmpleados(db)); // obtener el empleado

app.post("/actualizar", empleadosController.actualizarEmpleado(db)); // actualizar empleado

app.post("/eliminar", empleadosController.eliminarEmpleado(db));// eliminar empleado

app.listen(app.get('port'), () => {
    console.log(`Conectado al puerto ${app.get('port')}`);
});
