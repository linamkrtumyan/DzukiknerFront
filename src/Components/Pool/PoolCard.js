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

function PoolCard({ data, data1 }) {
  return (
    <div
      style={{
        width: "18rem",
        marginLeft: "10px",
        // marginTop: "30px",
        // bottom: "30px",
        marginBottom: "10px",
      }}
    >
      {/* <AddPool /> */}
      <Card className="pool_card">
        <Card.Body>
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="my-dropdown-toggle ">
                ⋮
              </Dropdown.Toggle>
              <Dropdown.Menu className="pool_drp_menu">
                {/* <Dropdown.Item> */}
                <UpdateModal key={1} data1={data1} data={data} />
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                <InPool key={2} data={data} data1={data1} />
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                <SalePool key={3} data={data} data1={data1} />
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                <MovePool key={4} data={data} data1={data1} />
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                <DeletePool key={5} data1={data1} data={data} />
                {/* </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Text>
            <div className="pool_card_title">
              <div style={{ float: "left", fontWeight: "700" }}>
                {/* Ավազան */}
              </div>
              {data1.name}
            </div>
            <div className="pool_card_item">
              <div style={{ float: "left", fontWeight: "700" }}>
                {/* Տեսակ */}
              </div>
              {data1.fishType}
            </div>
            <div className="pool_card_item">
              {data1.fishQuantity}
              <span style={{ fontWeight: "700" }}>Հատ</span>
            </div>
            <div className="pool_card_item">
              {data1.fishWeight}
              <span style={{ fontWeight: "700" }}>Կգ</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PoolCard;
