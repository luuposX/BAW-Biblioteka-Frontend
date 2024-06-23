import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Alert,
  ListGroup,
  Form,
} from "react-bootstrap";
import { getAuthor, deleteAuthor, getAuthorBooks, updateAuthor } from "../api";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedAuthor, setUpdatedAuthor] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await getAuthor(authorId);
        setAuthor(response.data.data);
        setUpdatedAuthor({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          birth_date: response.data.data.birth_date,
        });
      } catch (error) {
        setError("Błąd podczas pobierania szczegółów autora");
        console.error("Error fetching author details:", error);
      }
    };

    const fetchAuthorBooks = async () => {
      try {
        const response = await getAuthorBooks(authorId);
        setBooks(response.data.data);
      } catch (error) {
        setError("Błąd podczas pobierania książek autora");
        console.error("Error fetching author books:", error);
      }
    };

    fetchAuthorDetails();
    fetchAuthorBooks();
  }, [authorId]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Czy na pewno chcesz usunąć tego autora?")) {
      try {
        await deleteAuthor(authorId, token);
        setSuccessMessage("Autor został pomyślnie usunięty");
        setTimeout(() => navigate("/books"), 2000);
      } catch (error) {
        setError("Błąd podczas usuwania autora");
        console.error("Error deleting author:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAuthor({ ...updatedAuthor, [name]: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await updateAuthor(authorId, updatedAuthor, token);
      setSuccessMessage("Dane autora zostały pomyślnie zaktualizowane");
      setEditMode(false);
      setAuthor(updatedAuthor);
    } catch (error) {
      setError("Błąd podczas aktualizacji danych autora");
      console.error("Error updating author details:", error);
    }
  };

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!author) {
    return (
      <Container>
        <p>Ładowanie...</p>
      </Container>
    );
  }

  return (
    <Container>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {editMode ? (
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>Imię</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={updatedAuthor.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={updatedAuthor.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="birthDate">
            <Form.Label>Data urodzenia</Form.Label>
            <Form.Control
              type="date"
              name="birth_date"
              value={updatedAuthor.birth_date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdate} className="mt-3">
            Zapisz zmiany
          </Button>
          <Button
            variant="secondary"
            onClick={() => setEditMode(false)}
            className="mt-3 ms-2"
          >
            Anuluj
          </Button>
        </Form>
      ) : (
        <>
          <h3 className="mt-4">Szczegóły autora</h3>
          <Card>
            <Card.Body>
              <Card.Title>
                {author.first_name} {author.last_name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Data urodzenia: {author.birth_date}
              </Card.Subtitle>

              <Button variant="primary" onClick={() => navigate("/dashboard")}>
                Powrót
              </Button>

              <Button variant="danger" onClick={handleDelete} className="ms-2">
                Usuń autora
              </Button>
              <Button
                variant="info"
                className="ms-2"
                onClick={() => setEditMode(true)}
              >
                Edytuj
              </Button>
            </Card.Body>
          </Card>
          <h3 className="mt-4">Książki autora</h3>
          {books.length > 0 ? (
            <ListGroup>
              {books.map((book) => (
                <ListGroup.Item key={book.id}>{book.title}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Autor nie ma żadnych książek.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default AuthorDetails;
