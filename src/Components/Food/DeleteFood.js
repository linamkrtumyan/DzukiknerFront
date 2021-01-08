import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FoodContext } from "../../Pages/Foods";

function DeleteFood({ data }) {
  const foods = useContext(FoodContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(data.id);
  });

  //   console.log(data);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    axios
      .post(`/info/food/deleteFood`, { id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          foods.deleteFood(id);
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

export default DeleteFood;
