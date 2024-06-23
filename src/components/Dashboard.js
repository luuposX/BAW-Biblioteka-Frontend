import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getCurrentUser } from "../api"; // Importuj funkcję getCurrentUser

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser(token);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        // handle error, possibly navigate to login
      }
    };

    if (token) {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="center">
        <Col sm="5" className="main-menu">
          <h2 className="my-4">Witaj {user.data.username}!</h2>
          <Button
            variant="primary"
            className="m-2 btn-wide"
            onClick={() => navigate("/books")}
          >
            Książki
          </Button>
          <Button
            variant="primary"
            className="m-2 btn-wide"
            onClick={() => navigate("/authors")}
          >
            Autorzy
          </Button>
          <Button
            variant="primary"
            className="m-2 btn-wide"
            onClick={() => navigate("/account")}
          >
            Moje konto
          </Button>
          <Button
            variant="danger"
            className="m-2 btn-wide"
            onClick={handleLogout}
          >
            Wyloguj
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
