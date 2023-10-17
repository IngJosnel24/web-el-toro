import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    precio_compra: '',
    precio_venta: '',
    descripcion: '',
    cantidad: '',
    Categoria: '',
  });

  // Function to open the modal and pass the data of the selected product
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre: producto.nombre,
      precio_compra: producto.precio_compra,
      precio_venta: producto.precio_venta,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      Categoria: producto.Categoria,
    });
    setShowModal(true);
  };

  // Function to handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadProductos = () => {
    fetch('http://localhost:5000/crud/producto/read')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  // Function to send the update form
  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/producto/update/${selectedProducto.id_producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadProductos();
        }
      })
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  // Function to delete a product
  const handleDelete = (idProducto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/producto/delete/${idProducto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadProductos();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio_compra}</td>
                  <td>{producto.precio_venta}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.Categoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_producto)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio_compra" label="Precio de Compra">
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Ingrese el precio de compra"
                        name="precio_compra"
                        value={formData.precio_compra}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="precio_venta" label="Precio de Venta">
                      <Form.Control 
                        type="number"
                        step="0.01"
                        placeholder="Ingrese el precio de venta"
                        name="precio_venta"
                        value={formData.precio_venta}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese la descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="cantidad" label="Cantidad">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese la cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Categoria" label="Categoría">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese la categoría"
                        name="Categoria"
                        value={formData.Categoria}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;
