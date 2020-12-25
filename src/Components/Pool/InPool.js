import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function InPool({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fishType, setFishType] = useState([]);
  const [partners, setPartners] = useState([]);

  const [toPoolid, setToPoolId] = useState("");
  // const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [avgWeight, setAvgWeight] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [description, setDescription] = useState("");

  //   console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios("/info/fish/getFishes");
      const partners = await axios("/info/partner/getPartners");
      console.log(partners.data.allPartners);
      if (partners.data.allPartners) {
        // console.log(partners.data.allPartners);
        // setFishType(result.data.allFishes);
        setPartners(partners.data.allPartners);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(toPoolid, quantity, weight, avgWeight, partnerId, description);
    axios
      .post(`/pools/entrance`, {
        toPoolid,
        quantity,
        weight,
        avgWeight,
        partnerId,
        description,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error");
      });
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <div onClick={handleShow}>Մուտք</div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Մուտք</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Ավազանի համար</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setToPoolId(e.target.value)}
            >
              {data.map((data1) => (
                <option value={data1.id}>{data1.name}</option>
              ))}
            </Form.Control>
            <br />
            {/* <Form.Label>Տեսակ</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setfishQuantity(e.target.value)}
            >
              {fishType.map((fish) => (
                <option value={fish.id}>{fish.name}</option>
              ))}

            
            </Form.Control> */}
            <br />
            <Form.Label>Քանակ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setWeight(e.target.value)}
            />

            <br />
            <Form.Label>Միջին քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => setAvgWeight(e.target.value)}
            />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setPartnerId(e.target.value)}
            >
              {partners.map((partner) => (
                <option value={partner.id}>{partner.name}</option>
              ))}
            </Form.Control>
            <br />
            <Form.Label>Նշումներ</Form.Label>
            <Form.Control
              type="text"
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
            onClick={handleSubmit}
            //  onClick={handleClose}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InPool;
