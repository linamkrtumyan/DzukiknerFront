import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import "./style.css";

function UpdateModal({ data1, fishData }) {
  const pool = useContext(PoolContext);
  console.log(fishData, "fishData");

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [fishName, setFishName] = useState(null);
  const [fishType, setfishType] = useState("");

  const newDataFunc = () => {
    setId(data1.id);
    setName(data1.name);
    setfishType(data1.fishType);
  };
  useEffect(() => {
    fishData.map((fish1) => {
      if (fish1.id == fishName) {
        setfishType(fish1.name);
      } else {
      }
    });
  });

  useEffect(() => {
    setId(data1.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    console.log(id, name, fishName, "uxarkvoxnery");
    console.log(fishName, "fishnamn a *****");
    axios
      .post(`/pools/updatePool`, {
        id,
        name,
        fishName,
      })
      .then((response) => {
        console.log(response);

        if (response.data.success) {
          const updPool = {
            id: id,
            name: name,
            fishType: fishType,
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
    <div>
      <div
        className="pool_dropdown_item"
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
            <Form.Label>Ձկան տեսակ</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք ձկան տեսակ"
              onChange={(e) => setFishName(e.target.value)}
            >
              <option hidden value="">
                {fishType}
              </option>
              {fishData.length > 0 ? (
                fishData.map((fish) => (
                  <option key={fish.id} value={fish.id}>
                    {fish.name}
                  </option>
                ))
              ) : (
                <option disabled selected value>
                  Տվյաներ չկան
                </option>
              )}
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

export default UpdateModal;
