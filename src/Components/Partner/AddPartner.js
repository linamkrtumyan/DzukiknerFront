import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DzukContext } from "../../Pages/Partners";
toast.configure();

function AddPartner() {
  // name, height, width, maxweight
  const dzukik = useContext(DzukContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setHeight] = useState("");
  const [phone, setWidth] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function notify() {
  //   toast("Wow so easy !");
  // }

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(name, description, phone);
    axios
      .post(`/info/partner/addPartner`, {
        name,
        description,
        phone,
      })
      .then((response) => {
        console.log(response.data.success);
        // toast.error("avelacav");
        // window.location.reload(false);
        if (response.data.success) {
          const dzuk = {
            name: name,
            description: description,
            phone: phone,
          };
          dzukik.addDzuk(dzuk);
          toast.success("Գործընկերն ավելացված է");
        } else {
          toast.error("Գործընկերն ավելացված չէ");
        }
      });

    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <div>
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer />
      <Button variant="primary" onClick={handleShow}>
        Ավելացնել
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ավելացնել գործընկեր</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Label>Նկարագրություն</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setHeight(e.target.value)}
            />
            <br />
            <Form.Label>Հեռախոսահամար</Form.Label>
            <Form.Control
              //   type="number"
              placeholder=""
              onChange={(e) => setWidth(e.target.value)}
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

export default AddPartner;
