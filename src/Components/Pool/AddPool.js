import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
// import { useFormik } from 'formik';

function AddPool() {
  // name, height, width, maxweight
  const pool = useContext(PoolContext);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [fishName, setFishName] = useState("");
  // const [height, setHeight] = useState(null);
  // const [width, setWidth] = useState(null);
  // const [maxweight, setMaxweight] = useState(null);

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

        if (response.data.success) {
          const newPool = {
            id: response.data.id,
            name: name,
            height: height,
            width: width,
            maxweight: maxweight,
          };
          pool.addNewPool(newPool);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
        toast.error("Կատարված չէ");
      });
    // window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <Button
        // style={{ fontSize: "15px !important" }}
        height="40px !important"
        variant="primary"
        onClick={handleShow}
        className="addpool"
      >
        Ավելացնել
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել ավազան</Modal.Title>
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
            <Form.Label>Ձկան տեսակ</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder=""
              onChange={(e) => setFishName(e.target.value)}
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
