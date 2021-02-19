import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoveHistoryContext } from "../../Pages/FeedingMoveHistory";

function DeleteMoveHistory({ move }) {
  //   console.log(move, "move");
  const moveik = useContext(MoveHistoryContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [inorout, setInorout] = useState(move.inQuantity);
  const [action, setAction] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(move.id);
  });

  useEffect(() => {
    if (inorout == null) {
      setAction("out");
    } else {
      setAction("in");
    }
  }, [action]);

  const handleSubmit = (evt) => {
    // console.log(action, "action");
    // console.log(id, action, "uxarkvoxnery");
    axios
      .post(`/pools/undoFishMove`, { id, action })
      .then((response) => {
        // console.log(response, "response");
        if (response.data.success) {
          moveik.deleteMoveHistory(id);
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
      <div style={{ marginLeft: "5px" }} onClick={handleShow}>
        <img
          className="partner_icon"
          src={require("../../img/trash.svg").default}
        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header>
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

export default DeleteMoveHistory;
