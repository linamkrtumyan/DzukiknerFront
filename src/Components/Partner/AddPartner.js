import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DzukContext } from "../../Pages/Partners";
import "./partner.css";
toast.configure();

function AddPartner() {
  const dzukik = useContext(DzukContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setHeight] = useState(null);
  const [phone, setWidth] = useState(null);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    if (name == "") {
      setError("form-control is-invalid ");
    } else {
      setError("");
      axios
        .post(`/info/partner/addPartner`, {
          name,
          description,
          phone,
        })
        .then((response) => {
          if (response.data.success) {
            const dzuk = {
              id: response.data.id,
              name: name,
              description: description,
              phone: phone,
            };

            dzukik.addDzuk(dzuk);
            handleClose();
            toast.success("Կատարված է");
          } else {
            toast.error(response.data.errorMessage);
          }
        })
        .catch((e) => {
          console.log("error");
          toast.error("Կատարված չէ");
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="primary" onClick={handleShow}>
        Ավելացնել
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել գործընկեր</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className={error}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setHeight(e.target.value)}
            />
            <br />
            <Form.Label>Հեռախոսահամար</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setWidth(e.target.value)}
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
              // handleClose();
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPartner;
