import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import InPool from "./InPool";
import UpdateModal from "./UpdateModal";
import SalePool from "./SalePool";
import "./style.css";
import MovePool from "./MovePool";
import AddPool from "./AddPool";
import DeletePool from "./DeletePool";
import "./style.css";
import Correction from "./Correction";
import { useHistory } from "react-router-dom";
import FeedingMoveHistory from "../../Pages/FeedingMoveHistory";

function PoolCard({ data, data1, fishData }) {
  // console.log(data1);
  const history = useHistory();
  const [feeding, setFeeding] = useState(false);

  function handleClick() {
    history.push(`/pools/feeding-move-history/${data1.id}`);
  }

  return (
    <div
      style={{
        width: "360px",
        marginLeft: "10px",

        marginBottom: "10px",
      }}
    >
      <Card
        className={
          "pool_card " +
          (parseFloat(data1.fishWeight) < 0 || data1.fishQuantity < 0
            ? "warning"
            : "")
        }
      >
        <Card.Body style={{ padding: "1.2rem 0.5rem" }}>
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="my-dropdown-toggle ">
                ⋮
              </Dropdown.Toggle>

              <Dropdown.Menu className="pool_drp_menu">
                <UpdateModal data1={data1} data={data} fishData={fishData} />
                <InPool data={data} data1={data1} />
                <SalePool data1={data1} />
                <MovePool data={data} data1={data1} />
                <DeletePool data1={data1} data={data} />
                <Correction data1={data1} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="cursor" onClick={handleClick}>
            <div className="pool_card_title">
              <div style={{ fontSize: "22px" }}>
                <p> {data1.name}</p>
              </div>
            </div>

            <div className="pool_card_item">
              <div style={{ textAlign: "center" }}>
                <p>{data1.fishType}</p>
              </div>
            </div>
            <div className="pool_card_item">
              <div style={{ textAlign: "center" }}>
                {data1.fishQuantity}
                <p style={{}}>Հատ</p>
              </div>
            </div>
            <div className="pool_card_item">
              <div style={{ textAlign: "center" }}>
                {Math.round(data1.fishWeight * 100) / 100}
                <p style={{}}>Կգ</p>
              </div>
            </div>
            <div className="pool_card_item">
              <div style={{ textAlign: "center" }}>
                {Math.round(data1.fishAvgWeight * 10) / 10}

                <p style={{}}>Գ/Հատ</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
  // }
}

export default PoolCard;
