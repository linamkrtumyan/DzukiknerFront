import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import DeleteFood from "./DeleteFood";
import PlusWeight from "./PlusWeight";

import UpdateFood from "./UpdateFood";

function GetFoods({ data, allWeight }) {
  // console.log(count, "count");
  return (
    <div>
      <Table bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Անուն</th>
            <th>Համար</th>
            <th>Քաշ </th>
            <th>Գործողություն</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((food, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{food.name}</td>
                    <td>{food.number}</td>
                    <td>{Math.round(food.weight * 10000) / 10000}</td>
                    {/* <td colSpan="2">Larry the Bird</td> */}
                    <td className="table_action_column">
                      <UpdateFood data={food} />
                      <DeleteFood data={food} />
                      <PlusWeight data={food} />
                    </td>

                    {/* <td>@twitter</td> */}
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Տվյաներ չկան</td>
            </tr>
          )}
          {data.length > 0 ? (
            <tr style={{ fontWeight: "700" }}>
              <td colSpan="2">Ընդհանուր</td>
              <td>{allWeight}</td>
            </tr>
          ) : null}
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default GetFoods;
