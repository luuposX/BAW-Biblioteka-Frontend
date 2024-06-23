import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUserData, updateUserPassword } from "../api";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Account = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.data);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Pobierz token z localStorage
    try {
      const response = await updateUserData({ username, email }, token);
      setUser(response.data.data);
      setMessage("Dane zostały zaktualizowane");
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("Wystąpił błąd podczas aktualizacji danych");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Pobierz token z localStorage
    try {
      await updateUserPassword(
        { current_password: currentPassword, new_password: newPassword },
        token
      );
      setMessage("Hasło zostało zaktualizowane");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Wystąpił błąd podczas aktualizacji hasła");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <Container>
      <h2 className="my-4">Moje konto</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleUpdateData}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nazwa użytkownika:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Zaktualizuj dane
        </Button>
      </Form>
      <Form onSubmit={handleUpdatePassword} className="mt-4">
        <Form.Group controlId="formCurrentPassword">
          <Form.Label>Obecne hasło:</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword">
          <Form.Label>Nowe hasło:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Zaktualizuj hasło
        </Button>
      </Form>
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => navigate("/dashboard")}
      >
        Powrót
      </Button>
      <Button variant="danger" onClick={handleLogout} className="mt-4">
        Wyloguj
      </Button>
    </Container>
  );
};

export default Account;
