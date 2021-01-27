import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import DeleteFood from "./DeleteFood";
import UpdateFood from "./UpdateFood";

function GetFoods({ data, coef }) {
  console.log(coef, "coef");
  return (
    <div>
      <Table bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Անուն</th>
            <th>Համար</th>
            <th>Քաշ </th>
            {/* <th>Գործակից </th> */}
            <th>Գործողություն</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((food, index) => {
              return (
                <tr key={index}>
                  {/* <td>{food.id}</td> */}
                  <td>{food.name}</td>
                  <td>{food.number}</td>
                  <td>{food.weight}</td>
                  {/* <td>{coef.coefficient}</td> */}
                  <td className="table_action_column">
                    <UpdateFood data={food} />
                    <DeleteFood data={food} />
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
