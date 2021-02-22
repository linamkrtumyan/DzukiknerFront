import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedingHistory from "../Components/FeedingHistory/FeedingHistory";
import MoveHistory from "../Components/MoveHistory/MoveHistory";

export const MoveHistoryContext = React.createContext();

function FeedingMoveHistory(props) {
  const [key, setKey] = useState("feeding-move-history");
  const history = useHistory();

  const { id } = props.match.params;
  const [foodHistory, setFoodHistory] = useState("");
  const [moveHistory, setMoveHistory] = useState("");

  function handleClick() {
    history.goBack();
  }

  const deleteMoveHistory = (moveitem) => {
    moveHistory.map((id1) => {
      if (id1.id == moveitem) {
        const index = moveHistory.indexOf(id1);
        moveHistory.splice(index, 1);

        setMoveHistory([...moveHistory]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`/info/food/foodHistory`, {
          id,
        })
        .then((response) => {
          setFoodHistory(response.data.fields);

          if (response.data.success) {
          } else {
          }
        })
        .catch((e) => {
          toast.error("Կատարված չէ");
        });
    };
    const fetchData1 = async () => {
      axios
        .post(`/info/fish/moveHistory`, {
          id,
        })
        .then((response) => {
          setMoveHistory(response.data.fields);
        })
        .catch((e) => {
          toast.error("Կատարված չէ");
        });
    };

    fetchData();
    fetchData1();
  }, [id]);
  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <Button onClick={handleClick}>
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
            <FeedingHistory foodHistory={foodHistory} />
          </Tab>
          <Tab eventKey="profile" title="Տեղափոխության պատմություն">
            <MoveHistoryContext.Provider
              value={{ moveHistory, setMoveHistory, deleteMoveHistory }}
            >
              <MoveHistory moveHistory={moveHistory} />
            </MoveHistoryContext.Provider>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default FeedingMoveHistory;
