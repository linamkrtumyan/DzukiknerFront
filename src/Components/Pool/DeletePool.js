import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { PoolContext } from "../../Pages/PoolPage";
import { toast } from "react-toastify";

function DeletePool({ data1 }) {
  // console.log(data1);
  const pool = useContext(PoolContext);

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
        if (response.data.success) {
          pool.deletePool(id);
          toast.success("Կատարված է");
        } else {
          toast.error("Կատարված չէ");
        }
      })
      .catch((e) => {
        console.log("error");
        toast.error("Կատարված չէ");
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
