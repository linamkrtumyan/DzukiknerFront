import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FishContext } from "../../Pages/Fishes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function UpdateFish({ data }) {
  const fishes = useContext(FishContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);
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
        .post(`/info/fish/updateFish`, {
          id,
          name,
          description,
        })
        .then((response) => {
          if (response.data.success) {
            const fish = {
              id: id,
              name: name,
              description: description,
            };
            handleClose();
            fishes.updateFish(fish);

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
      // const res = await axios.put('/pools/updatePool', { hello: 'world' });
    }
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

export default UpdateFish;
