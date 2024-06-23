import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { createAuthor } from "../api";

const AddAuthor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const authorData = {
      first_name: firstName,
      last_name: lastName,
      birth_date: formatDate(birthDate),
    };

    try {
      await createAuthor(authorData, token);
      setSuccess("Autor został dodany pomyślnie");
      setFirstName("");
      setLastName("");
      setBirthDate("");
    } catch (error) {
      setError("Błąd podczas dodawania autora");
    }
  };

  return (
    <Container>
      <h2>Dodaj nowego autora</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>Imię:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Nazwisko:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthDate">
          <Form.Label>Data urodzenia:</Form.Label>
          <Form.Control
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Dodaj autora
        </Button>
      </Form>
    </Container>
  );
};

export default AddAuthor;
