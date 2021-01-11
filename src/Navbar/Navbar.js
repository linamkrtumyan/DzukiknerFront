import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

function NavbarPage() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link>
              <Link to="/pools">Ավազաններ</Link>
            </Nav.Link>
            <Nav.Link>Գործառնություններ</Nav.Link>
            <NavDropdown title="Տեղեկություններ" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/partners">Գործընկերներ</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/fishes">Ձկան տեսակ</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/foods">Կերի տեսակ</Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#link">Կերակրում և կորուստ</Nav.Link>
            <Nav.Link href="#link"> Հաշվետվություններ</Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
