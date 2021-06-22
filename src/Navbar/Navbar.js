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
import Logout from "../Components/Logout/Logout";

function NavbarPage() {
  return (
    <div className="nav_fixed">
      <Navbar
        className="navik justify-content-between"
        // style={{ backgroundColor: " #f1f1f1" }}
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <Nav>
              <div style={{ padding: "10px" }}>
                <NavLink
                  to="/pools"
                  className="navlink"
                  activeClassName="activeclass"
                >
                  Ավազաններ
                </NavLink>
              </div>

              <div style={{ padding: "10px" }}>
                <NavLink
                  to="/information/partners"
                  className="navlink"
                  activeClassName="activeclass"
                >
                  Տեղեկություններ
                </NavLink>
              </div>

              <div style={{ padding: "10px" }}>
                <NavLink
                  to="/feeding"
                  className="navlink"
                  activeClassName="activeclass"
                >
                  Կերակրում և կորուստ
                </NavLink>
              </div>

              <div style={{ padding: "10px" }}>
                <NavLink
                  to="/reports"
                  className="navlink"
                  activeClassName="activeclass"
                >
                  Հաշվետվություններ
                </NavLink>
              </div>
              <div style={{ padding: "10px" }}>
                <NavLink
                  to="/report/feeding-move-history"
                  className="navlink"
                  activeClassName="activeclass"
                >
                  Պատմություն
                </NavLink>
              </div>
            </Nav>
          </Form>
          {/* <Form inline> */}
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button className="mr-sm-2">Ելք</Button> */}
          <div className="logout">
            <Logout />
          </div>
          {/* </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
