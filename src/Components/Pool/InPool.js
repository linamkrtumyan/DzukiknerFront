import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";
import { useFormik } from "formik";

function InPool({ data, data1 }) {
  // console.log(data1, "data1-i quantity");
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fishType, setFishType] = useState([]);
  const [partners, setPartners] = useState([]);

  const [toPoolid, setToPoolId] = useState(data1.id);
  // const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [avgWeight, setAvgWeight] = useState(null);
  const [forSend, setforSend] = useState(0);
  // console.log(avgWeight, "skizb");
  const [partnerId, setPartnerId] = useState(null);
  const [description, setDescription] = useState(null);
  const [allQuantity, setAllQuantity] = useState(0);
  // const [allWeight, setallWeight] = useState(null);
  const errors = [];

  // useEffect(() => {
  //   setAllQuantity(Number(data1.fishQuantity) + Number(quantity));
  //   console.log(allQuantity, "usei allquantity");
  // }, [quantity]);

  useEffect(() => {
    setforSend(Number(weight) / Number(quantity));
  }, [weight, quantity]);

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
    // setAvgWeight(parseInt(weight, 10) / parseInt(quantity, 10));
    // setAvgWeight(Number(weight) / Number(quantity));
    // console.log(avgWeight, "1111111111");
    fetchData();
  }, []);

  const handleSubmit = (evt) => {
    console.log(toPoolid, quantity, weight, forSend, partnerId, description);
    // if (data1.fishQuantity - quantity < 0) {
    //   toast.error("edqan chka");
    //   errors.push("Name can't be empty");
    // } else {
    console.log(forSend, "1111111111");
    axios
      .post(`/pools/inPool`, {
        toPoolid,
        quantity,
        weight,
        forSend,
        partnerId,
        description,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const inPool = {
            id: toPoolid,
            quantity: quantity,
            weight: weight,
            fishAvgWeight: forSend,
            allQuantity: Number(data1.fishQuantity) + Number(quantity),
            allWeight: Number(data1.fishWeight) + Number(weight),
          };
          console.log(inPool.allQuantity, "allQuantity");
          console.log(inPool.allWeight, "allWeight");
          pool.inPool(inPool);
          toast.success("Կատարված է");
          // handleClose();
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
        toast.error("Կատարված չէ");
      });
    // }

    // window.location.reload(false);
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
            <Form.Label>Քանակ (հատ)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              // max="data1.fishQuantity"
              placeholder=""
              // maxLength="10"
              onChange={(e) => setQuantity(e.target.value)}
            />
            {/* <div>{data1.fishQuantity}</div> */}
            {/* {data1.map((dataik, index) => (
              <div key={dataik.id}>{dataik.quantity} </div>
            ))} */}
            <br />
            <Form.Label>Քաշ (կգ)</Form.Label>
            <Form.Control
              type="number"
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
              min="0"
              placeholder=""
              // value={Number(weight) / Number(quantity)}
              value={Math.round((weight / quantity) * 10000) / 10000}
              readOnly
              // onChange={
              //   (e) =>
              //   // setAvgWeight(e.target.value)
              //   // setAvgWeight(Number(weight) / Number(quantity))
              // }
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
