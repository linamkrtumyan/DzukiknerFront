import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FishContext } from "../../Pages/Fishes";

function DeleteFish({ data }) {
  const fishes = useContext(FishContext);
  const [show, setShow] = useState(false);
  const [id, setData] = useState(data.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   console.log(data);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    axios
      .post(`/info/fish/deleteFish`, { id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          fishes.deleteFish(id);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
      });
  };

  return (
    <>
      <Button style={{ marginLeft: "5px" }} onClick={handleShow}>
        ✖
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ջնջել ձուկ</Modal.Title>
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

export default DeleteFish;
