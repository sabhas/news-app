import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

const Bar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">News App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Bar
