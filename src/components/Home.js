import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/auth/login");
  };

  const goToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <Container className="text-center my-5">
      <h1>Witamy w Bibliotece</h1>
      <p>Proszę zalogować się lub zarejestrować, aby kontynuować</p>
      <Button variant="primary" onClick={goToLogin} className="m-2">
        Zaloguj się
      </Button>
      <Button variant="secondary" onClick={goToRegister} className="m-2">
        Zarejestruj się
      </Button>
    </Container>
  );
};

export default Home;
