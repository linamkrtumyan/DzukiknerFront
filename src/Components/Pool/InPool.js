import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import DatePicker from "react-datepicker";

function InPool({ data, data1 }) {
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fishType, setFishType] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(
    selectedDate.getFullYear() +
      "-" +
      (selectedDate.getMonth() + 1) +
      "-" +
      selectedDate.getDate()
  );

  const [toPoolid, setToPoolId] = useState(data1.id);
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [avgWeight, setAvgWeight] = useState(null);
  const [forSend, setforSend] = useState(0);
  const [partnerId, setPartnerId] = useState(null);
  const [description, setDescription] = useState(null);
  const [allQuantity, setAllQuantity] = useState(0);
  const errors = [];
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

  useEffect(() => {
    const fetchData = async () => {
      const partners = await axios("/info/partner/getPartners");
      if (partners.data.allPartners) {
        setPartners(partners.data.allPartners);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (evt) => {
    // console.log(
    //   toPoolid,
    //   quantity,
    //   weight,
    //   forSend,
    //   partnerId,
    //   description,
    //   date
    // );
    // console.log(date);
    axios
      .post(`/pools/inPool`, {
        toPoolid,
        quantity,
        weight,
        // forSend,
        partnerId,
        description,
        date,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          const inPool = {
            id: toPoolid,
            quantity: quantity,
            weight: weight,
            fishAvgWeight: forSend,
            allQuantity: Number(data1.fishQuantity) + Number(quantity),
            allWeight: Number(data1.fishWeight) + Number(weight),
          };
          handleClose();

          pool.inPool(inPool);
          toast.success("Կատարված է");
          // handleClose();
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
        Մուտք
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Մուտք</Modal.Title>
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
            <Form.Label>Քանակ (հատ)</Form.Label>
            <Form.Control
              type="number"
              // min={0}
              // max="data1.fishQuantity"
              placeholder=""
              // maxLength="10"
              onWheel={() => document.activeElement.blur()}
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
              readOnly
            />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք գործընկերոջը"
              onChange={(e) => setPartnerId(e.target.value)}
            >
              <option hidden value="">
                Ընտրեք գործընկերոջը
              </option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </Form.Control>
            <br />
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

export default InPool;
