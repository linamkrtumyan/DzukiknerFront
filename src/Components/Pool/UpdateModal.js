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
    evt.preventDefault();
    console.log(id, name, height, width, maxweight);
    axios
      .put(`/pools/updatePool`, {
        id,
        name,
        height,
        width,
        maxweight,
      })
      .then((response) => {
        console.log(response);
      });
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
            <Form.Label>Ավազան</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Տեսակ</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={height}
              id="fishCount"
              onChange={(e) => setfishQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Քանակ</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={width}
              onChange={(e) => setfishWeight(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ</Form.Label>
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
            onClick={handleSubmit}
            //  onClick={handleClose}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
