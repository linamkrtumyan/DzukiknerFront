import React, { useState } from "react";
import { Button, Tab, Tabs, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteMoveHistory from "./DeleteMoveHistory";

function MoveHistory({ moveHistory }) {
  // console.log(moveHistory);
  return (
    <>
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
              <th>Մուտք</th>
              <th>Ելք</th>
              <th>Քաշ</th>
              <th>Միջին քաշ</th>
              <th>Գործընկեր </th>
              <th>Նկարագրություն</th>
              <th>Ամսաթիվ</th>
              <th>Գործողություն</th>
            </tr>
          </thead>
          <tbody>
            {moveHistory.length > 0 ? (
              moveHistory.map((move, index) => {
                return (
                  <tr key={move.id}>
                    <td>{move.inQuantity}</td>
                    <td>{move.outQuantity}</td>
                    <td> {Math.round(move.weight * 10000) / 10000}</td>
                    <td>{Math.round(move.avgWeight * 10000) / 10000}</td>
                    <td>{move.partnerName}</td>
                    <td>{move.description}</td>
                    <td>{move.insertedDate}</td>
                    <td>
                      <DeleteMoveHistory move={move} />
                    </td>
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
