import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function ProductRegistration() {
  // Create a state for each field in the form
  const [nombre, setNombre] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      nombre,
      precio_compra: precioCompra,
      precio_venta: precioVenta,
      descripcion,
      cantidad,
      Categoria: categoria,
    };

    try {
      // Make an HTTP request to the backend to send the data
      const response = await fetch('http://localhost:5000/crud/producto/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // The record was created successfully
        alert('Producto ingresado exitosamente');
        // Reset the form fields
        setNombre('');
        setPrecioCompra('');
        setPrecioVenta('');
        setDescripcion('');
        setCantidad('');
        setCategoria('');
      } else {
        alert('Error al registrar producto');
      }
    } catch (error) {
      console.error('Error in the request:', error);
      alert('Error in the server request');
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Producos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre" label="Nombre Producto">
                    <Form.Control
                      type="text"
                      placeholder="Enter product name"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="number"
                      placeholder="Enter quantity"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="precioCompra" label="Precio Compra">
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Enter purchase price"
                      value={precioCompra}
                      onChange={(e) => setPrecioCompra(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="precioVenta" label="Precio Venta">
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Enter selling price"
                      value={precioVenta}
                      onChange={(e) => setPrecioVenta(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="8">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="categoria" label="Categoria">
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ProductRegistration;
