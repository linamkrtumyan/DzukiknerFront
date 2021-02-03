import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DzukContext } from "../../Pages/Partners";
import "./partner.css";

function UpdatePartner({ data }) {
  const dzukik = useContext(DzukContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);
    setPhone(data.phone);
  };

  useEffect(() => {
    setId(data.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    if (name == "") {
      setError("form-control is-invalid ");
    } else {
      axios
        .post(`/info/partner/updatePartner`, {
          id,
          name,
          description,
          phone,
        })
        .then((response) => {
          if (response.data.success) {
            const partner = {
              id: id,
              name: name,
              description: description,
              phone: phone,
            };
            dzukik.updatePartner(partner);
            handleClose();
            toast.success("Կատարված է");
          } else {
            toast.error(response.data.errorMessage);
            handleClose();
          }
        })
        .catch((e) => {
          console.log("error");
          toast.error("Կատարված չէ");
          handleClose();
        });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        <img
          className="partner_icon editik"
          src={require("../../img/pencil.svg").default}
        />
      </div>

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
              className={error}
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
            <br />
            <Form.Label>Հեռախոսահամար</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
    </>
  );
}

export default UpdatePartner;
