import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Form,
  Pagination,
  Alert,
} from "react-bootstrap";
import { getBooks } from "../api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [allBooksData, setAllBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async (page) => {
      try {
        const response = await getBooks(page);
        if (response.data && Array.isArray(response.data.data)) {
          setBooks(response.data.data);
          setAllBooks(response.data.data);
          setAllBooksData(response.data.pagination.total_records);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setBooks(allBooks);
      setSearchResults([]);
      return;
    }

    const filteredBooks = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(value) ||
        book.author.first_name.toLowerCase().includes(value) ||
        book.author.last_name.toLowerCase().includes(value)
    );

    setSearchResults(filteredBooks);
    setBooks(filteredBooks);
  };

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

  return (
    <Container>
      <h2 className="mt-4">Książki</h2>
      <Form className="my-4">
        <Form.Control
          type="text"
          placeholder="Wyszukaj książki lub autora"
          value={searchTerm}
          onChange={handleSearch}
        />
        <br></br>
        <h6>Wyszukanych: {searchResults.length}</h6>
      </Form>
      <Button variant="primary" onClick={() => navigate("/add-book")}>
        Dodaj książkę
      </Button>
      <Button variant="primary" onClick={() => navigate("/add-author")}>
        Dodaj autora
      </Button>
      {searchTerm && searchResults.length === 0 ? (
        <Alert variant="warning" className="mt-4">
          Nie znaleziono książek ani autorów o podanym kryterium.
        </Alert>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Id</th>
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
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    K
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => navigate(`/authors/${book.author.id}`)}
                  >
                    A
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h6>Wszystkich: {allBooksData}</h6>
      {renderPagination()}
      <Button variant="primary" onClick={() => navigate("/dashboard")}>
        Powrót
      </Button>
    </Container>
  );
};

export default Books;
