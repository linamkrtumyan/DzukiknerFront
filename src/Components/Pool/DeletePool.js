import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function DeletePool({ data1 }) {
  // console.log(data1);

  const [show, setShow] = useState(false);
  const [id, setId] = useState(data1.id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   console.log(data);

  const handleSubmit = (evt) => {
    console.log(id);
    axios
      .post(`/pools/deletePool`, { id })
      .then((response) => {
        // console.log("resp");
        console.log(response);
      })
      .catch((e) => {
        console.log("error");
      });
    // console.log("object");
    // window.location.reload(false);
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

export default DeletePool;
