import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

function AddPool() {
  // name, height, width, maxweight
  const pool = useContext(PoolContext);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [maxweight, setMaxweight] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(name, height, width, maxweight);
    axios
      .post(`/pools/addPool`, {
        name,
        height,
        width,
        maxweight,
      })
      .then((response) => {
        console.log(response);
        const newPool = {
          name: name,
          height: height,
          width: width,
          maxweight: maxweight,
        };
        pool.addNewPool(newPool);
        toast("pooly avelacvac e");
      });
    // window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ավելացնել
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել ավազան</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Ավազան</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Բարձրություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setHeight(e.target.value)}
            />
            <br />
            <Form.Label>Լայնություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setWidth(e.target.value)}
            />
            <br />
            <Form.Label>Առավելագույն Քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setMaxweight(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            // onClick={handleSubmit}
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            // onClick={handleClose}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPool;
