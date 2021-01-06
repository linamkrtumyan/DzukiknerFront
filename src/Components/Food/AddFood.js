import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";

function AddFood() {
  // name, height, width, maxweight
  const food = useContext(FoodContext);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [coefficient, setCoefficient] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(name, number, weight, coefficient);
    axios
      .post(`/info/food/addFood`, {
        name,
        number,
        weight,
        coefficient,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const food1 = {
            name: name,
            number: number,
            weight: weight,
            coefficient: coefficient,
          };
          food.addFood(food1);
          toast.success("foody avelacav");
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
    <div>
      <Button variant="primary" onClick={handleShow}>
        Ավելացնել
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել կեր</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Համար</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <Form.Label>Գործակից</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setCoefficient(e.target.value)}
            />
            <br />
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
    </div>
  );
}

export default AddFood;
