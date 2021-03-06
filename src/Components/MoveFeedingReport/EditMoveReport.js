import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { MoveReportContext } from "./MoveTable";

toast.configure();

function EditMoveReport({ data }) {
  const moveReport = useContext(MoveReportContext);
  const [show, setShow] = useState(false);
  const [fromPool, setFromPool] = useState("");
  const [toPool, setToPool] = useState("");
  const [allPartners, setAllPartners] = useState([]);
  const useableParters = allPartners.filter(
    (partner) => partner.id != data.partnerId
  );

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [description, setDescription] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setFromPool(data.fromPool);
    setToPool(data.toPool);
    setType(data.type);
    setQuantity(data.quantity);
    setWeight(data.weight);
    setPartnerId(data.partnerId);
    setPartnerName(data.partnerName);
    setDescription(data.description === null ? "" : data.description);
  };

  useEffect(() => {
    setId(data.id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/partner/getPartnerDetails");
      setAllPartners(result.data.partners);
    };

    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .post(`/reports/updateMove`, {
        id,
        type,
        quantity,
        weight,
        partnerId,
        description,
      })

      .then((response) => {
        if (response.data.success) {
          const report = {
            id,
            type,
            quantity,
            weight,
            partnerId,
            description,
          };
          moveReport.updateMoveReport(report);
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
            <Form.Label>Քաշ</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք ավազանը"
              onChange={(e) => setPartnerId(e.target.value)}
            >
              <option hidden value="">
                {partnerName}{" "}
              </option>
              {useableParters.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
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
