import React, { useState } from "react";
import { Button, Tab, Tabs, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MoveHistory({ moveHistory }) {
  console.log(moveHistory, "moveHistory fin");

  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <Table bordered hover style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>Կերի տեսակ</th>

              <th>Քաշ </th>
              <th>Գործակից</th>
              {/* <th>Գործակից </th> */}
              <th>Ամսաթիվ</th>
            </tr>
          </thead>
          <tbody>
            {moveHistory.length > 0 ? (
              moveHistory.map((move, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{food.foodName}</td>
                    <td>{food.weight}</td>
                    <td>{food.coefficient}</td>
                    <td>{food.insertedDate}</td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Տվյաներ չկան</td>
              </tr>
            )}
          </tbody>
        </Table>{" "}
      </div>
    </>
  );
}

export default MoveHistory;
