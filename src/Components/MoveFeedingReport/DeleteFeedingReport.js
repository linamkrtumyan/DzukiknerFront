import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeedingReportContext } from "./FeedingTable";

function DeleteMoveReport({ data }) {
  const feedingReport = useContext(FeedingReportContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(data.id);
  });

  const handleSubmit = (evt) => {
    axios.post(`/reports/undoFeeding`, { id }).then((response) => {
      if (response.data.success) {
        feedingReport.deleteFeedingReport(id);
        toast.success("Կատարված է");
      } else {
        toast.error(response.data.errorMessage);
      }
    });
    // .catch((e) => {
    //   toast.error("Կատարված չէ");
    // });
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

export default DeleteMoveReport;
