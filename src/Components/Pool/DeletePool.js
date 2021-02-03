import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { PoolContext } from "../../Pages/PoolPage";
import { toast } from "react-toastify";

function DeletePool({ data1, data }) {
  const pool = useContext(PoolContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState(data1.id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setId(data1.id);
  });

  const handleSubmit = (evt) => {
    axios
      .post(`/pools/deletePool`, { id })
      .then((response) => {
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
  };

  return (
    <>
      <div className="pool_dropdown_item" onClick={handleShow}>
        Ջնջել
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header>
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
