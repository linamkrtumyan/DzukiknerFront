import React from "react";
import { Table } from "react-bootstrap";

function FeedingTable() {
  return (
    <>
      feeding
      <div
        className="container"
        style={{
          backgroundColor: "white",
          padding: "50px 30px",
          height: "100%",
        }}
      >
        <Table bordered hover style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>Կերի տեսակ</th>
              <th>Քաշ </th>
              <th>Գործակից</th>
              <th>Ամսաթիվ</th>
            </tr>
          </thead>
          <tbody>
            {/* {foodHistory.length > 0 ? (
              foodHistory.map((food, index) => {
                return (
                  <tr key={index}>
                    <td>{food.foodName}</td>
                    <td>{Math.round(food.weight * 10000) / 10000}</td>
                    <td>{Math.round(food.coefficient * 10000) / 10000}</td>
                    <td>{food.insertedDate}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Տվյաներ չկան</td>
              </tr>
            )} */}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FeedingTable;
