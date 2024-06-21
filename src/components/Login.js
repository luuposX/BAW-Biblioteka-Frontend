import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { login } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log("Login successful:", response.data);
      // Zapisz token do localStorage lub state aplikacji
    } catch (error) {
      setError("Nieprawidłowe dane");
    }
  };

  return (
    <Container>
      <h2 className="my-4">Logowanie</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nazwa użytkownika:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Hasło:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit" className="mt-3">
          Zaloguj się
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
