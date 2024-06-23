import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { getBook, deleteBook } from "../api";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(bookId);
        setBook(response.data.data); // Adjust this line based on your API response structure
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetails;
