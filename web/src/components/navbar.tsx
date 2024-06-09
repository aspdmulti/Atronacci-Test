"use client";
import { functionLogout } from "@/redux/slices/userSlice";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

interface User {
  email: string;
  name: string;
  membership: string;
}
interface RootState {
  auth: User;
}
function NavbarComponent() {
  const userSelector = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
  };
  if (userSelector.email) {
    return (
      <Navbar bg="secondary" expand="lg" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo-navbar.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Contents">
                <NavDropdown.Item href="/content/article">
                  Articles
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Videos</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/membership">Membership</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Signed in as: {userSelector.name}</Navbar.Text>
            <Button onClick={logout} className="mx-3" variant="danger">
              Sign Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarComponent;
