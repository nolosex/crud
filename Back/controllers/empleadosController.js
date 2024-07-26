// empleadosController.js

// Exportar la función como un módulo para recibir db como parámetro
module.exports.createEmpleado = (db) => (req, res) => {
    const { nombre, apellido, dni } = req.body;

    db.query('INSERT INTO empleado (nombre, apellido, dni) VALUES (?, ?, ?)', [nombre, apellido, dni], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al insertar empleado");
        } else {
            res.send("EMPLEADO REGISTRADO");
        }
    });
};

// Suponiendo que estás usando Express para manejar las rutas
module.exports.obtenerEmpleados = (db) => (req, res) => {
    db.query('SELECT * FROM empleado', (err, result) => {
      if (err) {
        console.error("Error al obtener empleados:", err);
        res.status(500).send("Error al obtener empleados");
      } else {
        res.json(result); // Enviar respuesta como JSON con los datos obtenidos
      }
    });
  };


  // empleadosController.js

module.exports.actualizarEmpleado = (db) => (req, res) => {
    const { id, nombre, apellido, dni } = req.body;
  
    db.query(
      'UPDATE empleado SET nombre = ?, apellido = ?, dni = ? WHERE id = ?',
      [nombre, apellido, dni, id],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar empleado:", err);
          res.status(500).send("Error al actualizar empleado");
        } else {
          res.send("Empleado actualizado correctamente");
        }
      }
    );
  };
  

  // empleadosController.js

module.exports.eliminarEmpleado = (db) => (req, res) => {
    const { id } = req.body;
  
    db.query(
      'DELETE FROM empleado WHERE id = ?',
      [id],
      (err, result) => {
        if (err) {
          console.error("Error al eliminar empleado:", err);
          res.status(500).send("Error al eliminar empleado");
        } else {
          res.send("Empleado eliminado correctamente");
        }
      }
    );
  };
  
  