import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function DeletePool({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   console.log(data);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`/pools/inPool`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error");
      });
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <div onClick={handleShow}>Ջնջել</div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ջնջել Ավազանը</Modal.Title>
        </Modal.Header>
        <Modal.Body>Համոզված եք</Modal.Body>
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

export default DeletePool;
