import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FoodContext } from "../../Pages/Foods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FeedingReportContext } from "./FeedingTable";

toast.configure();

function EditMoveReport({ data }) {
  const feedingReport = useContext(FeedingReportContext);

  const [show, setShow] = useState(false);
  const [pool, setPool] = useState("");
  const [allFoods, setAllFoods] = useState([]);
  const useableFoods = allFoods.filter((food) => food.value != data.foodId);

  const [id, setId] = useState("");
  const [coef, setCoef] = useState("");
  const [weight, setWeight] = useState("");
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");

  const newDataFunc = () => {
    setId(data.id);
    setPool(data.poolName);
    setCoef(data.coefficient);
    setWeight(data.weight);
    setFoodId(data.foodId);
    setFoodName(data.foodName);
  };

  useEffect(() => {
    setId(data.id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/food/getFoodsDetails");
      setAllFoods(result.data.foodsDetails);
    };

    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    console.log(id, foodId, weight, coef, "uxarkvoxy");
    axios
      .post(`/reports/editFeeding`, {
        id,
        foodId,
        weight,
        coef,
      })

      .then((response) => {
        if (response.data.success) {
          console.log("8888");
          const report = {
            id,
            foodId,
            weight,
            coef,
          };
          feedingReport.updateFeedingReport(report);
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
      <div
        variant="primary"
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        <img
          className="partner_icon"
          src={require("../../img/pencil.svg").default}
        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit}>
            <Form.Label>Ավազան</Form.Label>
            <Form.Control type="text" placeholder={pool} disabled={true} />
            <br />

            <Form.Label>Կերի տեսակ</Form.Label>
            <Form.Control
              as="select"
              placeholder="Ընտրեք կերի տեսակ"
              onChange={(e) => setFoodId(e.target.value)}
            >
              <option hidden value="">
                {foodName}
              </option>
              {useableFoods.map((food) => (
                <option key={food.value} value={food.value}>
                  {food.label}
                </option>
              ))}
            </Form.Control>
            <br />
            <Form.Label>Քաշ</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <br />
            <Form.Label>Գործակից</Form.Label>
            <Form.Control
              type="number"
              onWheel={() => document.activeElement.blur()}
              placeholder=""
              value={coef}
              onChange={(e) => setCoef(e.target.value)}
            />
            <br />
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

export default EditMoveReport;
