import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateFood({ data }) {
  const foods = useContext(FoodContext);
  //   console.log(data);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [number, setNumber] = useState(data.number);
  const [weight, setWeight] = useState(data.weight);
  const [coefficient, setCoefficient] = useState(data.coefficient);

  // console.log(id, name, number, weight, coefficient);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    console.log(id, name, number, weight, coefficient);
    // { id, name, description, phone }
    axios
      .post(`/info/food/updateFood`, {
        id,
        name,
        number,
        weight,
        coefficient,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const food = {
            id: id,
            name: name,
            number: number,
            weight: weight,
            coefficient: coefficient,
          };
          foods.updateFood(food);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
        toast.error("Կատարված չէ");
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ✎
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              id="fishCount"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <Form.Label>Coefficient</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={coefficient}
              onChange={(e) => setCoefficient(e.target.value)}
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
