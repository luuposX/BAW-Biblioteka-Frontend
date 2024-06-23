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
import { getAuthors } from "../api";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsData, setAllAuthorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async (page) => {
      try {
        const response = await getAuthors(page);
        if (response.data && Array.isArray(response.data.data)) {
          setAuthors(response.data.data);
          setAllAuthors(response.data.data);
          setAllAuthorsData(response.data.pagination.total_records);
          setTotalPages(response.data.pagination.total_pages);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setAuthors(allAuthors);
      setSearchResults([]);
      return;
    }

    const filteredAuthors = allAuthors.filter(
      (author) =>
        author.first_name.toLowerCase().includes(value) ||
        author.last_name.toLowerCase().includes(value)
    );

    setSearchResults(filteredAuthors);
    setAuthors(filteredAuthors);
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
      <h2 className="mt-4">Autorzy</h2>
      <Form className="my-4">
        <Form.Control
          type="text"
          placeholder="Wyszukaj autorów"
          value={searchTerm}
          onChange={handleSearch}
        />
        <br />
        <h6>Znalezionych: {searchResults.length}</h6>
      </Form>
      <Button variant="primary" onClick={() => navigate("/add-author")}>
        Dodaj autora
      </Button>
      {searchTerm && searchResults.length === 0 ? (
        <Alert variant="warning" className="mt-4">
          Nie znaleziono autorów o podanym kryterium.
        </Alert>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th className="table-short">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.first_name}</td>
                <td>{author.last_name}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => navigate(`/authors/${author.id}`)}
                  >
                    Szczegóły
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h6>Wszystkich: {allAuthorsData}</h6>
      {renderPagination()}
      <Button variant="primary" onClick={() => navigate("/dashboard")}>
        Powrót
      </Button>
    </Container>
  );
};

export default Authors;
