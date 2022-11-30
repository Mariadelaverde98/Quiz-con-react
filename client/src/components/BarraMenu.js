import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Inicio.css";

function BarraMenu(props) {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">NaviQuiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {props.vista(true)}}>Inicio</Nav.Link>
            <Nav.Link onClick={() => {props.vista(false)}}>Resultados</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraMenu;