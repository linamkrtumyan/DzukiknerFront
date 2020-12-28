import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateFish({ data }) {
  //   console.log(data);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  //   console.log(id, name, description, phone);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(id, name, description);
    // { id, name, description, phone }
    axios
      .post(`/info/fish/updateFish`, {
        id,
        name,
        description,
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
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              id="fishCount"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default UpdateFish;
