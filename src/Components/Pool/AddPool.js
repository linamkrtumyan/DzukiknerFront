import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
// import { useFormik } from 'formik';

function AddPool({ fishData }) {
  console.log(fishData);
  // name, height, width, maxweight
  const pool = useContext(PoolContext);
  // const [fishData, setFishData] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [fishName, setFishName] = useState(null);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    console.log(name, fishName);
    if (name == "") {
      setError("form-control is-invalid ");
    } else {
      axios
        .post(`/pools/addPool`, {
          name,
          fishName,
        })
        .then((response) => {
          console.log(response);

          if (response.data.success) {
            const newPool = {
              id: response.data.id,
              name: name,
              fishName: fishName,
            };
            pool.addNewPool(newPool);
            handleClose();
            toast.success("Կատարված է");
          } else {
            toast.error(response.data.errorMessage);
            handleClose();
          }
        })
        .catch((e) => {
          console.log("error");
          handleClose();
          toast.error("Կատարված չէ");
        });
    }
  };

  return (
    <>
      <Button
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
              className={error}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Ձկան տեսակ</Form.Label>

            <Form.Control
              as="select"
              placeholder="Ընտրեք ձկան տեսակ"
              onChange={(e) => setFishName(e.target.value)}
            >
              <option hidden value="">
                Ընտրեք ձկան տեսակ
              </option>
              {fishData.map((fish) => (
                <option key={fish.id} value={fish.id}>
                  {fish.name}
                </option>
              ))}
            </Form.Control>
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

export default AddPool;
