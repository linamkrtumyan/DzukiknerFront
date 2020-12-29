import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

function Header() {
  return (
    <div>
      <Navbar
        style={{
          marginLeft: "160px",
          height: "60px",
          //   backgroundImage: "linear-gradient(to right,#b6edec, #3973b8)",
          backgroundColor: "#F1F1F1",
        }}
        variant="light"
      >
        <Navbar.Brand className="header_head" href="#home"></Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="" className="mr-sm-2" /> */}
          {/* <Button variant="outline-primary">Փնտրել</Button> */}
        </Form>
      </Navbar>
    </div>
  );
}

export default Header;
