import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert, Form } from "react-bootstrap";
import { getBook, deleteBook, updateBook } from "../api";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    isbn: "",
    number_of_pages: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(bookId);
        setBook(response.data.data); // Ustawienie danych książki na podstawie odpowiedzi API
        setUpdatedBook({
          title: response.data.data.title,
          isbn: response.data.data.isbn,
          number_of_pages: response.data.data.number_of_pages,
          description: response.data.data.description,
        });
      } catch (error) {
        setError("Błąd podczas pobierania szczegółów książki");
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Czy na pewno chcesz usunąć tę książkę?")) {
      try {
        await deleteBook(bookId, token);
        setSuccessMessage("Książka została pomyślnie usunięta");
        setTimeout(() => navigate("/books"), 2000);
      } catch (error) {
        setError("Błąd podczas usuwania książki");
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await updateBook(bookId, updatedBook, token);
      setSuccessMessage("Dane książki zostały pomyślnie zaktualizowane");

      // Opcjonalnie: Pobierz zaktualizowaną książkę i ustaw ją w stanie
      await fetchBook(); // Wywołanie funkcji fetchBook do pobrania najnowszych danych książki
    } catch (error) {
      setError("Błąd podczas aktualizacji danych książki");
      console.error("Error updating book details:", error);
    }
  };

  const fetchBook = async () => {
    try {
      const response = await getBook(bookId);
      setBook(response.data.data); // Ustawienie danych książki na podstawie odpowiedzi API
    } catch (error) {
      setError("Błąd podczas pobierania szczegółów książki");
      console.error("Error fetching book details:", error);
    }
  };

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!book) {
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
          <Form.Group controlId="title">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedBook.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={updatedBook.isbn}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="number_of_pages">
            <Form.Label>Liczba stron</Form.Label>
            <Form.Control
              type="number"
              name="number_of_pages"
              value={updatedBook.number_of_pages}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={updatedBook.description}
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
          <Button
            variant="primary"
            onClick={() => setEditMode(false)}
            className="mt-3 ms-2"
          >
            Powrót
          </Button>
        </Form>
      ) : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Autor:{" "}
                {book.author
                  ? `${book.author.first_name} ${book.author.last_name}`
                  : "Nieznany"}
              </Card.Subtitle>
              <Card.Text>
                <strong>ISBN:</strong> {book.isbn}
              </Card.Text>
              <Card.Text>
                <strong>Liczba stron:</strong> {book.number_of_pages}
              </Card.Text>
              <Card.Text>
                <strong>Opis:</strong> {book.description}
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/books")}>
                Powrót
              </Button>
              <Button variant="danger" onClick={handleDelete} className="ms-2">
                Usuń książkę
              </Button>
              <Button
                variant="info"
                onClick={() => setEditMode(true)}
                className="ms-2"
              >
                Edytuj
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default BookDetails;
