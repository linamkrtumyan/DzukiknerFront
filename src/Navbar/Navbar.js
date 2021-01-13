import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./navbar.css";

function NavbarPage() {
  return (
    <div>
      <Navbar style={{ backgroundColor: "white" }} expand="lg">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {/* <Nav.Link> */}
            <div style={{ padding: "10px" }}>
              <NavLink
                to="/pools"
                className="navlink"
                activeClassName="activeclass"
              >
                Ավազաններ
              </NavLink>
            </div>
            {/* </Nav.Link> */}
            {/* <Nav.Link> */}
            <div style={{ padding: "10px" }}>
              <NavLink
                to="/operations"
                className="navlink"
                activeClassName="activeclass"
              >
                Գործառնություններ
              </NavLink>{" "}
            </div>
            {/* </Nav.Link> */}
            <NavDropdown
              className="navlink"
              title="Տեղեկություններ"
              id="basic-nav-dropdown"
              style={{ padding: "2px" }}
            >
              <div>
                <Dropdown.Item>
                  <Link to="/partners">Գործընկերներ</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/fishes">Ձկան տեսակ</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/foods">Կերի տեսակ</Link>
                </Dropdown.Item>
              </div>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link> */}{" "}
            <div style={{ padding: "10px" }}>
              <NavLink
                to="/feedingandlosses"
                className="navlink"
                activeClassName="activeclass"
              >
                Կերակրում և կորուստ
              </NavLink>
            </div>
            {/* </Nav.Link> */}
            {/* <Nav.Link> */}{" "}
            <div style={{ padding: "10px" }}>
              <NavLink
                to="/reports"
                className="navlink"
                activeClassName="activeclass"
              >
                Հաշվետվություններ
              </NavLink>
            </div>
            {/* </Nav.Link> */}
          </Nav>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            {/* <Button className="mr-sm-2">Ելք</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
