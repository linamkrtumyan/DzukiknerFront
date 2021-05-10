import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
toast.configure();
function AddFood() {
  const food = useContext(FoodContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [weight, setWeight] = useState(null);

  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    if (name == "") {
      setError("form-control is-invalid ");
    } else {
      axios
        .post(`/info/food/addFood`, {
          name,
          number,
          weight,
        })
        .then((response) => {
          if (response.data.success) {
            const food1 = {
              name: name,
              number: number,
              weight: weight,
            };
            handleClose();
            food.addFood(food1);
            toast.success("Կատարված է");
          } else {
            handleClose();
            toast.error(response.data.errorMessage);
          }
        })
        .catch((e) => {
          handleClose();
          toast.error("Կատարված չէ");
        });
    }
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
              className={error}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Համար</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
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

export default AddFood;
