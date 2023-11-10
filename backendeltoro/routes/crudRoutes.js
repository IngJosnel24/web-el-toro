const express = require('express');
const router = express.Router();


module.exports = (db) => {

    /* 
  # Leer todos los productos
curl http://localhost:5000/crud/producto/read

# Crear un nuevo producto
curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"Producto1\",\"precio_compra\":10.99,\"precio_venta\":19.99,\"descripcion\":\"Descripción del producto\",\"cantidad\":50,\"Categoria\":\"Electrónicos\"}" http://localhost:5000/crud/producto/create

# Actualizar un producto existente por ID
curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"NuevoNombre\",\"precio_compra\":12.99,\"precio_venta\":22.99,\"descripcion\":\"Nueva descripción\",\"cantidad\":60,\"Categoria\":\"Electrónicos\"}" http://localhost:5000/crud/producto/update/1

# Eliminar un producto por ID
curl -X DELETE http://localhost:5000/crud/producto/delete/1
 */

    // Rutas CRUD para la tabla "producto"
    router.get('/producto/read', (req, res) => {
      // Consulta para obtener todos los productos
      const sql = 'SELECT id_producto, nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria FROM producto';
      
      // Ejecutar consulta
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error al leer productos:', err);
          res.status(500).json({ error: 'Error al leer productos' });
        } else {
          res.status(200).json(result);
        }
      });
  });
  
  router.post('/producto/create', (req, res) => {
      const { nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria } = req.body;
  
      if (!nombre || !precio_compra || !precio_venta || !descripcion || !cantidad || !imagen || !Categoria) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      const sql = 'INSERT INTO producto (nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria];
  
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error al insertar producto:', err);
              res.status(500).json({ error: 'Error al insertar producto' });
          } else {
              res.status(201).json({ message: 'Producto creado con éxito' });
          }
      });
  });
  
  router.put('/producto/update/:id', (req, res) => {
      const id = req.params.id;
      const { nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria } = req.body;
  
      if (!nombre || !precio_compra || !precio_venta || !descripcion || !cantidad || !imagen || !Categoria) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      const sql = 'UPDATE producto SET nombre = ?, precio_compra = ?, precio_venta = ?, descripcion = ?, cantidad = ?, imagen = ?, Categoria = ? WHERE id_producto = ?';
      const values = [nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria, id];
  
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error al actualizar producto:', err);
              res.status(500).json({ error: 'Error al actualizar producto' });
          } else {
              res.status(200).json({ message: 'Producto actualizado con éxito' });
          }
      });
  });
  
  router.delete('/producto/delete/:id', (req, res) => {
      const id = req.params.id;
  
      const sql = 'DELETE FROM producto WHERE id_producto = ?';
  
      db.query(sql, [id], (err, result) => {
          if (err) {
              console.error('Error al eliminar producto:', err);
              res.status(500).json({ error: 'Error al eliminar producto' });
          } else {
              res.status(200).json({ message: 'Producto eliminado con éxito' });
          }
      });
  });
  
 /*  # Leer todos los consumibles
curl http://localhost:5000/crud/consumibles/read

# Crear un nuevo consumible
curl -X POST -H "Content-Type: application/json" -d "{\"id_producto\":1,\"fecha_vencimiento\":\"2023-12-31 23:59:59\"}" http://localhost:5000/crud/consumibles/create

# Actualizar un consumible existente por ID
curl -X PUT -H "Content-Type: application/json" -d "{\"fecha_vencimiento\":\"2024-12-31 23:59:59\"}" http://localhost:5000/crud/consumibles/update/1

# Eliminar un consumible por ID
curl -X DELETE http://localhost:5000/crud/consumibles/delete/1 */


  // Rutas CRUD para la tabla "consumibles"
