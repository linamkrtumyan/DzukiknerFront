import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DzukContext } from "../../Pages/Partners";

function DeletePartner({ data }) {
  const dzukik = useContext(DzukContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(data.id);
  });

  //   console.log(data);

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    axios
      .post(`/info/partner/deletePartner`, { id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          dzukik.deletePartner(id);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
      });
    //   window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <div style={{ marginLeft: "5px" }} onClick={handleShow}>
        <img
          className="partner_icon"
          src={require("../../img/delete_icon.svg").default}
        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ջնջել գործընկերոջը</Modal.Title>
        </Modal.Header>
        <Modal.Body>Համոզված եք</Modal.Body>
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

export default DeletePartner;
