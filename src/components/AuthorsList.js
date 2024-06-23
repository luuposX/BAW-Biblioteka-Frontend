import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/authors"; // Endpoint do listy autorów

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data); // Sprawdź, co otrzymujesz w odpowiedzi
        setAuthors(response.data.data); // Ustaw listę autorów ze stanu odpowiedzi
        setLoading(false); // Ustaw loading na false, gdy dane są załadowane
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false); // Ustaw loading na false w przypadku błędu
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <p>Ładowanie...</p>; // Możesz również dodać spinner lub inny komponent ładowania
  }

  return (
    <div>
      <h2>Lista Autorów</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <strong>{author.first_name}</strong> - {author.birth_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
