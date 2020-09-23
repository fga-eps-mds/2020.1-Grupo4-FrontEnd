import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser, setCurrentUser } from '../../slices/usersSlice'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './style.scss';
import minaLogo from '../../assets/images/minacademyLogo.svg';
import notification from '../../assets/images/notification.svg'
import Button from '../Button';
import '../../index.css';
import api from '../../services/api'
import { logout } from '../../services/usersService';

function Header({ currentUser }) {
  return (
    <>
      <Navbar bg="white" expand="md">
        <Navbar.Brand href="/"><img className="logo" src={minaLogo} alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {currentUser ? (<>
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
        {currentUser ? (
          <>
            <div href="/"><img className="notification" src={notification} alt="logo" /></div>
            <NavDropdown title={currentUser.name}>
              <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="/">Certificados</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </>
        )
          : (
            <Button inverted color small>
              Entrar
            </Button>
          )}
      </Navbar>
    </>

  );

}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps)(Header);