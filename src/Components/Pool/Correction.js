import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import "./style.css";

function Correction({ data1, fishData }) {
  const pool = useContext(PoolContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");

  const newDataFunc = () => {
    // setId(data1.id);
  };

  useEffect(() => {
    setId(data1.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    // console.log(id, quantity, weight);
    axios
      .post(`/pools/correct`, {
        id,
        quantity,
        weight,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          const updPool = {
            id,
            quantity,
            weight,
          };
          pool.correction(updPool);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      });
  };

  return (
    <div>
      <div
        className="pool_dropdown_item"
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        Ճշգրտում
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ճշգրտում</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Հատ</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              placeholder=""
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Կգ</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
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

export default Correction;
