import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

function MovePool({ data, data1 }) {
  const pool = useContext(PoolContext);
  const [show, setShow] = useState(false);

  const [partners, setPartners] = useState([]);

  // const [id, setId] = useState();
  const [fromPoolid, setFromPoolId] = useState(data1.id);
  const [toPoolid, settoPoolid] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(1);
  const [avgWeight, setAvgWeight] = useState(0);
  const [partnerId, setPartnerId] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      toPoolid,
      quantity,
      weight,
      avgWeight,
      partnerId,
      description
    );
    axios
      .post(`/pools/movement`, {
        fromPoolid,
        toPoolid,
        quantity,
        weight,
        avgWeight,
        partnerId,
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
    // window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
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
              {data.map((data1) => (
                <option key={data1.id} value={data1.id}>
                  {data1.name}
                </option>
              ))}
            </Form.Control>
            <br />
            {/* <Form.Label>Տեսակ</Form.Label>
            <Form.Control as="select">
              <option>ստեղ տեսակները դեն լի</option>
            </Form.Control>
            <br /> */}
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
              onChange={(e) => {
                setAvgWeight(weight / quantity);
                setWeight(e.target.value);
              }}
            />

            <br />
            <Form.Label>Միջին քաշ</Form.Label>
            <Form.Control
              type="number"
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
