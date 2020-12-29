import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateModal({ data1 }) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(data1.id);
  const [name, setName] = useState(data1.name);
  const [height, setfishQuantity] = useState(data1.height);
  const [width, setfishWeight] = useState(data1.width);
  const [maxweight, setfishType] = useState(data1.maxweight);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(id, name, height, width, maxweight);
    axios
      .post(`/pools/updatePool`, {
        id,
        name,
        height,
        width,
        maxweight,
      })
      .then((response) => {
        console.log(response);
        data1.name = name;
      });
    // window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <div variant="primary" onClick={handleShow}>
        Խմբագրել
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Բարձրություն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={height}
              id="fishCount"
              onChange={(e) => setfishQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Լայնություն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={width}
              onChange={(e) => setfishWeight(e.target.value)}
            />
            <br />
            <Form.Label>Առավելագույն քաշ</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={maxweight}
              onChange={(e) => setfishType(e.target.value)}
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

export default UpdateModal;
