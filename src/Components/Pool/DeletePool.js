import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { PoolContext } from "../../Pages/PoolPage";
import { toast } from "react-toastify";

function DeletePool({ data1, data }) {
  // console.log(data1);
  const pool = useContext(PoolContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState(data1.id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setId(data1.id);
  });

  console.log(data1.id);

  const handleSubmit = (evt) => {
    console.log(id, "bar");
    console.log(data1, "data1y deleteic");
    console.log(data, "datan deleteic");
    axios
      .post(`/pools/deletePool`, { id })
      .then((response) => {
        // console.log("resp");
        console.log(response.data.success);
        if (response.data.success == 1) {
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
