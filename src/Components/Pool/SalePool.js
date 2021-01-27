import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import { useFormik } from "formik";

function SalePool({ data, data1 }) {
  console.log(data1);
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fishType, setFishType] = useState([]);
  const [partners, setPartners] = useState([]);

  const [fromPoolid, setFromPoolId] = useState(data1.id);
  // const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [avgWeight, setAvgWeight] = useState(0);
  const [partnerId, setPartnerId] = useState(null);
  const [description, setDescription] = useState(null);
  const errors = [];

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios("/info/fish/getFishes");
      const partners = await axios("/info/partner/getPartners");
      // console.log(partners.data.allPartners);
      if (partners.data.allPartners) {
        // console.log(partners.data.allPartners);
        // setFishType(result.data.allFishes);
        setPartners(partners.data.allPartners);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (evt) => {
    console.log(
      fromPoolid,
      quantity,
      weight,
      avgWeight,
      partnerId,
      description
    );
    if (data1.fishQuantity - quantity < 0) {
      toast.error("edqan chka");
      errors.push("Name can't be empty");
    } else {
      axios
        .post(`/pools/sales`, {
          fromPoolid,
          quantity,
          weight,
          avgWeight,
          partnerId,
          description,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            const salePool = {
              id: fromPoolid,
              quantity: quantity,
              weight: weight,
            };
            pool.salePool(salePool);
            toast.success("Կատարված է");
            handleClose();
          } else {
            toast.error(response.data.errorMessage);
          }
        })
        .catch((e) => {
          console.log("error");
          toast.error("Կատարված չէ");
        });
    }

    // window.location.reload(false);
  };

  return (
    <>
      <div className="pool_dropdown_item" onClick={handleShow}>
        Վաճառք
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Վաճառք</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Քանակ</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max="data1.fishQuantity"
              placeholder=""
              maxLength="10"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <div>{data1.fishQuantity}</div>
            {/* {data1.map((dataik, index) => (
              <div key={dataik.id}>{dataik.quantity} </div>
            ))} */}
            <br />
            <Form.Label>Քաշ</Form.Label>
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
            <Form.Label>Միջին քաշ</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder=""
              value={weight / quantity}
              onChange={(e) => setAvgWeight(e.target.value)}
            />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք գործընկերոջը"
              onChange={(e) => setPartnerId(e.target.value)}
            >
              {/* <option disabled={true} value="">
                Ընտրեք գործընկերոջը
              </option> */}
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

export default SalePool;
