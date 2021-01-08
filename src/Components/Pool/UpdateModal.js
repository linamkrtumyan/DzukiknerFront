import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { PoolContext } from "../../Pages/PoolPage";

function UpdateModal({ data1 }) {
  const pool = useContext(PoolContext);
  const [data, setData] = useState("");

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [height, setfishQuantity] = useState("");
  const [width, setfishWeight] = useState("");
  const [maxweight, setfishType] = useState("");

  const [newName, setNewName] = useState(name);
  // setNewName(name)
  // console.log(name, "name");
  console.log(newName, "newname");

  // useEffect(() => {
  //   setData(data1);
  //   console.log("apdatei useeffect");
  //   console.log(data.name, "useeffecti data name");
  // }, []);

  // console.log(data, "updatei data");
  // console.log(data.name, "datayi name");
  // console.log(name, "name");

  useEffect(() => {
    setId(data1.id);
    setName(data1.name);
    setfishQuantity(data1.height);
    setfishWeight(data1.width);
    setfishType(data1.maxweight);
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    // evt.preventDefault();
    console.log(id, newName, height, width, maxweight);
    axios
      .post(`/pools/updatePool`, {
        id,
        newName,
        height,
        width,
        maxweight,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const updPool = {
            id: id,
            name: newName,
            // height: height,
            // width: width,
            // maxweight: maxweight,
          };
          pool.updatePool(updPool);
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }

        // const newPool{
        //    name:name,
        // height:height,
        // width:width,
        // maxweight:maxweight,
        // }
      });
    // window.location.reload(false);
    // const res = await axios.put('/pools/updatePool', { hello: 'world' });
  };

  return (
    <>
      <div variant="primary" onClick={handleShow}>
        Խմբագրել
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Անուն</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <br />
            <Form.Label>Բարձրություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={height}
              id="fishCount"
              onChange={(e) => setfishQuantity(e.target.value)}
            />
            <br />
            <Form.Label>Լայնություն</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={width}
              onChange={(e) => setfishWeight(e.target.value)}
            />
            <br />
            <Form.Label>Առավելագույն քաշ</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={maxweight}
              onChange={(e) => setfishType(e.target.value)}
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

export default UpdateModal;
