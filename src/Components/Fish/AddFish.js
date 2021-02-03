import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FishContext } from "../../Pages/Fishes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function AddFish() {
  const fish = useContext(FishContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setHeight] = useState(null);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    if (name == "") {
      setError("form-control is-invalid ");
    } else {
      axios
        .post(`/info/fish/addFish`, {
          name,
          description,
        })
        .then((response) => {
          if (response.data.success) {
            const fish1 = {
              id: response.data.id,
              name: name,
              description: description,
            };
            fish.addFish(fish1);
            handleClose();
            toast.success("Կատարված է");
          } else {
            toast.error(response.data.errorMessage);
            handleClose();
          }
        })
        .catch((e) => {
          toast.error("Կատարված չէ");
          handleClose();
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
          <Modal.Title>Ավելացնել ձուկ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setName(e.target.value)}
              className={error}
            />
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              placeholder=""
              onChange={(e) => setHeight(e.target.value)}
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

export default AddFish;
