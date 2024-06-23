import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1"; // Upewnij się, że URL jest poprawny

// Funkcje dla użytkowników
export const register = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCurrentUser = (token) => {
  return axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserPassword = (passwordData, token) => {
  return axios.put(`${API_URL}/auth/update/password`, passwordData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserData = (userData, token) => {
  return axios.put(`${API_URL}/auth/update/data`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Funkcje dla książek
export const getBooks = (page) => {
  return axios.get(`${API_URL}/books?page=${page}`);
};

export const getBook = (bookId) => {
  return axios.get(`${API_URL}/books/${bookId}`);
};

export const createBook = (authorId, bookData, token) => {
  return axios.post(`${API_URL}/authors/${authorId}/books`, bookData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBook = (bookId, bookData, token) => {
  return axios.put(`${API_URL}/books/${bookId}`, bookData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBook = (bookId, token) => {
  return axios.delete(`${API_URL}/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAuthorBooks = (authorId) => {
  return axios.get(`${API_URL}/authors/${authorId}/books`);
};

// Funkcje dla autorów
export const getAuthors = (page) => {
  return axios.get(`${API_URL}/authors?page=${page}`);
};

export const getAuthor = (authorId) => {
  return axios.get(`${API_URL}/authors/${authorId}`);
};

export const createAuthor = (authorData, token) => {
  return axios.post(`${API_URL}/authors`, authorData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAuthor = (authorId, authorData, token) => {
  return axios.put(`${API_URL}/authors/${authorId}`, authorData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAuthor = (authorId, token) => {
  return axios.delete(`${API_URL}/authors/${authorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
