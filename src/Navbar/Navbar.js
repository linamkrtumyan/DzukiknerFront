import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./navbar.css";

function NavbarPage() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link>
              <NavLink
                to="/pools"
                className="navlink"
                activeClassName="activeclass"
              >
                Ավազաններ
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/operations"
                className="navlink"
                activeClassName="activeclass"
              >
                Գործառնություններ
              </NavLink>{" "}
            </Nav.Link>
            <NavDropdown
              className="navlink"
              title="Տեղեկություններ"
              id="basic-nav-dropdown"
            >
              <div>
                <NavDropdown.Item>
                  <Link to="/partners">Գործընկերներ</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/fishes">Ձկան տեսակ</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/foods">Կերի տեսակ</Link>
                </NavDropdown.Item>
              </div>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link>
              {" "}
              <NavLink
                to="/feedingandlosses"
                className="navlink"
                activeClassName="activeclass"
              >
                Կերակրում և կորուստ
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                to="/reports"
                className="navlink"
                activeClassName="activeclass"
              >
                Հաշվետվություններ
              </NavLink>
            </Nav.Link>
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