router.get('/consumibles/read', (req, res) => {
    // Consulta para obtener todos los consumibles
    const sql = 'SELECT * FROM consumibles';
    
    // Ejecutar consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer consumibles:', err);
        res.status(500).json({ error: 'Error al leer consumibles' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  router.post('/consumibles/create', (req, res) => {
    const { id_producto, fecha_vencimiento } = req.body;
  
    if (!id_producto || !fecha_vencimiento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = 'INSERT INTO consumibles (id_producto, fecha_vencimiento) VALUES (?, ?)';
    const values = [id_producto, fecha_vencimiento];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar consumible:', err);
        res.status(500).json({ error: 'Error al insertar consumible' });
      } else {
        res.status(201).json({ message: 'Consumible creado con éxito' });
      }
    });
  });
  
  router.put('/consumibles/update/:id', (req, res) => {
    const id = req.params.id;
    const { fecha_vencimiento } = req.body;
  
    if (!fecha_vencimiento) {
      return res.status(400).json({ error: 'El campo "fecha_vencimiento" es obligatorio' });
    }
  
    const sql = 'UPDATE consumibles SET fecha_vencimiento = ? WHERE id_Consumible = ?';
    const values = [fecha_vencimiento, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar consumible:', err);
        res.status(500).json({ error: 'Error al actualizar consumible' });
      } else {
        res.status(200).json({ message: 'Consumible actualizado con éxito' });
      }
    });
  });
  
  router.delete('/consumibles/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM consumibles WHERE id_Consumible = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar consumible:', err);
        res.status(500).json({ error: 'Error al eliminar consumible' });
      } else {
        res.status(200).json({ message: 'Consumible eliminado con éxito' });
      }
    });
  });
  
 /*  # Leer todos los Videojuegos
  curl http://localhost:5000/crud/Videojuegos/read
  
  # Crear un nuevo Videojuego
  curl -X POST -H "Content-Type: application/json" -d "{\"id_producto\":1,\"plataforma\":\"PS5\"}" http://localhost:5000/crud/Videojuegos/create
  
  # Actualizar un Videojuego existente por ID
  curl -X PUT -H "Content-Type: application/json" -d "{\"plataforma\":\"Xbox Series X\"}" http://localhost:5000/crud/Videojuegos/update/1
  
  # Eliminar un Videojuego por ID
  curl -X DELETE http://localhost:5000/crud/Videojuegos/delete/1 */

  // Rutas CRUD para la tabla "Videojuegos"
router.get('/Videojuegos/read', (req, res) => {
    // Consulta para obtener todos los Videojuegos
    const sql = 'SELECT * FROM Videojuegos';
    
    // Ejecutar consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer Videojuegos:', err);
        res.status(500).json({ error: 'Error al leer Videojuegos' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  router.post('/Videojuegos/create', (req, res) => {
    const { id_producto, plataforma } = req.body;
  
    if (!id_producto || !plataforma) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = 'INSERT INTO Videojuegos (id_producto, plataforma) VALUES (?, ?)';
    const values = [id_producto, plataforma];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar Videojuego:', err);
        res.status(500).json({ error: 'Error al insertar Videojuego' });
      } else {
        res.status(201).json({ message: 'Videojuego creado con éxito' });
      }
    });
  });
  
  router.put('/Videojuegos/update/:id', (req, res) => {
    const id = req.params.id;
    const { plataforma } = req.body;
  
    if (!plataforma) {
      return res.status(400).json({ error: 'El campo "plataforma" es obligatorio' });
    }
  
    const sql = 'UPDATE Videojuegos SET plataforma = ? WHERE id_videojuegos = ?';
    const values = [plataforma, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar Videojuego:', err);
        res.status(500).json({ error: 'Error al actualizar Videojuego' });
      } else {
        res.status(200).json({ message: 'Videojuego actualizado con éxito' });
      }
    });
  });
  
  router.delete('/Videojuegos/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM Videojuegos WHERE id_videojuegos = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar Videojuego:', err);
        res.status(500).json({ error: 'Error al eliminar Videojuego' });
      } else {
        res.status(200).json({ message: 'Videojuego eliminado con éxito' });
      }
    });
  });

  
/*   # Leer todos los Electrónicos
curl http://localhost:5000/crud/Electronicos/read

# Crear un nuevo Electrónico
curl -X POST -H "Content-Type: application/json" -d "{\"id_producto\":1,\"marca\":\"NuevaMarca\"}" http://localhost:5000/crud/Electronicos/create

# Actualizar un Electrónico existente por ID
curl -X PUT -H "Content-Type: application/json" -d "{\"marca\":\"MarcaActualizada\"}" http://localhost:5000/crud/Electronicos/update/1

# Eliminar un Electrónico por ID
curl -X DELETE http://localhost:5000/crud/Electronicos/delete/1 */

