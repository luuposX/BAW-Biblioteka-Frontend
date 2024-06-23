import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Pagination } from "react-bootstrap";
import { getBooks } from "../api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async (page) => {
      try {
        const response = await getBooks(page);
        if (response.data && Array.isArray(response.data.data)) {
          setBooks(response.data.data);
          setTotalPages(response.data.pagination.total_pages);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  const handleViewDetails = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

  return (
    <Container>
      <h2>Książki</h2>
      <Button variant="primary" onClick={() => navigate("/add-book")}>
        Dodaj książkę
      </Button>
      <Button variant="primary" onClick={() => navigate("/add-author")}>
        Dodaj autora
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-short">Id</th>
            <th>Tytuł</th>
            <th>Autor</th>
            <th className="table-short">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{`${book.author.first_name} ${book.author.last_name}`}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(book.id)}
                >
                  O
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {renderPagination()}
      <Button variant="primary" onClick={() => navigate("/dashboard")}>
        Powrót
      </Button>
    </Container>
  );
};

export default Books;
