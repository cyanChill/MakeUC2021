import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import app_logo from "../assets/app_logo.svg";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={app_logo} height="30" alt="App Logo" className="d-inline-block align-center" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {AuthProfile()}
          </Nav>
          {AuthNav()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav>
      <Button as={Link} variant="warning" to="/form" className="m-1" style={{ color: "black" }}>
        Organize an Event
      </Button>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

const AuthProfile = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Nav.Link as={Link} to="/profile">
      Profile
    </Nav.Link>
  ) : null;
};

export default NavBar;
