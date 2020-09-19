import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import './style.scss';
import minaLogo from '../../assets/images/minacademyLogo.svg';
import notification from '../../assets/images/notification.svg'
import Button from '../Button';
import '../../index.css';
import { Link } from 'react-router-dom';


function Header() {
  const [user, setUser] = useState(true)
  return (
    <>
      <Navbar bg="white" expand="md">
        <Navbar.Brand href="/"><img className="logo" src={minaLogo} alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user ? (<>
              <Nav.Link href="/tutorial">Tutorial</Nav.Link>
              <Nav.Link href="/">Ranking</Nav.Link>
              <Nav.Link href="/">Fórum</Nav.Link>
              <Nav.Link href="/">Dashboard</Nav.Link>
            </>
            ) :
              (<>
                <Nav.Link href="/tutorial">Cursos</Nav.Link>
                <Nav.Link href="/">Como funciona</Nav.Link>
                <Nav.Link href="/">A Iniciativa Minacademy</Nav.Link>
              </>
              )}
          </Nav>
        </Navbar.Collapse>
        <Link to="/login/" className="login-button">
          Entrar
        </Link>
      </Navbar>
    </>

  );
}

export default Header;