import React, { useState } from "react";
import { Button, Tab, Tabs, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MoveHistory({ moveHistory }) {
  return (
    <>
      <div
        className="container"
        style={{
          paddingTop: "50px",
          backgroundColor: "white",
          height: "110vh",
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
            </tr>
          </thead>
          <tbody>
            {moveHistory.length > 0 ? (
              moveHistory.map((move, index) => {
                return (
                  <tr key={index}>
                    <td>{move.inQuantity}</td>
                    <td>{move.outQuantity}</td>
                    <td>{move.weight}</td>
                    <td>{move.avgWeight}</td>
                    <td>{move.partnerName}</td>
                    <td>{move.description}</td>
                    <td>{move.insertedDate}</td>
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