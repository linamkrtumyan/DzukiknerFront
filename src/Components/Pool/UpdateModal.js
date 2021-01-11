import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

function UpdateModal({ data1, data }, props) {
  // console.log(data1, "data 1 from update comp");
  const pool = useContext(PoolContext);
  // const [data, setData] = useState("");
  // console.log(data, "update data from card");

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [height, setfishQuantity] = useState("");
  const [width, setfishWeight] = useState("");
  const [maxweight, setfishType] = useState("");
  const [newData, setNewData] = useState();

  const newDataFunc = () => {
    setId(data1.id);
    setName(data1.name);
    setfishQuantity(data1.height);
    setfishWeight(data1.width);
    setfishType(data1.maxweight);
  };

  useEffect(() => {
    setId(data1.id);
    // console.log(id, "useeffect id");
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const update = (id) => {
  //   console.log(id);
  //   props.history.push("/update" + id);
  // };
  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(id, name, height, width, maxweight);
    axios
      .post(`/pools/updatePool`, {
        id,
        name,
        height,
        width,
        maxweight,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const updPool = {
            id: id,
            name: name,
            // height: height,
            // width: width,
            // maxweight: maxweight,
          };
          pool.updatePool(updPool);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
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
        Խմբագրել
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
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Բարձրություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={height}
              id="fishCount"
              onChange={(e) => setfishQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Լայնություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={width}
              onChange={(e) => setfishWeight(e.target.value)}
            />
            <br />
            <Form.Label>Առավելագույն քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={maxweight}
              onChange={(e) => setfishType(e.target.value)}
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

export default UpdateModal;
