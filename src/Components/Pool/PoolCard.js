import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import InPool from "./InPool";
import UpdateModal from "./UpdateModal";
import SalePool from "./SalePool";
import "./style.css";
import MovePool from "./MovePool";
import AddPool from "./AddPool";
import DeletePool from "./DeletePool";

function PoolCard({ data, data1 }) {
  return (
    <div
      style={{
        width: "18rem",
        marginLeft: "10px",
        marginTop: "30px",
        bottom: "30px",
      }}
    >
      {/* <AddPool /> */}
      <Card
        style={{
          width: "18rem",
          top: "30px",
          backgroundImage: "linear-gradient(#b6edec, #3973b8)",
          border: "none",
        }}
      >
        <Card.Body>
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
            <Dropdown>
              <Dropdown.Toggle className="my-dropdown-toggle">
                ⋮
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <UpdateModal key={1} data1={data1} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <InPool key={2} data={data} data1={data1} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <SalePool key={3} data={data} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <MovePool key={4} data={data} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <DeletePool key={5} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Text>
            <div>
              <div
                className="pool_card_title"
                style={{ float: "left", fontWeight: "700" }}
              >
                Ավազան
              </div>
              {data1.name}
            </div>
            <div>
              <div
                className="pool_card_title"
                style={{ float: "left", fontWeight: "700" }}
              >
                {" "}
                Տեսակ
              </div>
              {data1.fishType}
            </div>
            <div>
              <div
                className="pool_card_title"
                style={{ float: "left", fontWeight: "700" }}
              >
                Քանակ
              </div>
              {data1.fishQuantity}
            </div>
            <div>
              <div
                className="pool_card_title"
                style={{ float: "left", fontWeight: "700" }}
              >
                Քաշ
              </div>
              {data1.fishWeight}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PoolCard;
