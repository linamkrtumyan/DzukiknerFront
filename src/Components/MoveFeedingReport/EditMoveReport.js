import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
toast.configure();

function EditMoveReport({ data }) {
  // const toPoolData = data.filter((dataik) => dataik.id != data1.id);

  //   console.log(data, "data");
  const foods = useContext(FoodContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [fromPool, setFromPool] = useState("");
  const [toPool, setToPool] = useState("");
  const [number, setNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setFromPool(data.fromPool);
    setToPool(data.toPool);
    setNumber(data.number);
    setQuantity(data.quantity);
    setDescription(data.description);
  };

  useEffect(() => {
    setId(data.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .post(`/info/food/updateFood`, {
        // id,
        // name,
        // number,
        // weight,
      })

      .then((response) => {
        if (response.data.success) {
          const food = {
            // id: id,
            // name: name,
            // number: number,
            // weight: weight,
          };
          foods.updateFood(food);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        toast.error("Կատարված չէ");
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
            <Form.Label>Ավազան (ելք)</Form.Label>
            <Form.Control type="text" placeholder={fromPool} disabled={true} />
            <br />
            <Form.Label>Ավազան (մուտք)</Form.Label>
            <Form.Control type="text" placeholder={toPool} disabled={true} />
            <br />
            <Form.Label>Քանակ</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              placeholder=""
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք ավազանը"
              //   onChange={(e) => settoPoolid(e.target.value)}
            >
              <option hidden value="">
                Ընտրեք գործընկերոջը
              </option>
              {/* {toPoolData.map((data1) => (
                <option key={data1.id} value={data1.id}>
                  {data1.name}
                </option>
              ))} */}
            </Form.Control>
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default EditMoveReport;
