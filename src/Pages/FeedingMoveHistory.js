import React, { useState, useParams, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FeedingHistory from "../Components/FeedingHistory/FeedingHistory";
import MoveHistory from "../Components/MoveHistory/MoveHistory";

function FeedingMoveHistory(props) {
  const [key, setKey] = useState("feeding-move-history");
  const history = useHistory();
  // const { id } = useParams();
  const { id } = props.match.params;
  const [foodHistory, setFoodHistory] = useState("");
  const [moveHistory, setMoveHistory] = useState("");
  console.log(id, "aaaaaaaaaaa");
  console.log(foodHistory, "foodhistory1");

  function handleClick() {
    history.goBack();
  }

  useEffect(() => {
    console.log("mtav");
    const fetchData = async () => {
      axios
        .post(`/info/food/foodHistory`, {
          id,
        })
        .then((response) => {
          console.log(response, "response");
          setFoodHistory(response.data.fields);
          console.log(foodHistory, "foodHistory");

          if (response.data.success) {
            console.log("fishtype newpool");

            // toast.success("Կատարված է");
          } else {
            // toast.error(response.data.errorMessage);
          }
        })
        .catch((e) => {
          console.log("error");
          // handleClose();
          // toast.error("Կատարված չէ");
        });
    };
    const fetchData1 = async () => {
      axios
        .post(`/info/food/moveHistory`, {
          id,
        })
        .then((response) => {
          console.log(response, "response");
          setMoveHistory(response.data.fields);
          console.log(moveHistory, "moveHistory");
        })
        .catch((e) => {
          console.log("error");
        });
    };

    fetchData();
    fetchData1();
  }, [id]);
  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <Button onClick={handleClick}>
          {" "}
          <img
            className="partner_icon"
            src={require("../img/arrow-left.svg").default}
          />
        </Button>

        <Tabs
          style={{ paddingTop: "20px" }}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="feeding-move-history" title="Կերակրման պատմություն">
            {/* <Sonnet /> */}
            <FeedingHistory foodHistory={foodHistory} />
          </Tab>
          <Tab eventKey="profile" title="Տեղափոխության պատմություն">
            <MoveHistory moveHistory={moveHistory} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default FeedingMoveHistory;