// Rutas CRUD para la tabla "Electronicos"
router.get('/Electronicos/read', (req, res) => {
    // Consulta para obtener todos los Electronicos
    const sql = 'SELECT * FROM Electronicos';
    
    // Ejecutar consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer Electronicos:', err);
        res.status(500).json({ error: 'Error al leer Electronicos' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  router.post('/Electronicos/create', (req, res) => {
    const { id_producto, marca } = req.body;
  
    if (!id_producto || !marca) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = 'INSERT INTO Electronicos (id_producto, marca) VALUES (?, ?)';
    const values = [id_producto, marca];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar Electrónico:', err);
        res.status(500).json({ error: 'Error al insertar Electrónico' });
      } else {
        res.status(201).json({ message: 'Electrónico creado con éxito' });
      }
    });
  });
  
  router.put('/Electronicos/update/:id', (req, res) => {
    const id = req.params.id;
    const { marca } = req.body;
  
    if (!marca) {
      return res.status(400).json({ error: 'El campo "marca" es obligatorio' });
    }
  
    const sql = 'UPDATE Electronicos SET marca = ? WHERE id_electronicos = ?';
    const values = [marca, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar Electrónico:', err);
        res.status(500).json({ error: 'Error al actualizar Electrónico' });
      } else {
        res.status(200).json({ message: 'Electrónico actualizado con éxito' });
      }
    });
  });
  
  router.delete('/Electronicos/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM Electronicos WHERE id_electronicos = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar Electrónico:', err);
        res.status(500).json({ error: 'Error al eliminar Electrónico' });
      } else {
        res.status(200).json({ message: 'Electrónico eliminado con éxito' });
      }
    });
  });
  
// Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
  const { nombre_Usuario, contrasena } = req.body;

  if (!nombre_Usuario || !contrasena) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  // Realizar la consulta para verificar las credenciales en la base de datos
  const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
  db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      return res.status(500).json({ error: 'Error al verificar credenciales' });
    }

    if (result.length === 1) {
      const { rol } = result[0];
      res.json({ rol }); // Devolver el rol si las credenciales son correctas
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});

router.get('/cliente/read', (req, res) => {
  // Consulta para obtener todos los clientes
  const sql = 'SELECT * FROM cliente';

  // Ejecutar consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer clientes:', err);
      res.status(500).json({ error: 'Error al leer clientes' });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/cliente/create', (req, res) => {
  const { nombres, apellidos, direccion, cedula, telefono, correo } = req.body;

  if (!nombres || !apellidos || !direccion || !cedula || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = 'INSERT INTO cliente (nombres, apellidos, direccion, cedula, telefono, correo) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nombres, apellidos, direccion, cedula, telefono, correo];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar cliente:', err);
      res.status(500).json({ error: 'Error al insertar cliente' });
    } else {
      res.status(201).json({ message: 'Cliente creado con éxito' });
    }
  });
});

router.put('/cliente/update/:id', (req, res) => {
  const id = req.params.id;
  const { nombres, apellidos, direccion, cedula, telefono, correo } = req.body;

  if (!nombres || !apellidos || !direccion || !cedula || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = 'UPDATE cliente SET nombres = ?, apellidos = ?, direccion = ?, cedula = ?, telefono = ?, correo = ? WHERE id_Cliente = ?';
  const values = [nombres, apellidos, direccion, cedula, telefono, correo, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar cliente:', err);
      res.status(500).json({ error: 'Error al actualizar cliente' });
    } else {
      res.status(200).json({ message: 'Cliente actualizado con éxito' });
    }
  });
});

router.delete('/cliente/delete/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM cliente WHERE id_Cliente = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      res.status(500).json({ error: 'Error al eliminar cliente' });
    } else {
      res.status(200).json({ message: 'Cliente eliminado con éxito' });
    }
  });
});






  

    return router;
};
