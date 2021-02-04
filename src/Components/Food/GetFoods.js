import React from "react";
import { Table } from "react-bootstrap";
import DeleteFood from "./DeleteFood";
import PlusWeight from "./PlusWeight";

import UpdateFood from "./UpdateFood";

function GetFoods({ data }) {
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
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.number}</td>
                  <td>{Math.round(food.weight * 10000) / 10000}</td>

                  <td className="table_action_column">
                    <UpdateFood data={food} />
                    <DeleteFood data={food} />
                    <PlusWeight data={food} />
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
  );
}

export default GetFoods;
