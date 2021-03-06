import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function UpdateFood({ data }) {
  const foods = useContext(FoodContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [weight, setWeight] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setName(data.name);
    setNumber(data.number);
    setWeight(data.weight);
  };

  useEffect(() => {
    setId(data.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .post(`/info/food/updateFood`, {
        id,
        name,
        number,
        weight,
      })

      .then((response) => {
        if (response.data.success) {
          const food = {
            id: id,
            name: name,
            number: number,
            weight: weight,
          };
          foods.updateFood(food);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        toast.error("Կատարված չէ");
      });
  };

  return (
    <>
      <div
        variant="primary"
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        <img
          className="partner_icon"
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
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Համար</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ (կգ)</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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

export default UpdateFood;
