import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function ClienteRegistration({rol}) {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombres,
      apellidos,
      direccion,
      cedula,
      telefono,
      correo,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/cliente/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cliente registrado exitosamente');
        setNombres('');
        setApellidos('');
        setDireccion('');
        setCedula('');
        setTelefono('');
        setCorreo('');
      } else {
        alert('Error al registrar cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Clientes</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombres" label="Nombres">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese nombres"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellidos" label="Apellidos">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="cedula" label="Cédula">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control
                      type="email"
                      placeholder="Ingrese correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
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

export default ClienteRegistration;
