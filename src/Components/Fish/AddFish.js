import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function AddFish() {
  // name, height, width, maxweight

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setHeight] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(name, description);
    axios
      .post(`/info/fish/addFish`, {
        name,
        description,
      })
      .then((response) => {
        console.log(response);
      });
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <div
      style={{
        // width: "18rem",
        marginLeft: "10px",
        marginTop: "30px",
        bottom: "30px",
        marginBottom: "30px",
      }}
    >
      <Button variant="primary" onClick={handleShow}>
        Ավելացնել ձուկիկ
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել ձուկիկ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setHeight(e.target.value)}
            />
            <br />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            // onClick={handleClose}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddFish;
