import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

function MovePool({ data, data1 }) {
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);
  const toPoolData = data.filter((dataik) => dataik.id != data1.id);
  const [fromPoolid, setFromPoolId] = useState(data1.id);
  const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [avgWeight, setAvgWeight] = useState(0);
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    console.log(fromPoolid, toPoolid, quantity, weight, avgWeight, description);
    axios
      .post(`/pools/movement`, {
        fromPoolid,
        toPoolid,
        quantity,
        weight,
        avgWeight,
        description,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const move = {
            fromPoolid: fromPoolid,
            toPoolid: toPoolid,
            quantity: quantity,
            weight: weight,
          };
          pool.movePool(move);
          toast.success("Կատարված է");
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
    <>
      <div className="pool_dropdown_item" onClick={handleShow}>
        Տեղափոխություն
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Տեղափոխություն</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Դեպի ուր</Form.Label>
            {/* onChange={(e) => setId(e.target.value)} */}
            <Form.Control
              as="select"
              placeholder="Ընտրեք ավազանը"
              onChange={(e) => settoPoolid(e.target.value)}
            >
              <option hidden value="">
                Ընտրեք ավազանը
              </option>
              {toPoolData.map((data1) => (
                <option key={data1.id} value={data1.id}>
                  {data1.name}
                </option>
              ))}
            </Form.Control>
            <br />

            <Form.Label>Քանակ (հատ)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder=""
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder=""
              onChange={(e) => {
                setAvgWeight(weight / quantity);
                setWeight(e.target.value);
              }}
            />

            <br />
            <Form.Label>Միջին քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder=""
              // value={weight / quantity}
              value={Math.round((weight / quantity) * 10000) / 10000}
              onChange={(e) => setAvgWeight(e.target.value)}
            />

            <Form.Label>Նշումներ</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder=""
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

export default MovePool;
