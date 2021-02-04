import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function PlusWeight({ data }) {
  const foods = useContext(FoodContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [partners, setPartner] = useState([]);
  const [partnerid, setPartnerId] = useState("");
  const [description, setDesc] = useState(null);
  const [weight, setWeight] = useState("");

  const newDataFunc = () => {
    setId(data.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/partner/getPartners");
      setPartner(result.data.allPartners);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setId(data.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .post(`/info/food/updateWeight`, {
        id,
        weight,
        description,
        partnerid,
      })

      .then((response) => {
        if (response.data.success) {
          const food = {
            id: id,
            weight: weight,
          };
          foods.plusFood(food);
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
          src={require("../../img/cart4.svg").default}
        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել/Պակասեցնել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              //   value={Math.round(weight * 10000) / 10000}
              //   value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
              {partners.length > 0 ? (
                partners.map((partner) => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))
              ) : (
                <option disabled selected value>
                  Տվյաներ չկան
                </option>
              )}
            </Form.Control>
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              type="text"
              //   placeholder=""
              //   value={number}
              onChange={(e) => setDesc(e.target.value)}
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

export default PlusWeight;
