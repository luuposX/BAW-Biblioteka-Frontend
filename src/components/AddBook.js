import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { createBook } from "../api";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const bookData = {
      title,
      isbn: parseInt(isbn),
      number_of_pages: parseInt(numberOfPages),
      description,
    };

    try {
      await createBook(authorId, bookData, token);
      setSuccess("Książka została dodana pomyślnie");
      setTitle("");
      setIsbn("");
      setNumberOfPages("");
      setDescription("");
      setAuthorId("");
    } catch (error) {
      setError("Błąd podczas dodawania książki");
    }
  };

  return (
    <Container>
      <h2>Dodaj nową książkę</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tytuł:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN:</Form.Label>
          <Form.Control
            type="number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNumberOfPages">
          <Form.Label>Liczba stron:</Form.Label>
          <Form.Control
            type="number"
            value={numberOfPages}
            onChange={(e) => setNumberOfPages(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Opis:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthorId">
          <Form.Label>ID autora:</Form.Label>
          <Form.Control
            type="number"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Dodaj książkę
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook;
