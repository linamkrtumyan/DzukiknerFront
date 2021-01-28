import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import InPool from "./InPool";
import UpdateModal from "./UpdateModal";
import SalePool from "./SalePool";
import "./style.css";
import MovePool from "./MovePool";
import AddPool from "./AddPool";
import DeletePool from "./DeletePool";
import "./style.css";

function PoolCard({ data, data1, fishData }) {
  // console.log(fishData, "fishData poolcard");
  // console.log(data, "pool cardi data");

  return (
    <div
      style={{
        width: "360px",
        // marginLeft: "10px",
        // marginTop: "30px",
        // bottom: "30px",
        // marginBottom: "10px",
      }}
    >
      {/* <AddPool /> */}
      <Card className="pool_card">
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
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* <Card.Text> */}
          <div className="pool_card_title">
            <div style={{ fontSize: "22px" }}>
              {/* Ավազան */}
              <p> {data1.name}</p>
            </div>
          </div>
          {/* <div style={{ marginLeft: "auto", marginRight: "auto" }}> */}
          <div className="pool_card_item">
            <div style={{ textAlign: "center" }}>
              {/* Տեսակ */}

              <p>{data1.fishType}</p>
              {/* <p>fish type</p> */}
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
              {Math.round(data1.fishAvgWeight * 100) / 100}
              <p style={{}}>Կգ/Հատ</p>
            </div>
          </div>
          {/* </div> */}

          {/* </Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PoolCard;
