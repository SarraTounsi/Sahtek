import { Navbar, Container,Nav} from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom';
const Header = ()=>{
    return (
      
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Sahtek</Navbar.Brand>
          
          <Nav className="me-auto">
          <Nav.Link as={Link} to="register" className="mr-15">
            Inscription
          </Nav.Link>
          <Nav.Link as={Link} to="login">Connexion</Nav.Link>
            <Nav.Link as={Link} to="profile" className="mr-15">
            Profil
          </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       
    );
}

export default Header;