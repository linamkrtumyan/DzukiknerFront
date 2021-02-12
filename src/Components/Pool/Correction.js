import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import "./style.css";
import DatePicker from "react-datepicker";

function Correction({ data1, fishData }) {
  const pool = useContext(PoolContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
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
        selectedDate.getDate()
    );
  }, [selectedDate]);

  const newDataFunc = () => {
    // setId(data1.id);
  };

  useEffect(() => {
    setId(data1.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    console.log(id, quantity, date);
    axios
      .post(`/pools/correct`, {
        id,
        quantity,
        date,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const updPool = {
            id: id,
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
            <Form.Label>Հատ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setQuantity(e.target.value)}
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
