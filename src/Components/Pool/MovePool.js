import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

import DatePicker from "react-datepicker";

function MovePool({ data, data1 }) {
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);
  const toPoolData = data.filter((dataik) => dataik.id != data1.id);
  const [fromPoolid, setFromPoolId] = useState(data1.id);
  const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [forSend, setforSend] = useState(0);
  const [avgWeight, setAvgWeight] = useState(null);
  const [description, setDescription] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(
    selectedDate.getFullYear() +
      "-" +
      (selectedDate.getMonth() + 1) +
      "-" +
      selectedDate.getDate()
  );
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );
  useEffect(() => {
    setDate(
      selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate() +
        " " +
        selectedDate.getHours() +
        ":" +
        selectedDate.getMinutes() +
        ":" +
        selectedDate.getSeconds()
    );
  }, [selectedDate]);

  useEffect(() => {
    setforSend(Number(weight) / Number(quantity));
  }, [weight, quantity]);

  const handleSubmit = (evt) => {
    // console.log(date);
    axios
      .post(`/pools/movement`, {
        fromPoolid,
        toPoolid,
        quantity,
        weight,

        description,
        date,
      })
      .then((response) => {
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
            <DatePicker
              style={{
                width: "150px",
                margin: "10px",
                cursor: "pointer",
              }}
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              dateFormat="yyyy/MM/dd"
              maxDate={new Date()}
              closeOnScroll={true}
              scrollableMonthYearDropdown
              showMonthDropdown
              showYearDropdown
              customInput={<ExampleCustomInput />}
              // placeholderText="Տարի/Ամիս/Օր        🔽"
              mode="date"
            />
            <br />
            <Form.Label>Դեպի ուր</Form.Label>
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
              onWheel={() => document.activeElement.blur()}
              min="0"
              placeholder=""
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              min="0"
              placeholder=""
              onChange={(e) => {
                // setAvgWeight(weight / quantity);
                setWeight(e.target.value);
              }}
            />

            <br />
            <Form.Label>Միջին քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              min="0"
              placeholder=""
              value={Math.round((weight / quantity) * 10000) / 10000}
              // value={weight / quantity}
              readOnly
              // onChange={(e) => setAvgWeight(e.target.value)}
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
