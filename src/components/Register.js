import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, email, password });
      console.log("Registration successful:", response.data);
      // Zapisz token do localStorage lub state aplikacji
    } catch (error) {
      setError("Rejestracja nieudana");
    }
  };

  return (
    <Container>
      <h2 className="my-4">Rejestracja</h2>
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
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Hasło:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="min 6 znaków"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit" className="mt-3">
          Zarejestruj się
        </Button>
        <br></br>
        <br></br>
        <span>
          Masz już konto?{" "}
          <span className="link" onClick={() => navigate("/auth/login")}>
            Zaloguj się!
          </span>
        </span>
      </Form>
    </Container>
  );
};

export default Register;
