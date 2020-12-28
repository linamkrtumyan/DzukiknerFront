import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateFood({ data }) {
  //   console.log(data);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [number, setNumber] = useState(data.number);
  const [weight, setWeight] = useState(data.weight);
  const [coefficient, setCoefficient] = useState(data.coefficient);

  console.log(id, name, number, weight, coefficient);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(id, name, number, weight, coefficient);
    // { id, name, description, phone }
    axios
      .post(`/info/food/updateFood`, {
        id,
        name,
        number,
        weight,
        coefficient,
      })
      .then((response) => {
        console.log(response);
      });
    window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Խմբագրել
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              id="fishCount"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <Form.Label>Coefficient</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={coefficient}
              onChange={(e) => setCoefficient(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateFood;
