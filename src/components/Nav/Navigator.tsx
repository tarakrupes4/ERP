import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./../SideBar/SideBar.css"

function Navigator() {
  return (
    <>
      <Navbar className='nav' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/inward">Inward Details</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigator;