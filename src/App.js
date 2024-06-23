import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Books from "./components/Books";
import Account from "./components/Account";
import Register from "./components/Register";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import BookDetails from "./components/BookDetails";
import AuthorDetails from "./components/AuthorDetails";
import Authors from "./components/Authors";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/auth/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/books"
          element={isAuthenticated ? <Books /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/authors"
          element={
            isAuthenticated ? <Authors /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/account"
          element={
            isAuthenticated ? <Account /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/add-book"
          element={
            isAuthenticated ? <AddBook /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/add-author"
          element={
            isAuthenticated ? <AddAuthor /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/books/:bookId"
          element={
            isAuthenticated ? <BookDetails /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/authors/:authorId"
          element={
            isAuthenticated ? <AuthorDetails /> : <Navigate to="/auth/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
