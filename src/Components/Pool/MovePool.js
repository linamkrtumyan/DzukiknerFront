import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function MovePool() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div variant="primary" onClick={handleShow}>
        Տեղափոխություն
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Տեղափոխություն</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Ավազանի համար</Form.Label>
            <Form.Control as="select">
              <option>ստեղ համարները դեն լի</option>
            </Form.Control>
            <br />
            <Form.Label>Տեսակ</Form.Label>
            <Form.Control as="select">
              <option>ստեղ տեսակները դեն լի</option>
            </Form.Control>
            <br />
            <Form.Label>Քանակ</Form.Label>
            <Form.Control type="number" placeholder="" />
            <br />
            <Form.Label>Քաշ</Form.Label>
            <Form.Control type="number" placeholder="" />

            <br />
            <Form.Label>Միջին քաշ</Form.Label>
            <Form.Control type="number" placeholder="" />
            <br />
            <Form.Label>Գործընկեր</Form.Label>
            <Form.Control as="select">
              <option>ստեղ գործընկերները դեն լի</option>
            </Form.Control>
            <br />
            <Form.Label>Նշումներ</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovePool;
