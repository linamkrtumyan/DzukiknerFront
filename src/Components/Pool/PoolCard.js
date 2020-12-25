import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import InPool from "./InPool";
import UpdateModal from "./UpdateModal";
import SalePool from "./SalePool";
import "./style.css";
import MovePool from "./MovePool";
import AddPool from "./AddPool";

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
                  <UpdateModal data1={data1} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <InPool data={data} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <SalePool />
                </Dropdown.Item>
                <Dropdown.Item>
                  <MovePool />
                </Dropdown.Item>
                <Dropdown.Item>Ջնջել</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Text>
            <div>Ավազան{data1.name}</div>
            <div>Տեսակ{data1.fishType}</div>
            <div>Քանակ{data1.fishQuantity}</div>
            <div>Քաշ{data1.fishWeight}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PoolCard;
