import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [empleadoList, setEmpleadoList] = useState([]);
  const [idEmpleadoSeleccionado, setIdEmpleadoSeleccionado] = useState(null);

  // Función para obtener la lista de empleados
  const getEmpleado = () => {
    Axios.get("http://localhost:3000/obtener")
      .then((response) => {
        setEmpleadoList(response.data);
      })
      .catch(error => {
        console.error("Error al obtener empleados:", error);
      });
  }

  // Función para manejar la creación de un nuevo empleado
  const agregarEmpleado = () => {
    Axios.post("http://localhost:3000/create", {
      nombre: nombre,
      apellido: apellido,
      dni: dni
    }).then(() => {
      alert("Empleado registrado");
      getEmpleado();
      // Limpiar los campos después de registrar
      setNombre('');
      setApellido('');
      setDni('');
    }).catch(error => {
      console.error("Error al registrar empleado:", error);
    });
  }

  // Función para manejar la actualización de un empleado
  const actualizarEmpleado = () => {
    if (idEmpleadoSeleccionado) {
      Axios.post("http://localhost:3000/actualizar", {
        id: idEmpleadoSeleccionado,
        nombre: nombre,
        apellido: apellido,
        dni: dni
      }).then(() => {
        alert("Empleado actualizado");
        getEmpleado();
        // Limpiar los campos después de actualizar
        setNombre('');
        setApellido('');
        setDni('');
        setIdEmpleadoSeleccionado(null); // Resetear el id seleccionado
      }).catch(error => {
        console.error("Error al actualizar empleado:", error);
      });
    } else {
      alert("Selecciona un empleado para actualizar");
    }
  }

  // Llamar a getEmpleado al cargar el componente para obtener la lista inicial
  useEffect(() => {
    getEmpleado();
  }, []);

  // Función para seleccionar un empleado para actualizar
  const seleccionarEmpleado = (empleado) => {
    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDni(empleado.dni);
    setIdEmpleadoSeleccionado(empleado.id);
  }

  // Función para eliminar un empleado con confirmación
const eliminarEmpleado = (id) => {
  // Mostrar ventana de confirmación
  if (window.confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
    // Usuario ha confirmado la eliminación
    Axios.post("http://localhost:3000/eliminar", {
      id: id
    }).then(() => {
      alert("Empleado eliminado");
      getEmpleado();
    }).catch(error => {
      console.error("Error al eliminar empleado:", error);
    });
  } else {
    // Usuario ha cancelado la eliminación
    console.log("Eliminación cancelada");
  }
}


  return (
    <div className='App'>
      <div className='centered-container'>
        <div className='Datos'>
          <label>
            Nombre:
            <input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              type="text"
            />
          </label>

          <label>
            Apellido:
            <input
              value={apellido}
              onChange={(event) => setApellido(event.target.value)}
              type="text"
            />
          </label>

          <label>
            DNI:
            <input
              value={dni}
              onChange={(event) => setDni(event.target.value)}
              type="number"
            />
          </label>

          {/* Botones para registrar y actualizar */}
          <button className="btn success" onClick={agregarEmpleado}>Registrar</button>
          <button onClick={actualizarEmpleado}>Actualizar</button>
        </div>

        {/* Tabla para mostrar la lista de empleados */}
        <div className='Tablacondatos'>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleadoList.map(empleado => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.dni}</td>
                  <td>
                    <button onClick={() => seleccionarEmpleado(empleado)}>✏️</button>
                    <button onClick={() => eliminarEmpleado(empleado.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

